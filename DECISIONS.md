# Decision log — foundryvtt-golarion-maps

## 2026-07-17 — 46-scene pack: nations + city environs tiers, folders, wiki-linked pins

**Decision:** Expanded from 18 to 46 scenes in four compendium folders (World
& Continents / Inner Sea Regions / Nations ×18 / City Environs ×10). New
regions are framed from the upstream gazetteer (search.json bboxes; point
features get a radiusMi) instead of hand-tuned zooms. Every scene (except the
world map) gets Note pins: rendered location icons matched to gazetteer names
by proximity (tiles carry only feature ids), projected to image pixels, capped
at 150 per scene by settlement prominence (capitals > large cities > … >
villages; generic POI dots dropped on dense views, kept on sparse city-environs
views). Pins carry a PathfinderWiki URL flag; an `activateNote` hook opens the
article on click (verified the hook exists and respects `false` in v14 core).
**Why:** Cliff asked for regional depth and clickable named points. True
street-level city maps do NOT exist upstream (maxZoomWithData = 8, ~250 m/px);
city "environs" at the data limit are the honest maximum. In-Foundry gazetteer
journals were deferred: compendium import regenerates ids, which breaks
note→journal references unless we repackage as an Adventure document — that is
the planned Phase B.
**Consequences:** 46 webp (22 MB) + 3,125 notes; folder ids are deterministic
(sha1 of name) so pack rebuilds don't churn. search.json is now part of the
mirror. Nation bbox fits can be generous (Cheliax sweeps in neighbors) —
per-region overrides in regions.json are the tuning knob for the QA pass.

## 2026-07-17 — Compendium-first restructure (Cliff confirmed the pivot)

**Decision:** v0.1 ships a curated 18-scene compendium (world, 6 continents,
Inner Sea super-region, the 10 Inner Sea meta-regions + Absalom) generated
from assets/regions.json via the module's own API
(game.modules.get(id).api.generateScenes) driven in a GM session. The live
picker is gated behind an `enablePicker` world setting, default off. Images
ship in assets/scenes/ (~11 MB webp total at 3-4x resolution); pack sources in
packs-src/, compiled by scripts/build-packs.mjs.
**Why:** Runtime rendering is fragile in end-user ways (worker chunks, rAF,
prerelease maplibre); pre-rendered scenes remove all of it from the default
path. Full trade-off analysis in the PENDING PIVOT entry below (now executed).
**Consequences:** Compendium regeneration is a manual/CI step when upstream
map data changes; a headless Playwright generator is the follow-up so CI can
do it without a live Foundry session. Curation (centers/zooms in regions.json)
was eyeballed from label anchors; refine per-region after visual review.

## 2026-07-17 — Hand-rolled pack writer; v14 pack format facts

**Decision:** scripts/build-packs.mjs writes the LevelDB directly with
classic-level instead of @foundryvtt/foundryvtt-cli's compilePack.
**Why (hard-won, each cost a debug cycle):**
1. The v14 server stores scene `levels` as separate `!scenes.levels!<sceneId>.<levelId>`
   sub-entries with the scene carrying only an id array — inline level objects
   in the scene entry are silently dropped.
2. Scene AND level entries need `_stats.coreVersion` stamped; without it the
   server migrates them as pre-v14 documents and synthesizes a
   `defaultLevel0000`, discarding our level and its background image.
3. The CLI (v3.0.4) does the split correctly but does not stamp _stats, and it
   hard-fails (LEVEL_INVALID_KEY) unless every embedded level carries its own
   _key. Owning the 30-line writer beats patching around it.
**Consequences:** PACK_CORE_VERSION constant must track the verified Foundry
version on compatibility bumps.

## 2026-07-17 — Deploy-copy replaces the junction

**Decision:** Local dev deploys via `npm run deploy` (build + packs + copy to
FoundryVTT/Data/modules); the directory junction is gone.
**Why:** classic-level cannot open a DB through a Windows directory junction —
its manifest renames fail with "path not found" and the pack silently never
loads (reproduced standalone; real path works, junction path fails).
**Consequences:** Edit-test loop needs `npm run deploy` instead of being free;
the deployed layout now exactly mirrors the release zip, which is a plus. The
209 MB map-data mirror is copied only when absent from the target.

## 2026-07-17 — Ship maplibre worker chunks alongside the bundle

**Decision:** The vite build copies `maplibre-gl-worker.mjs` and
`maplibre-gl-shared.mjs` (plus maps) into `dist/` (see the
`copy-maplibre-worker` plugin in vite.config.ts).
**Why:** maplibre v6 spawns its worker via
`new URL("./maplibre-gl-worker.mjs", import.meta.url)` at runtime; it is not
inlined in the library bundle, so without these files next to `module.js` the
map silently never loads tiles (the worker request 404s with no console error).
**Consequences:** The two chunks must stay version-locked to the bundled
maplibre; the copy step handles that automatically on every build.

## 2026-07-17 — E2E verified in-world; two findings recorded

**Decision:** First full in-Foundry test passed (picker renders the Golarion
map, bake + upload + scene creation work, grid scale correct: Inner Sea at
79 mi/square). Two findings, one fixed, one open:
1. FIXED in test setup, relevant to docs: maplibre v6 waits on
   `requestAnimationFrame` to apply styles; in a hidden/backgrounded tab rAF
   never fires and style load stalls forever with zero error events. Normal
   visible-tab users are unaffected. Automated testing must patch rAF to a
   timer or keep the tab visible (see AIOS foundry-local-dev skill).
2. OPEN BUG: Foundry v14 removed `Scene.background` from the schema; scenes
   now carry a `levels` embedded collection (each level has its own
   `background.src`) plus `initialLevel`. Our `Scene.create` call silently
   loses the baked image. Fix must write the background into a level and stay
   compatible with v13's flat `background.src`.
**Consequences:** `src/apps/picker.ts` gained a `__golarionMapsDebug` global
and a map error logger (debug aids, keep; they cost nothing). `test/isolate.html`
exists as a dev harness but Foundry serves .html as text/plain, so it is only
usable outside Foundry's static server.

## 2026-07-17 — PENDING PIVOT (awaiting Cliff's confirmation): compendium-first

**Decision (proposed, not yet executed):** Cliff proposed shipping
pre-generated maps as a compendium of scenes (curated regions, imported by
users) instead of on-the-fly generation as the primary UX. Recommended shape:
compendium-first with the existing bake code repurposed as a headless CI
generator; live picker demoted to an optional power feature; binaries hosted
on GitHub releases under gmtoolkit (NOT gmkit.io, to keep Paizo CUP
non-commercial separation clean).
**Why:** Today's debugging showed the runtime rendering path is fragile in
exactly the ways end users would hit (worker chunks, rAF stalls, maplibre
prerelease pin); pre-rendered scenes remove all of it from the user path.
**Consequences:** Not yet implemented; next session should confirm and
restructure. v14 levels fix is required under either shape.

## 2026-07-17 — Standalone module, not an in-tree PR (yet)

**Decision:** Build as a standalone Foundry module under the gmtoolkit org,
then comment on pf-wikis/mapping#299 offering it upstream (in-tree or linked).
**Why:** Foundry modules need their own release artifacts (manifest + zip) and
Foundry-version churn maintenance; pushing that into a Java tile-pipeline repo
via a cold PR is a big ask. Build and prove it first, then let the maintainer
choose. Cliff decided this explicitly on 2026-07-17.
**Alternatives:** In-tree PR first (slow, presumes maintainer buy-in);
contributing to Ikaguia/fvtt-globe-map (solves live-globe rendering, not the
baked-scene use case issue 299 asks for).
**Consequences:** We own releases and registry listing; upstream conversation
still pending before any public announcement.

## 2026-07-17 — MVP is baked scene backgrounds; live layer deferred

**Decision:** v0.1 bakes the current MapLibre viewport into a static scene
background. A live pan/zoom layer is deferred; if demand appears it becomes an
opt-in experimental toggle in this same module (shared MapLibre/tile plumbing),
after talking to Ikaguia about overlap with fvtt-globe-map.
**Why:** Matches what issue 299 literally proposes; robust (no PIXI/MapLibre
canvas interleaving); complements rather than duplicates fvtt-globe-map.

## 2026-07-17 — Style generated from upstream source with __HOST__ placeholder

**Decision:** `assets/style.json` is generated by running upstream's pure
`style(host, hash)` TypeScript function (shallow clone + tsx) with host
`__HOST__`, substituted at runtime from a module setting.
**Why:** There is no static style.json to fetch (the site 403s; the style is
compiled into their JS bundle at build time), and hand-maintaining a fork of a
100+ layer style would rot immediately. Upstream's vite config proves the
function is Node-safe.
**Alternatives:** Extracting map.getStyle() from the live site (worked poorly:
bundle exports are stripped); handwriting a style (rot).
**Consequences:** The mapping repo has NO code license; the generated style is
derived from their code. Acceptable for a free CUP-compliant community module
in the same posture as fvtt-globe-map, but we should ask upstream to add a
license when we comment on issue 299. Regenerate the style periodically to
track upstream.

## 2026-07-17 — Configurable map-data endpoint; self-hosted mirror is required, not optional

**Decision:** All map data (pmtiles/fonts/sprites) loads from a configurable
endpoint. Default will be a gmtoolkit-hosted mirror (Linode object storage);
map.pathfinderwiki.com is NOT usable as a browser-side default.
**Why:** map.pathfinderwiki.com serves no Access-Control-Allow-Origin headers,
so a Foundry origin (localhost:30000 or hosted) is CORS-blocked from fetching
it; and even if it worked, pushing Foundry traffic at PathfinderWiki's CDN is
someone else's bandwidth bill. Mirroring (~217 MB pmtiles + fonts + sprites)
solves both. A path-style endpoint inside Foundry data works same-origin with
zero CORS setup (used for dev).
**Consequences:** Need a refresh process for the mirror as upstream ships new
map data (pmtiles URL is content-hashed by ?v= query only, so a periodic
re-download suffices). Linode CORS config needed before release.

## 2026-07-17 — Match upstream's rendering stack exactly

**Decision:** Pin maplibre-gl to upstream's range (^6.0.0-20 prerelease) and
pmtiles ^4.4.1.
**Why:** The tiles are encoded as MLT (MapLibre Tiles, `encoding: mlt`), not
classic MVT; older maplibre-gl cannot decode them. Upstream's version range is
the compatibility statement.
**Consequences:** Bundle tracks a prerelease; revisit when maplibre-gl 6 goes
stable. MapLibre's default inline (blob) worker is used rather than a separate
worker file to keep the Foundry lib build simple.

## 2026-07-17 — Golarion treated as Earth-sized for grid scale

**Decision:** Grid distance = mercator meters-per-pixel at viewport center,
Earth circumference, converted to miles.
**Why:** Upstream's own measure tool uses turf (Earth radius), so scenes match
what users measure on the website. No canonical Golarion planet radius is
authoritative enough to fight that.
**Consequences:** High-latitude bakes inherit mercator distortion; distance is
exact only at viewport center. Fine at region/city zooms; documented in README.
