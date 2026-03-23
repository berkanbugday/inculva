export type FeatureKey = "highContrast" | "largerText" | "dyslexiaFont" | "colorBlind";
export type Lang = "en" | "tr";
export type AspectRatio = "portrait" | "landscape";

export interface SceneProps {
  lang: Lang;
  aspectRatio: AspectRatio;
}
