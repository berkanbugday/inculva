import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account — Inculva",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
