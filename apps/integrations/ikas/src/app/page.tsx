"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const errorMessages: Record<string, Record<string, string>> = {
  en: {
    missing_params:
      "Missing required parameters. Please try again from ikas.",
    invalid_signature:
      "Invalid request signature. Please try again from ikas.",
    auth_failed:
      "Authentication failed. Please try again from ikas.",
    no_storefront:
      "No storefront found. Please set up a storefront in ikas first.",
    default: "Something went wrong. Please try again from ikas.",
    open_from_ikas: "Please open this app from your ikas admin panel.",
  },
  tr: {
    missing_params:
      "Gerekli parametreler eksik. Lütfen ikas üzerinden tekrar deneyin.",
    invalid_signature:
      "Geçersiz istek imzası. Lütfen ikas üzerinden tekrar deneyin.",
    auth_failed:
      "Kimlik doğrulama başarısız. Lütfen ikas üzerinden tekrar deneyin.",
    no_storefront:
      "Mağaza bulunamadı. Lütfen önce ikas'ta bir mağaza oluşturun.",
    default:
      "Bir hata oluştu. Lütfen ikas üzerinden tekrar deneyin.",
    open_from_ikas:
      "Lütfen bu uygulamayı ikas yönetim panelinizden açın.",
  },
};

function getLocale(): "tr" | "en" {
  if (typeof navigator !== "undefined") {
    return navigator.language.toLowerCase().startsWith("tr") ? "tr" : "en";
  }
  return "en";
}

export default function HomePage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const init = async () => {
      const params = new URLSearchParams(window.location.search);
      const locale = getLocale();
      const msgs = errorMessages[locale]!;

      // Show error if redirected from failed callback
      const error = params.get("error");
      if (error) {
        setErrorMsg(msgs[error] ?? msgs.default!);
        setStatus("error");
        return;
      }

      try {
        // Check if running inside ikas iframe
        if (window.self !== window.top) {
          const { AppBridgeHelper } = await import("@ikas/app-helpers");
          AppBridgeHelper.closeLoader();

          const ikasToken = await AppBridgeHelper.getNewToken();
          if (ikasToken) {
            const res = await fetch("/api/auth/exchange", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ accessToken: ikasToken }),
            });

            if (res.ok) {
              const { token } = (await res.json()) as { token: string };
              sessionStorage.setItem("ikas_token", token);
              router.push("/dashboard");
              return;
            }
          }
        }

        // Not in iframe or exchange failed — check for storeName param to start OAuth
        const storeName = params.get("storeName") ?? params.get("store");
        if (storeName) {
          const clientId = process.env.NEXT_PUBLIC_IKAS_CLIENT_ID;
          const deployUrl = process.env.NEXT_PUBLIC_DEPLOY_URL;
          const redirectUri = `${deployUrl}/api/oauth/callback/ikas`;
          const scope =
            "read_product write_product read_order write_order read_storefront write_storefront";
          const oauthUrl =
            `https://${storeName}.myikas.com/api/admin/oauth/authorize` +
            `?response_type=code&client_id=${clientId}` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
          window.location.replace(oauthUrl);
          return;
        }

        // No context — show message
        setErrorMsg(msgs.open_from_ikas!);
        setStatus("error");
      } catch {
        setErrorMsg(msgs.default!);
        setStatus("error");
      }
    };

    init();
  }, [router]);

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            inculva for ikas
          </h1>
          <p className="text-gray-500">{errorMsg}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
