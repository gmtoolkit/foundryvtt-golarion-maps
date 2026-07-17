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

// PAINTED=1 builds the enhanced companion module (foundryvtt-golarion-maps-
// painted): same documents and deterministic ids, but backgrounds point at
// the painted art, dimensions/notes/grids scale to the painted image size,
// and output goes under painted/. Same ids mean importing the painted
// Adventure upgrades a lean install's scenes in place.
const PAINTED = process.env.PAINTED === "1";
const PAINTED_ID = "foundryvtt-golarion-maps-painted";
const PAINTED_W = 2528;
const PAINTED_H = 1696;
const outRoot = PAINTED ? join(root, "painted") : root;
const packDir = join(outRoot, "packs", "golarion-scenes");

// Web-mercator miles-per-image-pixel (world map needs a fresh computation:
// its painted view was rebaked at 3:2, unlike its original 16:10 scene doc).
const milesPerImagePx = (latDeg, zoom, cssWidth, imageWidth) =>
  (40075016.686 * Math.cos((latDeg * Math.PI) / 180)) /
  (512 * 2 ** zoom) / (imageWidth / cssWidth) / 1609.344;

function paintify(doc, key) {
  if (key === "golarion-world") {
    // Rebaked at center [20,10] zoom 1.4, css 1152x768 (see regions.json).
    doc.width = PAINTED_W;
    doc.height = PAINTED_H;
    doc.grid = { ...doc.grid, size: 100, distance: Number((100 * milesPerImagePx(10, 1.4, 1152, PAINTED_W)).toPrecision(3)), units: "mi" };
    doc.notes = [];
  } else {
    // Gemini's "3:2 2K" is 2528x1696 (1.4906), a 0.6% vertical stretch vs our
    // true-3:2 sources — visually negligible, but scale axes independently so
    // pin positions stay exact.
    const rx = PAINTED_W / doc.width;
    const ry = PAINTED_H / doc.height;
    doc.width = PAINTED_W;
    doc.height = PAINTED_H;
    doc.grid = { ...doc.grid, size: Math.max(20, Math.round(doc.grid.size * rx)) };
    for (const n of doc.notes ?? []) {
      n.x = Math.round(n.x * rx);
      n.y = Math.round(n.y * ry);
    }
  }
  for (const lv of doc.levels ?? []) {
    lv.background = { ...lv.background, src: `modules/${PAINTED_ID}/assets/scenes/${key}.webp` };
  }
  doc.thumb = `modules/${PAINTED_ID}/assets/thumbs/${key}.webp`;
}

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

// Grid policy (PF2e hexploration-friendly), applied at build time so both the
// lean and painted packs agree:
// - Inner Sea meta-regions: hex rows, snapped to exactly 50 mi per hex
// - Nations & City Regions: hex rows, snapped to exactly 10 mi per hex
// - World & Continents: gridless (ruler distance still correct)
// - Cities: gridless — grids are noise over painted rooftops; ruler distance
//   stays correct and flipping the scene to squares yields exact distances.
// Snapping keeps distance a round number by resizing the hex in pixels from
// the scene's real miles-per-pixel (derived from the stored grid fields).
const HEX_ROWS = 2; // CONST.GRID_TYPES.HEXODDR
const GRIDLESS = 0;
function applyGridPolicy(doc, folder) {
  const g = doc.grid ?? {};
  const milesPerPx = (g.distance ?? 1) / (g.size ?? 100);
  const snapHex = (targetMi) => {
    const size = Math.round(targetMi / milesPerPx);
    doc.grid = { ...g, type: HEX_ROWS, size: Math.max(20, size), distance: targetMi, units: "mi" };
  };
  if (folder === "Inner Sea Regions") snapHex(50);
  else if (folder === "Nations" || folder === "City Regions") snapHex(10);
  else if (folder === "Cities" || folder === "World & Continents") {
    doc.grid = { ...g, type: GRIDLESS };
  }
}

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
  const key = doc.__key ?? file.replace(/\.json$/, "");
  delete doc.__key;
  // Normalize ALL document ids deterministically from the region key so that
  // regenerating scenes never churns ids — Adventure re-imports then update
  // documents in place instead of duplicating them.
  doc._id = did(`scene:${key}`);
  for (const lv of doc.levels ?? []) lv._id = did(`level:${key}`);
  for (const n of doc.notes ?? []) n._id = did(`note:${key}:${n.text}`);
  if (PAINTED) paintify(doc, key);
  applyGridPolicy(doc, folderByKey.get(key) ?? null);
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
const advDir = join(outRoot, "packs", "golarion-adventure");
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
  _id: did(PAINTED ? "adventure-painted" : "adventure"),
  name: PAINTED ? "Golarion Maps (Painted)" : "Golarion Maps",
  img: PAINTED
    ? `modules/${PAINTED_ID}/assets/thumbs/golarion-world.webp`
    : "modules/foundryvtt-golarion-maps/assets/thumbs/golarion-world.webp",
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
