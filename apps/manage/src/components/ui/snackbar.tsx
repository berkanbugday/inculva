"use client";

"use client";

import { useEffect, useState } from "react";

interface SnackbarProps {
  open: boolean;
  message: string;
  variant?: "success" | "error" | "info";
}

export function Snackbar({
  open,
  message,
  variant = "success",
}: SnackbarProps) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // Wait one frame so transition classes can animate from hidden -> visible.
      requestAnimationFrame(() => setVisible(true));
      return;
    }
    setVisible(false);
    const timeout = setTimeout(() => setMounted(false), 260);
    return () => clearTimeout(timeout);
  }, [open]);

  if (!mounted) return null;

  const styles =
    variant === "success"
      ? "bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100"
      : variant === "error"
      ? "bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100"
      : "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] pointer-events-none transition-all duration-250 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-2 opacity-0"
      }`}
    >
      <div
        className={`rounded-xl border px-4 py-3 text-sm font-medium shadow-lg max-w-[22rem] ${styles}`}
      >
        <div className="flex items-start gap-2">
          <span aria-hidden="true" className="mt-0.5">
            {variant === "success" ? "✓" : variant === "error" ? "!" : "i"}
          </span>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}
