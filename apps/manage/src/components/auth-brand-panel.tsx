import type { ReactNode } from "react";

const CDN_URL = process.env["NEXT_PUBLIC_CDN_URL"]!;

interface Props {
  children: ReactNode;
  gradient?: string;
}

/**
 * Decorative left-side brand panel used across all auth screens.
 * Marked aria-hidden so screen readers focus on the form panel.
 */
export function AuthBrandPanel({
  children,
  gradient = "from-blue-600 to-violet-600",
}: Props) {
  return (
    <div
      className={`hidden lg:flex lg:w-[42%] bg-gradient-to-br ${gradient} flex-col justify-between p-12 relative overflow-hidden`}
      aria-hidden="true"
    >
      {/* decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5" />

      {/* logo */}
      <div className="flex items-center gap-3 relative z-10">
        <img src={`${CDN_URL}/logos/logo.png`} alt="" className="h-8 w-auto" />
      </div>

      {/* slot */}
      <div className="relative z-10">{children}</div>

      {/* standards badge */}
      <div className="relative z-10 bg-white/10 border border-white/20 rounded-2xl px-5 py-4">
        <p className="text-white/60 text-xs font-medium mb-1 uppercase tracking-widest">
          Standards
        </p>
        <p className="text-white font-semibold text-sm">
          WCAG 2.1 AA · EAA 2025 · ADA · Section 508
        </p>
      </div>
    </div>
  );
}
