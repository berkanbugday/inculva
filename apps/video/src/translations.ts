// apps/video/src/translations.ts
import type { Lang } from "./types";

interface Translations {
  struggle: { line1: string; line2: string; line3: string };
  places: { line1: string; line2: string; line3: string };
  reality: { line1: string; line2: string };
  turn: { line1: string; line2: string; line3: string };
  brand: { tagline: string };
}

export const t: Record<Lang, Translations> = {
  tr: {
    struggle: {
      line1: "1,3 milyar insan.",
      line2: "Her gün.",
      line3: "Engellere çarpıyor.",
    },
    places: {
      line1: "Sokakta.",
      line2: "İşte.",
      line3: "Hatta internette.",
    },
    reality: {
      line1: "Yüzbinlerce web sitesi",
      line2: "erişilebilir değil.",
    },
    turn: {
      line1: "Sokakları düzeltemeyiz.",
      line2: "Ama web sitenizi",
      line3: "düzeltebiliriz.",
    },
    brand: {
      tagline: "web erişilebilirlik çözümleri",
    },
  },
  en: {
    struggle: {
      line1: "1.3 billion people.",
      line2: "Every day.",
      line3: "Hit barriers.",
    },
    places: {
      line1: "On the streets.",
      line2: "At work.",
      line3: "Even online.",
    },
    reality: {
      line1: "Hundreds of thousands of websites",
      line2: "are inaccessible.",
    },
    turn: {
      // Intentionally split to mirror TR's two-line rhythm.
      // TR: "Ama web sitenizi" / "düzeltebiliriz."
      // EN: "But we can fix" / "your website."
      line1: "We can't fix the streets.",
      line2: "But we can fix",
      line3: "your website.",
    },
    brand: {
      tagline: "web accessibility solutions",
    },
  },
};
