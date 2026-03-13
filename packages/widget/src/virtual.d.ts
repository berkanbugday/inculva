/** Injected by Vite define — CDN base URL (e.g. https://cdn.inculva.com) */
declare const __CDN_URL__: string;
/** Injected by Vite define — API base URL (e.g. https://api.inculva.com) */
declare const __API_URL__: string;

declare module "virtual:logo-svg" {
  /** Base64 data URI of logo.png, embedded at build time.
   *  Use as the src of an <img> element — no external URL required. */
  export const LOGO_PNG: string;
}
declare module "virtual:logo-icon-svg" {
  /** Base64 data URI of logo.png, embedded at build time.
   *  Use as the src of an <img> element — no external URL required. */
  export const LOGO_ICON_PNG: string;
}
