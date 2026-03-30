import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set new password — inculva",
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
