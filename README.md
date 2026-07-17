# Golarion Maps for Foundry VTT

Create Foundry scenes directly from the [PathfinderWiki interactive map of
Golarion](https://map.pathfinderwiki.com) ([pf-wikis/mapping](https://github.com/pf-wikis/mapping)).
Pan and zoom the vector map inside Foundry, then bake the current view into a
scene background at the resolution you choose, with a correctly scaled
miles-based grid.

This addresses [pf-wikis/mapping#299](https://github.com/pf-wikis/mapping/issues/299)
(render the map with MapLibre offscreen and move it onto Foundry's background
layer). A live always-pannable map layer is out of scope for now; see
[Ikaguia/fvtt-globe-map](https://github.com/Ikaguia/fvtt-globe-map) for that
approach.

## How it works

- The MapLibre style is generated from pf-wikis/mapping's style source
  (`npm run style`) with a placeholder host, checked in as `assets/style.json`.
- At runtime the module fetches vector tiles (a single `golarion.pmtiles` via
  HTTP range requests), fonts, and sprites from a **configurable endpoint**
  (module settings). The default mirror is hosted by this project so the
  PathfinderWiki servers don't pay for Foundry traffic.
- "Create Scene" re-renders your current viewport offscreen at 1×–4×
  resolution with `preserveDrawingBuffer`, captures it as WebP, uploads it to
  your Foundry data (`golarion-maps/`), and creates a scene whose grid distance
  is computed from the map scale at the viewport center (Golarion is treated as
  Earth-sized, matching the website's own measuring tool).

## Self-hosting the map data

`npm run mirror` downloads `golarion.pmtiles` (~217 MB), sprites, and fonts
into `map-data/`. Serve that directory anywhere (object storage, a subfolder of
your Foundry data, etc.) and point the "Map data endpoint" setting at it. If it
lives inside your Foundry install (e.g. `modules/foundryvtt-golarion-maps/map-data`),
requests are same-origin and no CORS setup is needed.

## Development

```sh
npm install
npm run style    # generate assets/style.json from upstream source
npm run mirror   # optional: local copy of tiles/fonts/sprites into map-data/
npm run build    # bundle to dist/
```

Symlink or junction the repo folder into `FoundryVTT/Data/modules/foundryvtt-golarion-maps`.

## Gazetteer content

`npm run wiki` pulls lead-section extracts for every pinned location from the
PathfinderWiki MediaWiki API (throttled, no scraping) into
`data/wiki-extracts.json`, which is checked in. Run it whenever you want
fresher article text, review the diff, commit; the pack build embeds the
extracts into the gazetteer journal pages with per-page attribution. Pages
without a matching article fall back to a name + wiki-link stub.

## Licensing and attribution

Module code is MIT licensed.

Gazetteer journal text is from [PathfinderWiki](https://pathfinderwiki.com),
licensed [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
(Paizo IP therein under the Community Use Policy); each journal page carries
its source article link and retrieval date. That content remains under
CC BY-NC-SA in your world.

This module uses trademarks and/or copyrights owned by Paizo Inc., used under
[Paizo's Community Use Policy](https://paizo.com/licenses/communityuse). We are
expressly prohibited from charging you to use or access this content. This
module is not published, endorsed, or specifically approved by Paizo. For more
information about Paizo Inc. and Paizo products, visit
[paizo.com](https://paizo.com).

The map itself is the work of the [PathfinderWiki mapping
project](https://github.com/pf-wikis/mapping), building on GIS data by John
Mechalas and interactive map work by Oznogon. This module renders their data
and generates its style from their source; it would be nothing without them.
