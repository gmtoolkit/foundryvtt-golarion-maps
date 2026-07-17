import { bakeViewport } from "./bake";
import { computeScale } from "./scale";
import { buildSceneData } from "./scene-data";
import { MODULE_ID } from "./settings";
import { loadStyle } from "./style";

export interface RegionSpec {
  /** Stable id; also the image filename (<key>.webp). */
  key: string;
  name: string;
  center: [number, number];
  zoom: number;
  /** CSS-pixel viewport of the bake; output = css * resFactor. */
  width?: number;
  height?: number;
  resFactor?: number;
  gridType?: "gridless" | "square";
  gridSize?: number;
}

const DEFAULTS = { width: 1152, height: 768, resFactor: 4, gridType: "gridless" as const, gridSize: 100 };

/** Render one region spec to a WebP blob + matching scene document source. */
export async function bakeRegion(spec: RegionSpec, imagePath: string) {
  const { width, height, resFactor, gridType, gridSize } = { ...DEFAULTS, ...spec };
  const style = await loadStyle();
  const blob = await bakeViewport({
    style,
    center: { lng: spec.center[0], lat: spec.center[1] },
    zoom: spec.zoom,
    width,
    height,
    pixelRatio: resFactor
  });
  const scale = computeScale({
    latDeg: spec.center[1],
    zoom: spec.zoom,
    cssWidth: width,
    cssHeight: height,
    resFactor,
    gridSizePx: gridSize
  });
  const gridDistanceMiles =
    gridType === "square"
      ? scale.gridDistanceMiles
      : (100 * scale.metersPerImagePixel) / 1609.344;
  const sceneData = buildSceneData({
    name: spec.name,
    width: Math.round(width * resFactor),
    height: Math.round(height * resFactor),
    imagePath,
    gridType,
    gridSize,
    gridDistanceMiles
  });
  return { blob, sceneData, scale };
}

/**
 * Compendium-generation driver (dev tooling, run from the console of a GM
 * session): bakes every region, uploads the webps into <uploadDir> in Foundry
 * user data for later copying into the repo, and returns scene document
 * sources whose background points at the module's shipped assets path.
 */
export async function generateScenes(
  regions: RegionSpec[],
  { uploadDir = "golarion-maps-build", onProgress }: { uploadDir?: string; onProgress?: (msg: string) => void } = {}
) {
  const FP = foundry.applications.apps.FilePicker.implementation;
  await FP.createDirectory("data", uploadDir).catch(() => {});
  const docs: Record<string, unknown>[] = [];
  for (const spec of regions) {
    onProgress?.(`baking ${spec.key}…`);
    const shippedPath = `modules/${MODULE_ID}/assets/scenes/${spec.key}.webp`;
    const { blob, sceneData } = await bakeRegion(spec, shippedPath);
    const file = new File([blob], `${spec.key}.webp`, { type: "image/webp" });
    const uploaded = await FP.upload("data", uploadDir, file, {}, { notify: false });
    if (!uploaded?.path) throw new Error(`upload failed for ${spec.key}`);
    docs.push(sceneData);
    onProgress?.(`done ${spec.key}`);
  }
  return docs;
}
