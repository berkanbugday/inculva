// apps/video/src/translations.ts
import type { FeatureKey, Lang } from "./types";

interface Translations {
  opening: string;
  openingSub: string;
  solution: string;
  ctaBadge: string;
  ctaTagline: string;
  ctaDomain: string;
  features: Record<FeatureKey, string>;
}

export const t: Record<Lang, Translations> = {
  en: {
    opening: "1.3 billion people\ncan't use your website.",
    openingSub: "Until now.",
    solution: "One line of code.",
    ctaBadge: "WCAG 2.1 AA Compliant ✓",
    ctaTagline: "Make your website accessible to everyone.",
    ctaDomain: "inculva.com",
    features: {
      highContrast: "High Contrast",
      largerText: "Larger Text",
      dyslexiaFont: "Dyslexia Font",
      colorBlind: "Color Blind Mode",
    },
  },
  tr: {
    opening: "1,3 milyar kişi\nsitenizi kullanamıyor.",
    openingSub: "Ta ki şimdiye kadar.",
    solution: "Tek satır kod.",
    ctaBadge: "WCAG 2.1 AA Uyumlu ✓",
    ctaTagline: "Web sitenizi herkese erişilebilir yapın.",
    ctaDomain: "inculva.com",
    features: {
      highContrast: "Yüksek Kontrast",
      largerText: "Büyük Yazı",
      dyslexiaFont: "Disleksi Fontu",
      colorBlind: "Renk Körlüğü Modu",
    },
  },
};
