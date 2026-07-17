export const MODULE_ID = "foundryvtt-golarion-maps";

// Default points at the PathfinderWiki-hosted map. That host serves no CORS
// headers, so browsers block it from a Foundry origin; users should point this
// at a CORS-enabled mirror (see README) or a copy inside their Foundry data.
export const DEFAULT_HOST = "https://map.pathfinderwiki.com";

export function registerSettings(): void {
  game.settings.register(MODULE_ID, "enablePicker", {
    name: "GOLARIONMAPS.Settings.EnablePicker.Name",
    hint: "GOLARIONMAPS.Settings.EnablePicker.Hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    requiresReload: true
  });
  game.settings.register(MODULE_ID, "tilesHost", {
    name: "GOLARIONMAPS.Settings.TilesHost.Name",
    hint: "GOLARIONMAPS.Settings.TilesHost.Hint",
    scope: "world",
    config: true,
    type: String,
    default: DEFAULT_HOST
  });
}

/**
 * Resolve the configured map-data endpoint to an absolute URL with no
 * trailing slash. A bare path (e.g. "modules/foundryvtt-golarion-maps/map-data")
 * is resolved against the Foundry origin so self-hosted copies work.
 */
export function tilesHost(): string {
  let h = String(game.settings.get(MODULE_ID, "tilesHost") ?? DEFAULT_HOST).trim();
  if (!h) h = DEFAULT_HOST;
  if (!/^https?:\/\//i.test(h)) {
    h = new URL(h.replace(/^\//, ""), window.location.origin).toString();
  }
  return h.replace(/\/+$/, "");
}
