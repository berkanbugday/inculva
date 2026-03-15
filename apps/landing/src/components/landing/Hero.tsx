"use client";

import { FadeUp } from "./motion";

export function Hero({ appUrl, cdnUrl }: { appUrl: string; cdnUrl: string }) {
  const register = `${appUrl}/register`;

  return (
    <section className="px-8 pt-24 pb-28">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 text-sm font-semibold text-blue-600 dark:text-blue-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            EAA 2025 is in effect — fines up to €500,000
          </div>
        </FadeUp>

        <FadeUp delay={0.06}>
          <h1 className="text-6xl sm:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-8">
            Accessibility that<br />
            <span className="text-blue-600">actually works.</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.12}>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed mb-10">
            Automated widget + human expertise. One script tag.{" "}
            <strong className="text-gray-900 dark:text-white font-semibold">7 global standards</strong>.
            No developer required after install.
          </p>
        </FadeUp>

        <FadeUp delay={0.18}>
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <a
              href={register}
              className="inline-flex items-center justify-center px-7 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-base"
            >
              Start free — no card needed
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center justify-center px-7 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold rounded-xl hover:border-gray-400 dark:hover:border-gray-500 transition-colors text-base"
            >
              See pricing
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.22}>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            {[
              "Free forever plan",
              "41 languages + RTL",
              "Works on any stack",
              "GDPR compliant",
            ].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="text-green-500 font-bold">✓</span> {t}
              </span>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.28}>
          <div className="mt-16 bg-gray-950 rounded-2xl overflow-hidden border border-gray-800 max-w-2xl">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-800">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-3 text-sm text-gray-500 font-mono">index.html</span>
            </div>
            <div className="p-6 font-mono text-sm leading-loose">
              <p className="text-gray-600">{`<!-- Add before </body> -->`}</p>
              <p className="text-blue-400 mt-2">{`<`}<span className="text-green-400">script</span></p>
              <p className="text-gray-400 pl-6">src=<span className="text-amber-300">{`"${cdnUrl}/widget.js"`}</span></p>
              <p className="text-gray-400 pl-6">data-site-id=<span className="text-amber-300">"your-site-id"</span></p>
              <p className="text-gray-400 pl-6">defer</p>
              <p className="text-blue-400">{`></`}<span className="text-green-400">script</span>{`>`}</p>
              <p className="text-gray-600 text-sm mt-5 pt-4 border-t border-gray-800">That's the entire install. Widget live in seconds.</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
