import type { Metadata } from "next";
import { cookies } from "next/headers";
import "@inculva/ui/globals.css";
import { CookieBanner } from "@/components/cookie-banner";

export const metadata: Metadata = {
  title: "Inculva — Accessibility Dashboard",
  description: "Manage your web accessibility widget settings and analytics.",
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
