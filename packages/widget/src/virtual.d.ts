declare module "virtual:opendyslexic-fonts" {
  /** Base64-encoded WOFF2 binary for OpenDyslexic Regular (weight 400). */
  export const OPENDYSLEXIC_REGULAR_B64: string;
  /** Base64-encoded WOFF2 binary for OpenDyslexic Bold (weight 700). */
  export const OPENDYSLEXIC_BOLD_B64: string;
}

declare module "virtual:brand-svg" {
  /** Base64 data URI of brand-logo.png, embedded at build time.
   *  Use as the src of an <img> element — no external URL required. */
  export const BRAND_LOGO_PNG: string;
}

declare module "virtual:icons" {
  /** SVG icon strings embedded at build time from public/icons directory.
   *  Keys are icon names (without .svg extension), values are raw SVG markup. */
  export const ICONS: Record<string, string>;
}
