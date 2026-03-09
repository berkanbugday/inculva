import { redirect } from "next/navigation";

const APP_URL = process.env["NEXT_PUBLIC_APP_URL"] ?? "https://app.inculva.com";

interface Props {
  params: Promise<{ code: string }>;
}

export default async function ReferralRedirectPage({ params }: Props) {
  const { code } = await params;
  redirect(`${APP_URL}/register?ref=${encodeURIComponent(code)}`);
}
