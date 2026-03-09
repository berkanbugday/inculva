import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set new password — Inculva",
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
