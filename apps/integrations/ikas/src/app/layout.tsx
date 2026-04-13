import type { Metadata } from "next";
import "../tailwind.css";

export const metadata: Metadata = {
  title: "inculva — ikas accessibility widget",
  description: "Accessibility widget integration for ikas stores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
