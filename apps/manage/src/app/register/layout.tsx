import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account — inculva",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
