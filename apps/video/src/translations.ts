import type { FeatureKey, Lang } from "./types";

interface Translations {
  opening: string;
  solution: string;
  ctaBadge: string;
  ctaTagline: string;
  ctaDomain: string;
  features: Record<FeatureKey, string>;
}

export const t: Record<Lang, Translations> = {
  en: {
    opening: "The web wasn't built for everyone.",
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
    opening: "İnternet herkes için tasarlanmadı.",
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
