import type { Metadata } from "next";
import { cookies } from "next/headers";
import "@inculva/ui/globals.css";
import { CookieBanner } from "@/components/cookie-banner";

const CDN_URL = process.env["NEXT_PUBLIC_CDN_URL"]!;

export const metadata: Metadata = {
  title: "Inculva — Accessibility Dashboard",
  description: "Manage your web accessibility widget settings and analytics.",
  icons: {
    icon: `${CDN_URL}/icons/universal-access.svg`,
    shortcut: `${CDN_URL}/icons/universal-access.svg`,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = (await cookies()).get("theme")?.value;
  const isDark = theme === "dark";

  return (
    <html lang="en" className={isDark ? "dark" : ""}>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
