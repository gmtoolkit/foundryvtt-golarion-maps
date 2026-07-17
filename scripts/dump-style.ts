// Runs upstream's style factory (pure function of host + data hash) and writes
// it with a __HOST__ placeholder. Executed via tsx by generate-style.mjs.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// @ts-ignore - resolved from the shallow clone made by generate-style.mjs
import style from "../.cache/mapping/frontend/src/ml-style/style.ts";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const compiled = style("__HOST__", 0);
mkdirSync(join(root, "assets"), { recursive: true });
writeFileSync(join(root, "assets", "style.json"), JSON.stringify(compiled));
console.log(
  `style.json: ${compiled.layers.length} layers, sources: ${Object.keys(compiled.sources).join(", ")}`
);
