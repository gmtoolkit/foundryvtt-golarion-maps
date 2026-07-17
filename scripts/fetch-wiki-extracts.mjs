// Pulls lead-section extracts from PathfinderWiki (MediaWiki TextExtracts
// API, no HTML scraping) for every location pinned on our scenes, and caches
// them in data/wiki-extracts.json — a checked-in, reviewable artifact.
//
// Run manually whenever you want fresher content:
//   node scripts/fetch-wiki-extracts.mjs            # fetch only missing labels
//   node scripts/fetch-wiki-extracts.mjs --refresh  # re-fetch everything
//
// The pack build (build-packs.mjs) reads the cache if present; pages without
// an extract fall back to the minimal name+link content.
//
// PathfinderWiki text is CC BY-NC-SA 4.0 (plus Paizo CUP for Paizo IP);
// every generated page carries attribution. Keep this module free.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const API = "https://pathfinderwiki.com/w/api.php";
const USER_AGENT =
  "foundryvtt-golarion-maps gazetteer builder (https://github.com/cliffcolvin/foundryvtt-golarion-maps)";
const BATCH = 10;
const THROTTLE_MS = 600;

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const cachePath = join(root, "data", "wiki-extracts.json");
const refresh = process.argv.includes("--refresh");

// Collect unique pinned labels from the pack sources.
const labels = new Set();
for (const f of readdirSync(join(root, "packs-src")).filter((x) => x.endsWith(".json"))) {
  const doc = JSON.parse(readFileSync(join(root, "packs-src", f), "utf8"));
  for (const n of doc.notes ?? []) if (n.text) labels.add(n.text);
}

mkdirSync(join(root, "data"), { recursive: true });
const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, "utf8")) : {};
const todo = [...labels].filter((l) => refresh || !(l in cache));
console.log(`${labels.size} unique pinned locations; fetching ${todo.length}`);

const today = new Date().toISOString().slice(0, 10);
let fetched = 0;
let found = 0;

for (let i = 0; i < todo.length; i += BATCH) {
  const batch = todo.slice(i, i + BATCH);
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    prop: "extracts|info",
    inprop: "url",
    exintro: "1",
    exlimit: "max",
    redirects: "1",
    titles: batch.join("|")
  });
  const resp = await fetch(`${API}?${params}`, { headers: { "User-Agent": USER_AGENT } });
  if (!resp.ok) {
    console.error(`HTTP ${resp.status} on batch ${i / BATCH}; stopping (progress saved)`);
    break;
  }
  const data = await resp.json();
  // Map redirects/normalization back to the labels we asked for.
  const back = new Map();
  for (const n of data.query?.normalized ?? []) back.set(n.to, n.from);
  for (const r of data.query?.redirects ?? []) {
    const orig = back.get(r.from) ?? r.from;
    back.set(r.to, orig);
  }
  const seen = new Set();
  for (const page of Object.values(data.query?.pages ?? {})) {
    const label = back.get(page.title) ?? page.title;
    if (!batch.includes(label)) continue;
    seen.add(label);
    if (page.missing !== undefined || !page.extract) {
      cache[label] = { missing: true, retrieved: today };
    } else {
      cache[label] = {
        title: page.title,
        url: page.fullurl ?? `https://pathfinderwiki.com/wiki/${encodeURIComponent(page.title.replaceAll(" ", "_"))}`,
        extract: page.extract.trim(),
        retrieved: today
      };
      found++;
    }
  }
  for (const label of batch) if (!seen.has(label)) cache[label] = { missing: true, retrieved: today };
  fetched += batch.length;
  if (fetched % 100 < BATCH) {
    writeFileSync(cachePath, JSON.stringify(cache, null, 1));
    console.log(`  ${fetched}/${todo.length} (${found} with content)`);
  }
  await new Promise((r) => setTimeout(r, THROTTLE_MS));
}

writeFileSync(cachePath, JSON.stringify(cache, null, 1));
const total = Object.keys(cache).length;
const withContent = Object.values(cache).filter((e) => !e.missing).length;
console.log(`done: ${total} cached, ${withContent} with content, ${total - withContent} missing on wiki`);
