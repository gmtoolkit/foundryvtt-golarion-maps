# Decision log — foundryvtt-golarion-maps

## 2026-07-18 — Standalone label-free map pack (maps_stand_alone.zip)

**Decision:** Check in maps/ — all 297 painted maps as LABEL-FREE webp images (the raw
art-generation masters, no text/pins/grids), converted from the .cache JPEG masters via
cwebp q85 (998 MB jpg -> 261 MB webp). maps/ sits outside the module payload (not in
module.zip or deploy); CI packages it as a third release asset, maps_stand_alone.zip,
for GMs who want just the images without Foundry or the module.
**Why:** Cliff — the source maps are a great standalone asset for GMs on other VTTs.
**Alternatives:** shipping the labeled composites (rejected: labels baked in defeats reuse);
not checking the images in and converting in CI (impossible — CI cannot regenerate art).
**Consequences:** the archive is CUP content, NOT MIT — the images depict Golarion, so the
Community Use Policy travels with them (maps/README.md ships inside the zip stating terms);
MIT remains code-only. Repo grows ~261 MB. Refreshing any map means re-converting its
master into maps/ as part of the art pipeline.

## 2026-07-18 — Painted-only module; CC BY-NC-SA removed; release CI

**Decision:** Collapsed the two-module split: `foundryvtt-golarion-maps` now ships the
painted art directly (297 painted webps moved from painted/assets/ into assets/; every scene
background points at this module's own paths). The vector-render scene backgrounds and the
`foundryvtt-golarion-maps-painted` companion module are deleted. Gazetteer journal pages no longer embed
PathfinderWiki article text — only a blurb + outbound wiki link — which removes CC BY-NC-SA
from the module entirely (the text was the only CC-licensed content; the wiki-extract fetch
script and cache are deleted). Licensing: code MIT; map content stays under Paizo CUP
(verified pf-wikis/mapping itself operates under CUP — our images depict Golarion and cannot
be MIT'd). README rewritten around the painted collection; the live-bake/picker pitch is gone
(the bake pipeline remains as dev tooling, picker still gated off by default).
Added .github/workflows/release.yml: every push to main builds dist + packs, bumps semver
(patch default; #minor/#major in commit message; [skip release] to skip), stamps
module.json manifest/download URLs, and publishes a GitHub release with module.json +
module.zip (the standard Foundry install payload, per the League module template).
**Why:** Cliff's call — one module, generated art only, cleanest possible licensing, automated
releases.
**Alternatives:** keeping the -painted id as the survivor (rejected: the main id is the repo
name and install URL); keeping wiki text under CC (rejected: license simplification wins).
**Consequences:** data/gazetteer-search.json is now checked in (build-packs needs it; map-data/
is gitignored and absent in CI — refresh it after npm run mirror). packs/ and dist/ stay
gitignored; CI builds them. Worlds that imported the old -painted module upgrade in place on
next import (same deterministic ids); the painted module dir was removed from local Foundry
data. Release URLs only work once the repo goes public. Pending cleanups: settings-menu hint
still says 'all 60 scenes'; CLAUDE.md header still describes the live-bake pitch.

## 2026-07-17 — Pin-leak root cause: visual markers beat prompt text

**Decision:** For town bases that carry settlement marker icons (keepIcons), a prompt-only
'never paint the markers' rule is insufficient — 8 of 142 re-rolls still painted the literal
teardrop glyphs. The reliable fix is removing icons from the base image entirely and stating
'the input has NO markers; place the main settlement at the exact CENTER of the frame'
(fix batch: 10/10 clean).
**Why:** the image-editing model weights salient visual features in the input over negative
text instructions; the marker glyph survives as 'part of the map'.
**Consequences:** future town generations should use icon-free bases + center-placement
language from the start; keepIcons remains useful only if the marker is restyled to something
the model reads as terrain. Old art preserved in .cache/gemini/v1-backup/.


## 2026-07-17 — Biome-aware re-roll round (audit follow-up)

**Decision:** Regenerate the 167 audit-flagged painted maps (142 towns, 25 region maps) via a
second Gemini Batch job with PER-KEY style prompts authored in `data/reroll-prompts.json`
(Tian = East-Asian architecture, dwarven holds = surface gates/forges/mines, Qadira = Keleshite
arid, Irrisen = eternal winter, Arcadia = Mesoamerican, Geb/Nidal = gothic-necrotic, etc.).
Templates live in `.cache/gemini/gemini_batch_v3.py`: TOWN/CITY templates inject a SETTING
clause that "must dominate the image", plus a MARKER RULE (fixes the pin-leak class); the
REGION template replaces v1's "pale terrain = desert/ice" inference (root cause of the bogus
sand-dune/snowfield hallucinations) with an explicit per-map TERRAIN TRUTH clause.
**Why:** manual audit (docs/city-audit.md) found 171/303 mismatches; the generic temperate
prompt erased culture and biome, and the region prompt's pale→desert inference corrupted
otherwise-good maps.
**Alternatives:** prompt-free re-roll (rejected — same failure mode); inpainting/edit passes
(rejected — batch edit not supported for this model, cost similar to full re-roll).
**Consequences:** old jpgs preserved in `.cache/gemini/v1-backup/`. `cheliax` switched from
gazetteer-label fit (matched a bbox spanning the whole Inner Sea) to manual `center:[-21.3,35.8],
zoom:5.1` — its LEAN scene must be re-baked at next pack build too. The 6 REMOVE scenes
(alabaster-academy/fancy-reefclaw/gold-goblin/irim/gholinom/pobashabla) are dropped from
assets/regions.json; already-imported copies in test worlds need manual deletion.
## 2026-07-17 — Town-detail tier (Otari + 7 capitals); keepIcons bases; label-dedup recomposite

**Decision:** Added 8 town-detail scenes (Otari, Katheer, Starfall, Pangolais,
Isarn, Iadara, New Stetven, Kalsgard) at radiusMi 8 / maxZoom 13 in the Cities
folder — Cliff's call after 'Otari Region' (30 mi) proved too zoomed-out to
show the town itself. bakeBase gained a keepIcons spec flag: district-less
towns keep settlement marker icons in the AI base (text still stripped) so the
model knows where to paint the town; district cities keep pure geometry.
**Also:** five-kings-mountains painted art had model-drawn labels (Gemini
knows Golarion from training and labeled Darkmoon Vale / Palakar Forest /
Verduran Forest unprompted) duplicating our composite. Fix pattern for label
collisions: recomposite from the existing painted jpg with the colliding
names excluded from our label layer (filter ["!",["in",["get","label"],...]])
— zero regeneration cost. Watch for this in QA on other maps.
**Consequences:** 100 scenes/99 journals. Town pins are sparse (1-2) at
16-mi frames — zoom-gated upstream icons; acceptable, gazetteer still per pin.

## 2026-07-17 — Two modules (lean + painted); hex-grid policy; composite pipeline

**Decision:** Ship two modules from this repo: lean (code + vector art,
~30 MB) and `foundryvtt-golarion-maps-painted` (72 MB: painted backgrounds +
its own scene/adventure packs, `requires` lean, no code). Same deterministic
document ids in both, so importing the painted Adventure upgrades a lean
world's scenes in place (verified; note: the update path takes ~4 min vs ~1
min for fresh import — PF2e re-prepares each scene). Painted scenes are the
composite of the Gemini art + a labels-only transparent MapLibre bake at
matched pixel ratio; note coords/grid sizes scale per-axis (Gemini "3:2 2K" is
2528x1696 = 1.4906, a 0.6% vertical stretch vs true 3:2 — axes scaled
independently so pins stay exact). World map rebaked/re-rolled at 3:2 (was
16:10, would have stretched).
**Grid policy** (build-time, both modules): Inner Sea meta-regions hex rows @
exactly 50 mi; Nations + City Regions hex rows @ exactly 10 mi (PF2e
hexploration); World & Continents and Cities gridless with correct ruler
distances (grids are noise over painted rooftops; flipping a city scene to
squares yields exact distances). Hex px size derived from real map scale so
distances are round numbers.
**Consequences:** Two manifests/registry listings (module.json +
painted/module.json; release assets module.zip / module-painted.zip). Painted
art committed to the repo for reproducible releases. 10-mi hexes are dense on
big nation maps (24 px) — QA may want 20-25 mi on the largest.

## 2026-07-17 — AI-painted art set pipeline (Gemini), label-free bases

**Decision:** Added `api.bakeBase(spec)` — renders a region with every
symbol/label/icon layer stripped at low resFactor (1.5): the clean geometry
input for AI stylization. `.cache/gemini/gemini_batch.py` (gitignored, run
manually from WSL with GEMINI_KEY pulled from Vault kv/gmkit/app) sends ONLY
these self-rendered bases to gemini-3-pro-image-preview at 2K: painted-atlas
prompt for regions/nations, painted-city prompt for the Cities tier. Prompts
demand ZERO text (model-drawn labels hallucinate/typo — observed "Foreignt
Court"); names stay in our label layer and Note pins. Labeled context images
are NOT sent (text leaks into output). Never send Paizo artwork as input.
**Why:** Cliff wants a high-fidelity painted art set; test renders (Inner Sea,
Absalom) proved the model preserves geography well at region scale and paints
plausible street-level city detail from wall/district outlines.
**Consequences:** Painted outputs are derivatives of CUP content via a
third-party model — same CUP posture, keep free. Integration (label
compositing over painted bases, alternate art set packaging) is a follow-up
decision once the 60-map batch is reviewed. City-scale geometric fidelity is
approximate; treat painted city maps as illustrative, the vector set stays the
canonical one.

## 2026-07-17 — All document ids normalized deterministically at pack build

**Decision:** build-packs.mjs overrides scene/level/note ids with sha1-derived
ids from the region key (journals/pages/folders already were). Generation-time
random ids are treated as throwaway.
**Why:** Adventure re-imports match by id; random ids meant every regeneration
duplicated all 60 scenes in users' worlds instead of updating them (found when
Cliff's world had a stale 5-pin Absalom next to the new 143-pin one).
**Consequences:** Regenerate-and-reimport is now a safe update path. Note ids
derive from (scene, label) so a pin's world identity survives regeneration;
GM customizations on our pins survive re-import as updates, not dupes.

## 2026-07-17 — City maps pin every POI (dense-filter was nation-only concern)

**Decision:** The settlement-only filter for dense views applies below zoom 9
only; city-zoom views pin every rendered marker (capped 150 by prominence).
Match tolerance floors at ~150 m (overzoomed tiles quantize to the z8 grid).
**Why:** Absalom's city map rendered 100+ POI markers, tripping the dense
filter meant for nation maps and leaving 5 pins; on a city map the POIs are
the content. Absalom now pins 143 locations, each with a gazetteer page.

## 2026-07-17 — Gazetteer journals via Adventure packaging; one-button installer

**Decision:** Phase B executed. Per-scene gazetteer journals (59) generated at
pack-build time from the note pins (no re-bake); notes carry entryId/pageId
with deterministic sha1 ids. Distribution adds an Adventure pack ("Install
All") bundling scenes + journals + folders, and a settings-menu button that
opens the Adventure importer. Pins on individually-imported scenes fall back
to opening PathfinderWiki when the journal is absent.
**Why:** Compendium import regenerates ids, severing note→journal refs;
Adventure import preserves ids. Deterministic ids make re-imports act as
updates.
**Gotchas (verified v14.365):** a settings menu `type` must be a real
ApplicationV2 subclass — a plain class with render() makes registerMenu throw
and silently kills the whole init hook (all module settings vanish).
AdventureImporter is still an AppV1 sheet (`.app`, not `.application`).
Importing 60 PF2e scenes freezes the main thread ~60 s; the import completes.
**Consequences:** Journal content is minimal (name + wiki link) by design —
GM's own notes belong in their world copy. Scene compendium and Adventure
duplicate the scene data (~11 KB docs, negligible); keep both in sync via the
single build script.

## 2026-07-17 — Cities tier: 14 real city maps found in upstream district data

**Decision:** Added a "Cities" folder with 14 full city-map scenes (Absalom,
Magnimar, Korvosa, Kaer Maga, Kintargo, Vyre, Katapesh, Almas, Port Peril,
Ilizmagorti, Kerse, Nerosyan, Urgir, Breachill), and renamed the environs tier
to "City Regions" / "<City> Region" per Cliff. Cities are discovered by
clustering the gazetteer's 109 district entries by proximity (a city = a
district cluster), framed by the union bbox of its districts (new fit mode:
`fit.near` + `radiusDeg`), baked at up to z11.5 overzoom.
**Why:** Cliff asked whether upstream has real city maps like Paizo's painted
Absalom map. Answer: yes for these 14 — district polygons, walls, harbors, and
dozens of named building POIs render as clean vector city maps (verified
Absalom side-by-side against the Paizo map: same districts, same landmarks).
The painted Paizo artwork itself is product art and cannot be shipped.
**Consequences:** 60 scenes total. Note-matching tolerance now scales with
zoom (0.03° at nation scale is 2 mi; city zoom needs ~0.001°). City POI pin
counts are conservative (icons render zoom-gated upstream); a deeper-zoom
note pass is a QA follow-up. Earlier lesson kept: vector overzoom past
maxZoomWithData=8 stays crisp for borders/labels, terrain polygons get chunky.

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

## 2026-07-17 — Add-on round (92 scenes) + chunked import (socket-size hang)

**Decision:** Added 32 scenes: 14 nations/regions (River Kingdoms, Shackles,
Isger, Ravounel, Gravelands, Sarkoris Scar, Molthune, Nirmathas, Rahadoum,
Thuvia, Jalmeray, Druma, Razmiran, Five Kings Mountains) + 18 city regions
(Highhelm, Otari, Alkenstar, Whitethrone, Caliphas, Nantambu, Egorian,
Daggermark, Pitax, Elidir, Vigil, Kenabres, Canorate, Tamran, Azir, Merab,
Niswan, Thronestep). Total 92 scenes / 91 journals in both modules.
**Hard-won:** Adventure#import() silently hangs at this content size — it
ships the whole set in a few giant socket batches (~5k notes + journal pages
with article text exceed what the websocket path handles). The settings-menu
importer now does CHUNKED create/update (8 scenes / 4 journals per batch,
keepId) — 40 s instead of a permanent hang. Never revert to sheet-based
Adventure import. Also: never run two in-page bake loops concurrently (WebGL
context exhaustion → "timed out waiting for map render").
**Consequences:** Highhelm and other interior/underground cities can only get
surface "Region" maps (no district data; their canonical maps are interiors).
Tian Xia nations deferred to a dedicated round.

## 2026-07-17 — Geographic folder tree (Regions/<name>/... + mirrored Gazetteers)

**Decision:** Scenes and journals restructured into a geographic hierarchy:
top folders World & Continents, Inner Sea Regions, and Regions/<region name>
containing that region's map + city-region maps + city/town maps; journal
folders mirror under Gazetteers/<region name>. Assignment is automatic:
point-in-bbox containment against gazetteer nations+subregions, preferring the
smallest container that has a region map (folds micro-nations like Daggermark
and the Shoanti quahs into River Kingdoms / Varisia). Absalom nation maps to
the "Absalom & Starstone Isle" folder. Folder ids namespaced sfolder:/jfolder:
(old flat-tier folders orphan on re-import; delete empty folders after).
**Gotcha:** gazetteer bboxes overlap at borders — Isarn landed in River
Kingdoms; per-key "regionFolder" manifest override wins over containment.
QA browse should verify placements and add overrides where wrong.
