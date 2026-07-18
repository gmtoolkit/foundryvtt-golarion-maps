# foundryvtt-golarion-maps

Foundry VTT module shipping 297 painted map scenes of Golarion (world →
continents → nations → city regions → cities → towns) with hexploration
grids, location pins, and gazetteer journals. Geography follows
pf-wikis/mapping (answers upstream issue pf-wikis/mapping#299). Owned by
github.com/cliffcolvin/foundryvtt-golarion-maps; MIT code, map content under
Paizo Community Use Policy, NO CC-licensed content (wiki text deliberately
not embedded — see DECISIONS 2026-07-18).

Read DECISIONS.md before changing anything structural — the painted-only
restructure, pack format, grid policy, and art-generation pipeline all have
recorded reasons.

## Layout

- `src/` — TS module source (entry `module.ts`): settings-menu chunked
  importer + note hook (shipped surface), plus the map bake/picker pipeline
  (dev tooling, picker gated off by default)
- `assets/scenes|thumbs/` — the painted art (checked in, ~380 MB)
- `packs-src/*.json` — one scene doc per key; `scripts/build-packs.mjs`
  compiles them into `packs/` (gitignored; built locally and in CI)
- `data/reroll-prompts.json` — per-key art-style prompts;
  `data/gazetteer-search.json` — checked-in gazetteer index for pack builds
- `assets/regions.json` — region manifest (fit/center/zoom/grid/folders)
- `.github/workflows/release.yml` — push to main → semver GitHub release
  with module.json + module.zip (`#minor`/`#major`/`[skip release]` in the
  commit message steer it)
- `scripts/generate-style.mjs` / `mirror-map-data.mjs` — dev-only: style +
  local tile mirror (`map-data/`, gitignored) for the bake pipeline

## Dev loop

`npm run deploy` (build + packs + copy into
`%LOCALAPPDATA%\FoundryVTT\Data\modules\foundryvtt-golarion-maps` — a real
copy, never a junction; LevelDB packs can't open through one). The deploy
EPERMs while a world is live (pack DB lock): return to setup first. For bake
work: `npm run mirror`, set the endpoint setting to
`modules/foundryvtt-golarion-maps/map-data`.

## Gotchas

- Tiles are MLT-encoded; maplibre-gl must stay on upstream's version range.
- map.pathfinderwiki.com has no CORS headers; never treat it as a usable
  runtime default from a browser origin.
- Foundry v13+ ApplicationV2; picker class is built lazily at `ready` because
  `foundry.applications.api` must exist before subclassing.

## Vault Integration

This repo lives in Cliff's Ideaverse vault. Claude Code only discovers CLAUDE.md/skills within a repo's own directory boundary — opened standalone here, it won't automatically inherit the vault's logging conventions. To stay consistent with the rest of the vault:

- **Vault root:** `C:\Users\Cliff\Vaults\Ideaverse`
- **Log non-trivial actions** to `AIOS\History\Activity Log <YYYY-MM>.md` — format in `AIOS\Skills\activity-log\SKILL.md`
- **Log real decisions** to `AIOS\History\Decisions\` — format in `AIOS\Skills\decision-log\SKILL.md`
- Full skill/system index: `AIOS\Maps\Skill Map.md`

If these paths aren't reachable (e.g. a sandboxed run without the vault mounted), skip this section silently.
