// Compiles packs-src/*.json scene documents into the LevelDB compendium pack
// at packs/golarion-scenes.
//
// We write the DB directly with classic-level instead of using
// @foundryvtt/foundryvtt-cli's compilePack: the CLI splits the v14 `levels`
// embedded collection into `!scenes.levels!parent.child` sub-entries, but the
// v14 server does not resolve those — it discards the orphan id array and
// synthesizes a default level, losing the background image. Inline `levels`
// objects on the scene entry are what the server actually accepts (verified
// against Foundry v14.365, 2026-07-17).
import { ClassicLevel } from "classic-level";
import { mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const srcDir = join(root, "packs-src");
const packDir = join(root, "packs", "golarion-scenes");

rmSync(packDir, { recursive: true, force: true });
mkdirSync(packDir, { recursive: true });

// Documents without _stats.coreVersion are treated as pre-v14 and migrated,
// which synthesizes a default level and discards ours (with the background).
const PACK_CORE_VERSION = "14.365";

const db = new ClassicLevel(packDir, { keyEncoding: "utf8", valueEncoding: "json" });
await db.open();
const batch = db.batch();
let count = 0;
for (const file of readdirSync(srcDir).filter((f) => f.endsWith(".json"))) {
  const doc = JSON.parse(readFileSync(join(srcDir, file), "utf8"));
  delete doc._key;
  if (!doc._id) throw new Error(`${file}: missing _id`);
  doc._stats = { coreVersion: PACK_CORE_VERSION, ...doc._stats };
  // Embedded levels live as separate sub-entries (world-DB style); the scene
  // document carries only their ids. Both need the coreVersion stamp or the
  // server migrates them as pre-v14 data and synthesizes a default level.
  const levels = doc.levels ?? [];
  doc.levels = levels.map((lv) => lv._id);
  for (const lv of levels) {
    delete lv._key;
    lv._stats = { coreVersion: PACK_CORE_VERSION, ...lv._stats };
    batch.put(`!scenes.levels!${doc._id}.${lv._id}`, lv);
  }
  batch.put(`!scenes!${doc._id}`, doc);
  console.log(`packed ${doc._id} (${doc.name}, ${levels.length} level)`);
  count++;
}
await batch.write();
await db.close();
console.log(`pack built: packs/golarion-scenes (${count} scenes)`);
