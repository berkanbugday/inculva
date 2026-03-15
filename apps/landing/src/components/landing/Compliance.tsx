"use client";

import { motion } from "framer-motion";
import { FadeUp, StaggerGrid, cardVariant } from "./motion";

const standards = [
  {
    name: "WCAG 2.0",
    region: "Global baseline",
    desc: "The international foundation. The starting point every site should meet.",
  },
  {
    name: "WCAG 2.1 AA",
    region: "Global",
    desc: "The current primary standard. Required by EAA, ADA enforcement, and most laws.",
    primary: true,
  },
  {
    name: "WCAG 2.2 AA",
    region: "Global",
    desc: "The latest W3C update. Enhanced focus, drag-and-drop, and authentication criteria.",
    primary: true,
  },
  {
    name: "EAA 2025",
    region: "European Union",
    desc: "EU Directive 2019/882. In force since June 28, 2025. Fines up to €500,000.",
    urgent: true,
  },
  {
    name: "ADA",
    region: "United States",
    desc: "Americans with Disabilities Act — actively enforced for websites by DOJ since 2024.",
  },
  {
    name: "Section 508",
    region: "US Federal",
    desc: "Required for all US federal agencies, contractors, and vendors.",
  },
  {
    name: "EN 301 549",
    region: "Europe",
    desc: "The harmonized European technical standard. Referenced directly by the EAA.",
  },
];

export function Compliance() {
  return (
    <section className="px-8 py-28">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="max-w-3xl mb-20">
            <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
              Global Compliance
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              7 standards.<br />One solution.
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
              Accessibility regulations now cover every major market. Inculva is built against all
              7 — so you're protected everywhere your users are, today and as laws evolve.
            </p>
          </div>
        </FadeUp>

        <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {standards.map((std) => (
            <motion.div
              key={std.name}
              variants={cardVariant}
              className={`relative rounded-2xl border p-6 ${
                std.urgent
                  ? "border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30"
                  : std.primary
                  ? "border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30"
                  : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              }`}
            >
              {std.urgent && (
                <span className="absolute top-5 right-5 text-xs font-bold bg-amber-400 text-amber-900 px-2.5 py-1 rounded-full">
                  ACTIVE
                </span>
              )}
              <p className="text-base font-bold text-gray-900 dark:text-white mb-1">{std.name}</p>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                {std.region}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{std.desc}</p>
            </motion.div>
          ))}

          <motion.div
            variants={cardVariant}
            className="rounded-2xl border border-blue-600 bg-blue-600 p-6 flex flex-col justify-between"
          >
            <div>
              <p className="text-base font-bold text-white mb-3">All 7 covered</p>
              <p className="text-sm text-blue-100 leading-relaxed">
                One widget, one dashboard, all regions. Stop tracking which law applies where —
                Inculva handles it.
              </p>
            </div>
            <a
              href="#pricing"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white border-b border-blue-400 pb-0.5 hover:border-white transition-colors w-fit"
            >
              See plans →
            </a>
          </motion.div>
        </StaggerGrid>
      </div>
    </section>
  );
}
