// Compiles packs-src/*.json scene documents into the LevelDB compendium pack
// at packs/golarion-scenes.
//
// We write the DB directly with classic-level instead of using
// @foundryvtt/foundryvtt-cli's compilePack — see DECISIONS.md 2026-07-17:
// v14 needs embedded collections (levels, notes) as separate
// `!scenes.<collection>!parent.child` sub-entries AND _stats.coreVersion on
// every entry, or server migration synthesizes defaults and drops our data.
//
// Folder layout comes from assets/regions.json (folders array + per-region
// folder names); folder documents are `!folders!<id>` entries.
import { ClassicLevel } from "classic-level";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const srcDir = join(root, "packs-src");
const packDir = join(root, "packs", "golarion-scenes");

// Documents without _stats.coreVersion are treated as pre-v14 and migrated.
const PACK_CORE_VERSION = "14.365";
// Embedded scene collections we ship, stored as sub-entries.
const EMBEDDED = ["levels", "notes"];

// Deterministic ids so rebuilds and re-imports don't churn documents.
const did = (seed) =>
  createHash("sha1").update(`golarion-maps:${seed}`).digest("hex").slice(0, 16);
const folderId = (name) => did(`folder:${name}`);

const manifest = JSON.parse(readFileSync(join(root, "assets", "regions.json"), "utf8"));
const folderByKey = new Map(manifest.regions.map((r) => [r.key, r.folder ?? null]));

// Optional wiki content cache (scripts/fetch-wiki-extracts.mjs). Pages for
// labels present here embed the article lead with CC BY-NC-SA attribution.
const extractsPath = join(root, "data", "wiki-extracts.json");
const extracts = existsSync(extractsPath) ? JSON.parse(readFileSync(extractsPath, "utf8")) : {};

// Wiki hatnotes/banners (spoiler warnings etc.) come through TextExtracts as
// leading paragraphs; drop them, keeping the actual article lead.
function cleanExtract(html) {
  return html
    .replace(/<p>(?:(?!<\/p>).)*?(?:contains spoilers|You can disable)(?:(?!<\/p>).)*?<\/p>/gs, "")
    .trim();
}

function pageContent(label, sceneName, wiki) {
  const e = extracts[label];
  if (e && !e.missing) {
    return (
      cleanExtract(e.extract) +
      `<hr /><p style="font-size:0.85em"><em>Text from ` +
      `<a href="${e.url}">PathfinderWiki: ${e.title}</a>, licensed ` +
      `<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>, ` +
      `retrieved ${e.retrieved}.</em></p>`
    );
  }
  return (
    `<p><em>A location on the ${sceneName} map.</em></p>` +
    (wiki ? `<p><a href="${wiki}">View on PathfinderWiki</a></p>` : "")
  );
}

rmSync(packDir, { recursive: true, force: true });
mkdirSync(packDir, { recursive: true });

const db = new ClassicLevel(packDir, { keyEncoding: "utf8", valueEncoding: "json" });
await db.open();
const batch = db.batch();

let sort = 0;
for (const name of manifest.folders ?? []) {
  batch.put(`!folders!${folderId(name)}`, {
    _id: folderId(name),
    name,
    type: "Scene",
    folder: null,
    sorting: "a",
    sort: (sort += 100),
    color: null,
    flags: {},
    _stats: { coreVersion: PACK_CORE_VERSION }
  });
  console.log(`folder ${name}`);
}

// Load all scene docs, build a gazetteer journal per scene from its note
// pins, and wire note.entryId/pageId to it. Journals ship inside the
// Adventure pack; on scenes imported individually (no journal present) the
// module's activateNote hook falls back to opening the PathfinderWiki URL.
const sceneDocs = [];
const journalDocs = [];
const JOURNAL_FOLDER = "Golarion Gazetteers";

for (const file of readdirSync(srcDir).filter((f) => f.endsWith(".json"))) {
  const doc = JSON.parse(readFileSync(join(srcDir, file), "utf8"));
  delete doc._key;
  if (!doc._id) throw new Error(`${file}: missing _id`);
  const key = doc.__key ?? file.replace(/\.json$/, "");
  delete doc.__key;
  const folderName = doc.__folder ?? folderByKey.get(key) ?? null;
  delete doc.__folder;
  doc.folder = folderName ? folderId(folderName) : null;
  doc._stats = { coreVersion: PACK_CORE_VERSION, ...doc._stats };

  const notes = Array.isArray(doc.notes) ? doc.notes : [];
  if (notes.length) {
    const entryId = did(`journal:${key}`);
    const seen = new Set();
    const pages = [];
    let sort = 0;
    for (const n of [...notes].sort((a, b) => String(a.text).localeCompare(String(b.text)))) {
      if (seen.has(n.text)) continue;
      seen.add(n.text);
      const wiki = n.flags?.["foundryvtt-golarion-maps"]?.wikiUrl;
      const pageId = did(`page:${key}:${n.text}`);
      pages.push({
        _id: pageId,
        name: n.text,
        type: "text",
        title: { show: true, level: 1 },
        text: {
          format: 1,
          content: pageContent(n.text, doc.name, wiki)
        },
        sort: (sort += 100),
        _stats: { coreVersion: PACK_CORE_VERSION }
      });
    }
    journalDocs.push({
      _id: entryId,
      name: `${doc.name} Gazetteer`,
      folder: folderId(JOURNAL_FOLDER),
      pages,
      ownership: { default: 2 },
      _stats: { coreVersion: PACK_CORE_VERSION }
    });
    for (const n of notes) {
      n.entryId = entryId;
      n.pageId = did(`page:${key}:${n.text}`);
    }
  }
  sceneDocs.push(doc);
}

// --- Scene compendium (browse / cherry-pick) ---
let count = 0;
for (const doc of sceneDocs) {
  const copy = structuredClone(doc);
  let embeddedTotal = 0;
  for (const collection of EMBEDDED) {
    const entries = copy[collection] ?? [];
    if (!Array.isArray(entries)) continue;
    copy[collection] = entries.map((e) => e._id);
    for (const e of entries) {
      delete e._key;
      e._stats = { coreVersion: PACK_CORE_VERSION, ...e._stats };
      batch.put(`!scenes.${collection}!${copy._id}.${e._id}`, e);
      embeddedTotal++;
    }
  }
  batch.put(`!scenes!${copy._id}`, copy);
  count++;
}
await batch.write();
await db.close();
console.log(`pack built: packs/golarion-scenes (${count} scenes)`);

// --- Adventure pack (install-everything, ids preserved on import) ---
const advDir = join(root, "packs", "golarion-adventure");
rmSync(advDir, { recursive: true, force: true });
mkdirSync(advDir, { recursive: true });
const advDb = new ClassicLevel(advDir, { keyEncoding: "utf8", valueEncoding: "json" });
await advDb.open();
const advFolders = (manifest.folders ?? []).map((name, i) => ({
  _id: folderId(name),
  name,
  type: "Scene",
  folder: null,
  sorting: "a",
  sort: (i + 1) * 100,
  color: null,
  flags: {},
  _stats: { coreVersion: PACK_CORE_VERSION }
}));
advFolders.push({
  _id: folderId(JOURNAL_FOLDER),
  name: JOURNAL_FOLDER,
  type: "JournalEntry",
  folder: null,
  sorting: "a",
  sort: 100,
  color: null,
  flags: {},
  _stats: { coreVersion: PACK_CORE_VERSION }
});
const adventure = {
  _id: did("adventure"),
  name: "Golarion Maps",
  img: "modules/foundryvtt-golarion-maps/assets/thumbs/golarion-world.webp",
  caption: "The PathfinderWiki interactive map of Golarion as Foundry scenes.",
  description:
    "<p>Sixty scenes of Golarion — the world, continents, the Inner Sea meta-regions, eighteen nations, city regions, and fourteen full city maps — generated from the <a href=\"https://github.com/pf-wikis/mapping\">PathfinderWiki mapping project</a>, with location pins linked to gazetteer journals and PathfinderWiki articles.</p><p>This module uses trademarks and/or copyrights owned by Paizo Inc., used under Paizo's Community Use Policy. It is not published, endorsed, or specifically approved by Paizo.</p>",
  scenes: sceneDocs,
  journal: journalDocs,
  folders: advFolders,
  actors: [],
  items: [],
  tables: [],
  macros: [],
  cards: [],
  playlists: [],
  combats: [],
  sort: 0,
  flags: {},
  _stats: { coreVersion: PACK_CORE_VERSION }
};
await advDb.put(`!adventures!${adventure._id}`, adventure);
await advDb.close();
console.log(
  `pack built: packs/golarion-adventure (1 adventure: ${sceneDocs.length} scenes, ${journalDocs.length} journals, ${advFolders.length} folders)`
);
