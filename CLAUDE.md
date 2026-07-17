# foundryvtt-golarion-maps

Foundry VTT module: create scenes from the PathfinderWiki interactive Golarion
map (pf-wikis/mapping). Answers upstream issue pf-wikis/mapping#299. Owned by
github.com/cliffcolvin/foundryvtt-golarion-maps; MIT code, map data under Paizo Community Use Policy.

Read DECISIONS.md before changing anything structural — endpoint
configurability, the style generation pipeline, and the maplibre version pin
all have recorded reasons.

## Layout

- `src/` — TS module source (entry `module.ts`; picker app, bake, scale, style loader)
- `scripts/generate-style.mjs` — regenerates `assets/style.json` from a shallow
  clone of pf-wikis/mapping (their style is code, not a served JSON)
- `scripts/mirror-map-data.mjs` — mirrors pmtiles/fonts/sprites into `map-data/`
  (gitignored; ~220 MB) for self-hosting/dev
- `assets/style.json` — generated, checked in, `__HOST__` placeholder
- Build: `npm run build` (vite lib build → `dist/module.js` + `dist/style.css`)

## Dev loop

Junction this folder into `%LOCALAPPDATA%\FoundryVTT\Data\modules\foundryvtt-golarion-maps`,
`npm run watch`, refresh Foundry (F5). Local map data: `npm run mirror`, then
set the module's endpoint setting to `modules/foundryvtt-golarion-maps/map-data`.

## Gotchas

- Tiles are MLT-encoded; maplibre-gl must stay on upstream's version range.
- map.pathfinderwiki.com has no CORS headers; never treat it as a usable
  runtime default from a browser origin.
- Foundry v13+ ApplicationV2; picker class is built lazily at `ready` because
  `foundry.applications.api` must exist before subclassing.
