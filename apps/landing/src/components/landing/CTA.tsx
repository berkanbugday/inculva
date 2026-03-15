"use client";

import { FadeUp } from "./motion";

export function CTA({ appUrl }: { appUrl: string }) {
  return (
    <section className="px-8 py-28 bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <FadeUp>
          <p className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-6">
            Get started today
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Your visitors deserve<br />a better experience.
          </h2>
          <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            1 in 6 people globally live with a disability. EAA 2025 is in force. ADA enforcement
            is accelerating. Accessibility is no longer optional — and Inculva makes it simple.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href={`${appUrl}/register`}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-base"
            >
              Start for free
            </a>
            <a
              href="/pricing"
              className="px-8 py-4 border-2 border-gray-700 hover:border-gray-500 text-white font-bold rounded-xl transition-colors text-base"
            >
              Compare plans
            </a>
          </div>
          <p className="text-base text-gray-600">
            Free plan forever · No credit card · Cancel anytime
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
