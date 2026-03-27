import type { Metadata } from "next";
import { cookies } from "next/headers";
import "@inculva/ui/globals.css";
import { CookieBanner } from "@/components/cookie-banner";

export const metadata: Metadata = {
  title: "Inculva — Accessibility Dashboard",
  description: "Manage your web accessibility widget settings and statistics.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;
  const isDark = theme === "dark";
  const locale = cookieStore.get("locale")?.value || "en";

  return (
    <html
      lang={locale}
      className={isDark ? "dark" : ""}
      suppressHydrationWarning
    >
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
