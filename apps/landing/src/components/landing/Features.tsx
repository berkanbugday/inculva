"use client";

import { motion } from "framer-motion";
import { FadeUp, StaggerGrid, cardVariant } from "./motion";

const categories = [
  {
    label: "Vision",
    color: "text-violet-600 dark:text-violet-400",
    border: "border-violet-200 dark:border-violet-900",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    features: [
      "High Contrast",
      "Grayscale",
      "Color Blind Mode — 4 types",
      "Highlight Links",
      "Invert Colors",
      "Saturation Boost",
    ],
  },
  {
    label: "Reading & Text",
    color: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-900",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    features: [
      "Text Resizing — up to 200%",
      "Dyslexia Font (OpenDyslexic)",
      "Text Spacing",
      "Reading Mask",
      "Reading Guide",
      "Text Alignment",
    ],
  },
  {
    label: "Navigation & Motor",
    color: "text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-900",
    bg: "bg-green-50 dark:bg-green-950/40",
    features: [
      "Keyboard Navigation",
      "Cursor Enhancement",
      "Screen Reader Hints",
      "Pause Animations",
    ],
  },
  {
    label: "Cognitive",
    color: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-900",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    features: [
      "Focus Mode",
      "Tooltips on Hover",
      "Reading Progress",
      "Line Height Boost",
      "Word Spacing",
      "Letter Spacing",
      "Dark Mode Override",
    ],
  },
];

export function Features() {
  return (
    <section id="features" className="px-8 py-28 bg-gray-50 dark:bg-gray-900/40">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="max-w-3xl mb-20">
            <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
              25 Features
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Real features,<br />not cosmetic ones.
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
              Every feature is built to WCAG specification and tested against real assistive
              technology — not automated scanners. Your visitors get genuine, meaningful control.
            </p>
          </div>
        </FadeUp>

        <div className="space-y-12">
          {categories.map((cat) => (
            <FadeUp key={cat.label}>
              <div>
                <div className={`inline-flex items-center px-4 py-2 rounded-xl border ${cat.border} ${cat.bg} mb-6`}>
                  <span className={`text-sm font-bold uppercase tracking-widest ${cat.color}`}>
                    {cat.label}
                  </span>
                </div>
                <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {cat.features.map((f) => (
                    <motion.div
                      key={f}
                      variants={cardVariant}
                      className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800"
                    >
                      <span className={`text-sm font-bold shrink-0 ${cat.color}`}>✓</span>
                      <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{f}</span>
                    </motion.div>
                  ))}
                </StaggerGrid>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
