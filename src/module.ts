import "maplibre-gl/dist/maplibre-gl.css";
import "../styles/module.css";

import { buildPickerClass } from "./apps/picker";
import { registerSettings } from "./settings";

let PickerClass: any = null;
let pickerInstance: any = null;

Hooks.once("init", () => {
  registerSettings();
});

Hooks.once("ready", () => {
  // Built lazily so foundry.applications.api exists before we subclass it.
  PickerClass = buildPickerClass();
});

Hooks.on("renderSceneDirectory", (_app: any, html: any) => {
  const el: HTMLElement = html instanceof HTMLElement ? html : html[0];
  if (!el || el.querySelector(".golarion-maps-open")) return;
  if (!game.user?.isGM) return;
  const footer = el.querySelector(".directory-footer") ?? el;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "golarion-maps-open";
  btn.innerHTML = `<i class="fa-solid fa-earth-europe"></i> ${game.i18n.localize(
    "GOLARIONMAPS.OpenPicker"
  )}`;
  btn.addEventListener("click", () => {
    if (!PickerClass) PickerClass = buildPickerClass();
    pickerInstance ??= new PickerClass();
    pickerInstance.render({ force: true });
  });
  footer.append(btn);
});
