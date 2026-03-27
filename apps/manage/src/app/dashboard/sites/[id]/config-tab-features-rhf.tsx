"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FeatureToggle } from "./feature-toggle";
import type { Config } from "./widget-config-form";
import type { WidgetFeatures } from "@inculva/types";
import { Snackbar } from "@/components/ui/snackbar";
import { useLocale, useMessages } from "@/i18n/useMessages";

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || "https://cdn.inculva.com";

const FEATURE_KEYS: (keyof Config)[] = [
  "textResizing",
  "dyslexiaFont",
  "cursorEnhancement",
  "keyboardNavigation",
  "readingGuide",
  "screenReader",
  "pauseAnimations",
  "textSpacing",
  "highlightLinks",
  "colorBlindMode",
  "largeClickTargets",
  "focusHighlight",
  "skipNavigation",
  "muteMedia",
  "readingMask",
  "textAlign",
  "saturation",
  "blueLightFilter",
  "hideImages",
  "darkMode",
  "contentMagnifier",
  "toolTips",
  "sustainabilityMode",
  "slowCursor",
  "dictionary",
  "lineHeight",
  "highlightTitles",
  "profileAdhd",
  "profileBlind",
  "profileLowVision",
  "profileColorBlind",
  "profileDyslexia",
  "profileMotorImpaired",
  "profileCognitive",
  "profileSeizure",
  "profileParkinson",
];

type FeatureDef = {
  key: keyof WidgetFeatures;
  wcag?: string;
  comingSoon?: boolean;
};

const CATEGORIES: { name: string; features: FeatureDef[] }[] = [
  {
    name: "Vision",
    features: [
      {
        key: "darkMode",
      },
      {
        key: "blueLightFilter",
        wcag: "1.4.3",
      },
      {
        key: "colorBlindMode",
        wcag: "1.4.1",
      },
      {
        key: "saturation",
      },
      {
        key: "highlightLinks",
        wcag: "1.4.1",
      },
      {
        key: "highlightTitles",
      },
      {
        key: "hideImages",
      },
    ],
  },
  {
    name: "Reading",
    features: [
      {
        key: "textResizing",
        wcag: "1.4.4",
      },
      {
        key: "textSpacing",
        wcag: "1.4.12",
      },
      {
        key: "textAlign",
      },
      {
        key: "lineHeight",
        wcag: "1.4.12",
      },
      {
        key: "dyslexiaFont",
      },
      {
        key: "readingGuide",
      },
      {
        key: "readingMask",
      },
      {
        key: "contentMagnifier",
      },
      {
        key: "screenReader",
      },
    ],
  },
  {
    name: "Motor",
    features: [
      {
        key: "keyboardNavigation",
        wcag: "2.1.1",
      },
      {
        key: "focusHighlight",
        wcag: "2.4.11",
      },
      {
        key: "largeClickTargets",
        wcag: "2.5.8",
      },
      {
        key: "cursorEnhancement",
      },
      {
        key: "slowCursor",
      },
      {
        key: "skipNavigation",
        wcag: "2.4.1",
      },
    ],
  },
  {
    name: "Calm",
    features: [
      {
        key: "pauseAnimations",
        wcag: "2.3.3",
      },
      {
        key: "muteMedia",
        wcag: "1.4.2",
      },
    ],
  },
];

const PROFILES: {
  key: keyof Config;
  label: string;
  description: string;
  iconName: string;
  features: string[];
}[] = [
  {
    key: "profileBlind",
    label: "Blind",
    description:
      "Screen reader optimization, keyboard navigation, and simplified layout",
    iconName: "eye-slash",
    features: ["Keyboard Nav", "Skip Navigation", "Text Resizing"],
  },
  {
    key: "profileLowVision",
    label: "Low Vision",
    description:
      "Large text, high contrast, cursor enhancement, and content zoom",
    iconName: "eye-low-vision",
    features: [
      "Text Resizing",
      "Contrast+",
      "Big Cursor",
      "Large Click Targets",
    ],
  },
  {
    key: "profileDyslexia",
    label: "Dyslexia",
    description: "Dyslexia font, text spacing, and reading aids",
    iconName: "df",
    features: ["Dyslexia Font", "Text Spacing", "Reading Guide"],
  },
  {
    key: "profileColorBlind",
    label: "Color Blind",
    description:
      "Color scheme adjustments for different types of color blindness",
    iconName: "bring-forward",
    features: ["Color Blind Mode"],
  },
  {
    key: "profileMotorImpaired",
    label: "Motor Impaired",
    description: "Larger targets, keyboard navigation, and focus highlight",
    iconName: "wheelchair",
    features: ["Keyboard Nav", "Large Click Targets", "Focus Indicator"],
  },
  {
    key: "profileAdhd",
    label: "ADHD",
    description: "Reading guide, pause animations, and reading mask for focus",
    iconName: "puzzle-piece",
    features: ["Reading Guide", "Pause Animations", "Reading Mask"],
  },
];

interface Props {
  siteId: string;
}

function getProfileCopy(
  key: string,
  locale: "en" | "tr",
): { label: string; description: string; features: string[] } {
  const tr = locale === "tr";
  switch (key) {
    case "profileBlind":
      return {
        label: tr ? "Görme Engelli" : "Blind",
        description: tr
          ? "Ekran okuyucu optimizasyonu, klavye ile gezinme ve sade düzen"
          : "Screen reader optimization, keyboard navigation, and simplified layout",
        features: tr
          ? ["Klavye Gezinme", "Gezinmeyi Atla", "Metin Boyutlandırma"]
          : ["Keyboard Nav", "Skip Navigation", "Text Resizing"],
      };
    case "profileLowVision":
      return {
        label: tr ? "Az Gören" : "Low Vision",
        description: tr
          ? "Büyük metin, yüksek kontrast, imleç geliştirme ve içerik yakınlaştırma"
          : "Large text, high contrast, cursor enhancement, and content zoom",
        features: tr
          ? ["Metin Boyutlandırma", "Kontrast+", "Büyük İmleç", "Büyük Tıklama Hedefleri"]
          : ["Text Resizing", "Contrast+", "Big Cursor", "Large Click Targets"],
      };
    case "profileDyslexia":
      return {
        label: tr ? "Disleksi" : "Dyslexia",
        description: tr
          ? "Disleksi fontu, metin aralığı ve okuma yardımcıları"
          : "Dyslexia font, text spacing, and reading aids",
        features: tr
          ? ["Disleksi Fontu", "Metin Aralığı", "Okuma Rehberi"]
          : ["Dyslexia Font", "Text Spacing", "Reading Guide"],
      };
    case "profileColorBlind":
      return {
        label: tr ? "Renk Körü" : "Color Blind",
        description: tr
          ? "Farklı renk körlüğü tipleri için renk şeması uyarlamaları"
          : "Color scheme adjustments for different types of color blindness",
        features: tr ? ["Renk Körlüğü Modu"] : ["Color Blind Mode"],
      };
    case "profileMotorImpaired":
      return {
        label: tr ? "Motor Engelli" : "Motor Impaired",
        description: tr
          ? "Daha büyük hedefler, klavye ile gezinme ve odak vurgusu"
          : "Larger targets, keyboard navigation, and focus highlight",
        features: tr
          ? ["Klavye Gezinme", "Büyük Tıklama Hedefleri", "Odak Göstergesi"]
          : ["Keyboard Nav", "Large Click Targets", "Focus Indicator"],
      };
    case "profileAdhd":
      return {
        label: tr ? "DEHB" : "ADHD",
        description: tr
          ? "Odak için okuma rehberi, animasyon durdurma ve okuma maskesi"
          : "Reading guide, pause animations, and reading mask for focus",
        features: tr
          ? ["Okuma Rehberi", "Animasyonları Durdur", "Okuma Maskesi"]
          : ["Reading Guide", "Pause Animations", "Reading Mask"],
      };
    default:
      return { label: key, description: "", features: [] };
  }
}

function getFeatureCopy(
  key: keyof WidgetFeatures,
  locale: "en" | "tr",
): { label: string; description: string } {
  const tr = locale === "tr";
  switch (key) {
    case "darkMode":
      return tr
        ? {
            label: "Karanlık Mod",
            description:
              "Koyu tema oluşturmak için CSS invert + hue-rotate uygular; görseller tersine çevrilerek düzeltilir",
          }
        : {
            label: "Dark Mode",
            description:
              "CSS invert + hue-rotate to create a dark theme — images are counter-inverted",
          };
    case "blueLightFilter":
      return tr
        ? {
            label: "Mavi Işık Filtresi",
            description:
              "Mavi ışığı azaltıp göz yorgunluğunu hafifletmek için sıcak sepya tonu uygular",
          }
        : {
            label: "Blue Light Filter",
            description: "Warm sepia tint to reduce blue light and ease eye fatigue",
          };
    case "colorBlindMode":
      return tr
        ? {
            label: "Renk Körlüğü Modu",
            description:
              "4 tip için SVG filtre uygular: deuteranopia, protanopia, tritanopia, achromatopsia",
          }
        : {
            label: "Color Blind Mode",
            description:
              "SVG filter with 4 types: deuteranopia, protanopia, tritanopia, achromatopsia",
          };
    case "saturation":
      return tr
        ? {
            label: "Kontrast+",
            description:
              "Yüksek kontrast ve renk doygunluğu ihtiyaçlarını kapsayan 5 seviyeli araç",
          }
        : {
            label: "Contrast+",
            description:
              "5-level contrast and saturation tool covering high-contrast and colour-saturation needs",
          };
    case "highlightLinks":
      return tr
        ? {
            label: "Bağlantıları Vurgula",
            description:
              "Tüm bağlantılara alt çizgi + kalın + çerçeve uygular; renk olmadan da görünür olur",
          }
        : {
            label: "Highlight Links",
            description:
              "Forces underline + bold + outline on all anchors — links visible without colour",
          };
    case "highlightTitles":
      return tr
        ? {
            label: "Başlıkları Vurgula",
            description:
              "Tüm h1-h6 başlıklarına görünür çerçeve uygular; sayfa yapısını ayırt etmeyi kolaylaştırır",
          }
        : {
            label: "Highlight Titles",
            description:
              "Visible outline on all h1-h6 headings — helps identify page structure",
          };
    case "hideImages":
      return tr
        ? {
            label: "Görselleri Gizle",
            description:
              "Yerleşimi koruyarak görselleri görünmez yapar; görsel dikkat dağıtıcıları azaltır",
          }
        : {
            label: "Hide Images",
            description:
              "Makes all images invisible (preserving layout) — removes visual distractions",
          };
    case "textResizing":
      return tr
        ? {
            label: "Metin Boyutlandırma",
            description: "Yazı boyutunu 4 seviyede artırır (%110-%155)",
          }
        : {
            label: "Text Resizing",
            description: "Increase font size across 4 levels (110%-155%)",
          };
    case "textSpacing":
      return tr
        ? {
            label: "Metin Aralığı",
            description:
              "WCAG 1.4.12’ye uygun satır yüksekliği, harf ve kelime aralığı artırımı sağlar",
          }
        : {
            label: "Text Spacing",
            description:
              "Increases line-height, letter-spacing, and word-spacing per WCAG 1.4.12",
          };
    case "textAlign":
      return tr
        ? {
            label: "Metin Hizalama",
            description:
              "Paragraf ve başlıkları sola hizalar; disleksik kullanıcılar için okunabilirliği artırır",
          }
        : {
            label: "Text Alignment",
            description:
              "Forces left-align on paragraphs and headings — improves readability for dyslexic users",
          };
    case "lineHeight":
      return tr
        ? {
            label: "Satır Yüksekliği",
            description: "Daha rahat okuma için satır yüksekliğini artırır (4 seviye: 1.6-2.6)",
          }
        : {
            label: "Line Height",
            description:
              "Increases line-height (4 levels: 1.6-2.6) for more breathing room",
          };
    case "dyslexiaFont":
      return tr
        ? {
            label: "Disleksi Fontu",
            description:
              "Sayfa yazı tipini OpenDyslexic’e çevirir; harflerin taban çizgisine tutunmasını kolaylaştırır",
          }
        : {
            label: "Dyslexia Font",
            description:
              "Switches page font to OpenDyslexic — heavy bottoms anchor letters to the baseline",
          };
    case "readingGuide":
      return tr
        ? {
            label: "Okuma Rehberi",
            description:
              "İmleci takip eden yatay amber çizgiyle okuma satırını takip etmeyi kolaylaştırır",
          }
        : {
            label: "Reading Guide",
            description:
              "Horizontal amber line following the cursor — helps track reading position",
          };
    case "readingMask":
      return tr
        ? {
            label: "Okuma Maskesi",
            description:
              "Tam sayfa karartma ve net 80px okuma penceresi sunar; görsel dikkat dağılımını azaltır",
          }
        : {
            label: "Reading Mask",
            description:
              "Full-page dimming overlay with a clear 80px reading window — reduces visual distraction",
          };
    case "contentMagnifier":
      return tr
        ? {
            label: "İçerik Büyüteç",
            description:
              "Üzerine gelinen öğeleri dairesel mercekle büyütür (4 seviye: 1.15x-1.5x)",
          }
        : {
            label: "Content Magnifier",
            description:
              "Circular lens scaling hovered elements (4 levels: 1.15x-1.5x) for local zoom",
          };
    case "screenReader":
      return tr
        ? {
            label: "Ekran Okuyucu",
            description:
              "Okuma yardımcı modlarını sağlar: alternatif metin ipuçları, üzerine gelince okuma ve dokununca okuma",
          }
        : {
            label: "Screen Reader",
            description:
              "Provides reading-assist modes: alt hints, read on hover, and read on tap",
          };
    case "keyboardNavigation":
      return tr
        ? {
            label: "Klavye Gezinme",
            description:
              "Klavye kullanıcıları için odaklanan öğelerde görünür 3px mavi odak halkası gösterir",
          }
        : {
            label: "Keyboard Nav",
            description:
              "Visible 3px blue focus ring around focused elements for keyboard users",
          };
    case "focusHighlight":
      return tr
        ? {
            label: "Odak Göstergesi",
            description:
              "Odaklanan her öğeye yüksek görünürlüklü 3px turuncu çerçeve ve parlama uygular",
          }
        : {
            label: "Focus Indicator",
            description:
              "High-visibility 3px orange outline + glow on every focused element",
          };
    case "largeClickTargets":
      return tr
        ? {
            label: "Büyük Tıklama Hedefleri",
            description:
              "Tüm etkileşimli öğelerde en az 44x44px alan zorlar; motor kısıtlı kullanıcılar için kritiktir",
          }
        : {
            label: "Large Click Targets",
            description:
              "Enforces 44x44px minimum on all interactive elements — critical for motor-impaired users",
          };
    case "cursorEnhancement":
      return tr
        ? {
            label: "Büyük İmleç",
            description:
              "Sistem imlecini büyük beyaz dolgulu oka çevirir (3 boyut: 32/48/64px)",
          }
        : {
            label: "Big Cursor",
            description:
              "Replaces OS cursor with a large white-fill arrow (3 sizes: 32/48/64px)",
          };
    case "slowCursor":
      return tr
        ? {
            label: "Yavaş İmleç",
            description:
              "İmleci üstel gecikmeyle yumuşatır (3 seviye); el titremesi etkisini azaltır",
          }
        : {
            label: "Slow Cursor",
            description:
              "Smooths cursor with exponential lag (3 levels) — reduces effect of hand tremors",
          };
    case "skipNavigation":
      return tr
        ? {
            label: "Gezinmeyi Atla",
            description:
              "Tab tuşunda 'ana içeriğe geç' bağlantısı gösterir; tekrarlayan menüleri atlamayı sağlar",
          }
        : {
            label: "Skip Navigation",
            description:
              "'Skip to main content' link on Tab press — bypasses repetitive nav menus",
          };
    case "pauseAnimations":
      return tr
        ? {
            label: "Animasyonları Durdur",
            description:
              "Tüm CSS animasyon ve geçişlerini durdurur; ışığa duyarlı kullanıcılar için önemlidir",
          }
        : {
            label: "Pause Animations",
            description:
              "Freezes all CSS animations and transitions — essential for photosensitive users",
          };
    case "muteMedia":
      return tr
        ? {
            label: "Medyayı Sessize Al",
            description:
              "MutationObserver kullanarak tüm ses/video öğelerini sessize alır ve duraklatır",
          }
        : {
            label: "Mute Media",
            description:
              "Mutes and pauses all audio/video elements using MutationObserver",
          };
    default:
      return { label: key, description: "" };
  }
}

export function ConfigTabFeaturesRHF({ siteId }: Props) {
  const t = useMessages();
  const locale = useLocale();
  const { watch, setValue, getValues, resetField } = useFormContext<Config>();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function onSave(data: Partial<Config>) {
    setSaving(true);
    setSaveError(null);
    setSaved(false);
    try {
      const res = await fetch(`/api/sites/${siteId}/config`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 4000);
        (Object.keys(data) as (keyof Config)[]).forEach((key) => {
          resetField(key, { defaultValue: data[key] as Config[typeof key] });
        });
      } else {
        const json = (await res.json()) as { error?: string };
        setSaveError(json.error ?? t.featuresTab.failedToSave);
      }
    } catch {
      setSaveError(t.featuresTab.networkError);
    } finally {
      setSaving(false);
    }
  }
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [profilesExpanded, setProfilesExpanded] = useState(true);

  function toggleCategory(name: string) {
    setExpandedCategories((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  const enabledProfilesCount = PROFILES.filter((p) => !!watch(p.key)).length;
  const getCategoryName = (name: string) => {
    if (name === "Vision") return t.featuresTab.vision;
    if (name === "Reading") return t.featuresTab.reading;
    if (name === "Motor") return t.featuresTab.motor;
    if (name === "Calm") return t.featuresTab.calm;
    return name;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6">
        <button
          type="button"
          onClick={() => setProfilesExpanded(!profilesExpanded)}
          className="w-full flex items-center justify-between text-left hover:opacity-80 transition-opacity cursor-pointer mb-5"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {t.featuresTab.accessibilityProfiles}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 dark:text-gray-600">
              {t.featuresTab.ofEnabled
                .replace("{count}", String(enabledProfilesCount))
                .replace("{total}", String(PROFILES.length))}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`shrink-0 transition-transform text-gray-400 dark:text-gray-600 ${
                profilesExpanded ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
        {profilesExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROFILES.map((profile) => {
              const enabled = !!watch(profile.key);
              const copy = getProfileCopy(profile.key, locale);
              return (
                <button
                  key={profile.key}
                  type="button"
                  onClick={() =>
                    setValue(profile.key, !enabled as Config[keyof Config], {
                      shouldDirty: true,
                    })
                  }
                  className={`text-left p-4 rounded-2xl border-[3px] border-solid transition-all cursor-pointer ${
                    enabled
                      ? "!border-blue-600 bg-blue-50 dark:bg-blue-950/40"
                      : "border-[#e8eaf0] dark:border-[#2a2a3e] hover:border-blue-300 dark:hover:border-blue-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <img
                        src={`${CDN_URL}/icons/${profile.iconName}.svg`}
                        alt=""
                        width={20}
                        height={20}
                        className="block"
                        aria-hidden="true"
                      />
                    </div>
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        enabled
                          ? "border-blue-600 bg-blue-600"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {enabled && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M2 5l2.5 2.5 3.5-4"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                    {copy.label}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
                    {copy.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {copy.features.map((f) => (
                      <span
                        key={f}
                        className="text-[12px] px-1.5 py-0.5 text-black dark:text-white underline"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {CATEGORIES.map((cat) => {
          const isExpanded = expandedCategories[cat.name] || false;
          return (
            <div
              key={cat.name}
              className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-6"
            >
              <button
                type="button"
                onClick={() => toggleCategory(cat.name)}
                className="w-full flex items-center justify-between text-left hover:opacity-80 transition-opacity cursor-pointer"
              >
                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wider">
                  {getCategoryName(cat.name)}
                </h3>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`shrink-0 transition-transform text-gray-400 dark:text-gray-600 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {isExpanded && (
                <div className="divide-y divide-[#f8f9fc] dark:divide-[#2a2a3e] mt-3">
                  {cat.features.map((f) => {
                    const enabled = watch(f.key as keyof Config);
                    const copy = getFeatureCopy(f.key, locale);
                    return (
                      <FeatureToggle
                        key={f.key}
                        label={copy.label}
                        description={copy.description}
                        {...(f.wcag ? { wcag: f.wcag } : {})}
                        enabled={!!enabled}
                        onChange={(v) =>
                          setValue(
                            f.key as keyof Config,
                            v as Config[keyof Config],
                            {
                              shouldDirty: true,
                            },
                          )
                        }
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={saving}
          onClick={() => {
            const all = getValues();
            const data = Object.fromEntries(
              FEATURE_KEYS.map((k) => [k, all[k]]),
            ) as Partial<Config>;
            void onSave(data);
          }}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? t.featuresTab.saving : t.featuresTab.saveChanges}
        </button>
        {saveError && (
          <span className="text-sm text-red-600 dark:text-red-400">
            {saveError}
          </span>
        )}
      </div>
      <Snackbar open={saved} message={t.featuresTab.saved} />
    </div>
  );
}
