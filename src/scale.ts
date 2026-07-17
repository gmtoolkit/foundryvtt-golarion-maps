// MapLibre uses a 512px logical world tile at zoom 0.
const WORLD_TILE_PX = 512;
// We treat Golarion as Earth-sized: the upstream map's own measure tool uses
// turf's Earth-radius distance math, so this matches what users see on the
// website.
const EARTH_CIRCUMFERENCE_M = 40075016.686;
const METERS_PER_MILE = 1609.344;

/** Meters per CSS pixel at a given latitude and zoom. */
export function metersPerCssPixel(latDeg: number, zoom: number): number {
  return (
    (EARTH_CIRCUMFERENCE_M * Math.cos((latDeg * Math.PI) / 180)) /
    (WORLD_TILE_PX * 2 ** zoom)
  );
}

export interface ScaleInfo {
  /** Meters per pixel of the baked image (CSS px / resolution factor). */
  metersPerImagePixel: number;
  /** Miles covered by one grid square of gridSizePx image pixels. */
  gridDistanceMiles: number;
  /** Total miles covered by the baked scene, width and height. */
  sceneWidthMiles: number;
  sceneHeightMiles: number;
}

export function computeScale(opts: {
  latDeg: number;
  zoom: number;
  cssWidth: number;
  cssHeight: number;
  resFactor: number;
  gridSizePx: number;
}): ScaleInfo {
  const mPerCssPx = metersPerCssPixel(opts.latDeg, opts.zoom);
  const metersPerImagePixel = mPerCssPx / opts.resFactor;
  return {
    metersPerImagePixel,
    gridDistanceMiles: (opts.gridSizePx * metersPerImagePixel) / METERS_PER_MILE,
    sceneWidthMiles: (opts.cssWidth * mPerCssPx) / METERS_PER_MILE,
    sceneHeightMiles: (opts.cssHeight * mPerCssPx) / METERS_PER_MILE
  };
}
