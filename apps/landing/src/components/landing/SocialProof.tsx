"use client";

import { StaggerGrid, cardVariant } from "./motion";
import { motion } from "framer-motion";

const stats = [
  { value: "1,200+", label: "Websites using Inculva" },
  { value: "25", label: "Accessibility features" },
  { value: "41", label: "Languages supported" },
  { value: "7", label: "Global standards covered" },
];

export function SocialProof() {
  return (
    <section className="px-8 py-20 border-y border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((s) => (
            <motion.div key={s.label} variants={cardVariant} className="text-center">
              <p className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-2">
                {s.value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
