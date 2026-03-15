"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeUp } from "./motion";

const faqs = [
  {
    q: "What makes Inculva different from other accessibility widgets?",
    a: "Most widgets give you a toolbar and call it compliance. Inculva combines an automated 25-feature widget with human expertise — expert configuration review, a built-in WCAG scanner, and compliance reporting. You get both the automation layer and the human oversight layer.",
  },
  {
    q: "Which accessibility regulations does Inculva cover?",
    a: "All 7 major global standards: WCAG 2.0, WCAG 2.1 AA, WCAG 2.2 AA, the European Accessibility Act (EAA 2025), ADA, Section 508, and EN 301 549. One solution for every region your users are in.",
  },
  {
    q: "Does adding Inculva make my site fully WCAG compliant?",
    a: "The widget provides meaningful user-facing controls and significantly improves accessibility. Full WCAG compliance also requires semantic HTML, accessible forms, and keyboard-navigable components in your site's own code — our expert review service helps identify exactly those gaps.",
  },
  {
    q: "Will the widget slow my website down?",
    a: "No. The widget is 24KB (7KB gzip), loaded asynchronously from a global CDN. Zero impact on your Lighthouse performance score.",
  },
  {
    q: "What data do you collect about my visitors?",
    a: "We record anonymized events tied to a random session ID — not a user ID or IP address. Accessibility preferences are stored only in the visitor's browser localStorage, never on our servers. Fully GDPR and CCPA compliant.",
  },
  {
    q: "What is the European Accessibility Act and does it apply to me?",
    a: "The EAA (EU Directive 2019/882) requires any digital product or service sold to EU consumers to meet WCAG 2.1 AA standards. It took effect June 28, 2025. If you have customers in the EU, it applies to you. Fines can reach €500,000.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="px-8 py-28 bg-gray-50 dark:bg-gray-900/40">
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <div className="mb-16">
            <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
              FAQ
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              Common questions.
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={0.06}>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-6 px-6 py-4 text-left font-semibold text-gray-900 dark:text-white text-base hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.22 }}
                    className="shrink-0 text-gray-400 text-xl"
                  >
                    ▾
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
