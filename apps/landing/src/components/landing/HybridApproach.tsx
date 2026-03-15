"use client";

import { motion } from "framer-motion";
import { FadeUp, StaggerGrid, cardVariant } from "./motion";

const automation = [
  { title: "Instant deployment", desc: "One script tag. Widget live in under 60 seconds on any website." },
  { title: "25 adaptive features", desc: "High contrast, dyslexia font, text resize, color blind modes — all toggled by your visitors." },
  { title: "41 languages", desc: "Auto-detects page language. Full RTL support for Arabic, Hebrew, Persian, Urdu." },
  { title: "Zero maintenance", desc: "CDN-hosted and auto-updated. No developer touch required after install." },
];

const expertise = [
  { title: "Expert configuration", desc: "Our accessibility specialists review your widget setup and tune it for your site." },
  { title: "WCAG scanner", desc: "Built-in static analysis against 12 checks — real violations, not false positives." },
  { title: "Compliance statements", desc: "EAA Article 13 compliant accessibility statement, generated and ready to publish." },
  { title: "Priority support", desc: "Direct access to accessibility specialists on Pro and Business plans." },
];

function Item({ title, desc, accent }: { title: string; desc: string; accent: string }) {
  return (
    <motion.div variants={cardVariant} className="flex gap-3">
      <span className={`text-base font-bold shrink-0 mt-0.5 ${accent}`}>→</span>
      <div>
        <p className="text-sm font-semibold text-white mb-0.5">{title}</p>
        <p className="text-sm leading-relaxed opacity-70">{desc}</p>
      </div>
    </motion.div>
  );
}

export function HybridApproach() {
  return (
    <section className="px-8 py-28 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="max-w-3xl mb-20">
            <p className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">
              The Hybrid Approach
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Automation alone<br />is not enough.
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Every other solution gives you a widget or an audit. Inculva gives you both —
              a self-serve automation layer backed by real human accessibility expertise.
            </p>
          </div>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-6">
          <FadeUp delay={0.06}>
            <div className="rounded-2xl bg-blue-600 p-8 h-full">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-xl">⚡</div>
                <div>
                  <p className="text-base font-bold">Automation Layer</p>
                  <p className="text-blue-200 text-sm">Instant, always-on</p>
                </div>
              </div>
              <StaggerGrid className="space-y-6">
                {automation.map((item) => (
                  <Item key={item.title} {...item} accent="text-blue-300" />
                ))}
              </StaggerGrid>
            </div>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div className="rounded-2xl bg-gray-800 border border-gray-700 p-8 h-full">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-gray-700 flex items-center justify-center text-xl">🧠</div>
                <div>
                  <p className="text-base font-bold">Human Expertise Layer</p>
                  <p className="text-gray-400 text-sm">Pro & Business plans</p>
                </div>
              </div>
              <StaggerGrid className="space-y-6">
                {expertise.map((item) => (
                  <Item key={item.title} {...item} accent="text-green-400" />
                ))}
              </StaggerGrid>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
