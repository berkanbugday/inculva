"use client";

import { useState } from "react";
import { useMessages } from "@/i18n/useMessages";

type Status = "idle" | "checking" | "installed" | "not-installed" | "error";

interface Props {
  siteId: string;
  domain: string;
}

export function InstallChecker({ siteId, domain }: Props) {
  const t = useMessages();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function checkInstall() {
    setStatus("checking");
    setErrorMsg(null);

    const res = await fetch(`/api/sites/${siteId}/check-install`);
    const data = (await res.json()) as {
      installed?: boolean;
      error?: string;
    };

    if (data.error) {
      setStatus("error");
      setErrorMsg(data.error);
      return;
    }

    setStatus(data.installed ? "installed" : "not-installed");
  }

  return (
    <div className="mt-4 flex items-center gap-4">
      <button
        onClick={() => void checkInstall()}
        disabled={status === "checking"}
        className="px-4 py-2.5 bg-[#f8f9fc] dark:bg-[#0e0e10] text-gray-700 dark:text-gray-300 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-full text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {status === "checking"
          ? t.installChecker.checking
          : t.installChecker.checkInstallation}
      </button>

      {status === "installed" && (
        <span className="flex items-center gap-1.5 text-sm text-green-700 font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          {t.installChecker.widgetDetected.replace("{domain}", domain)}
        </span>
      )}

      {status === "not-installed" && (
        <span className="flex items-center gap-1.5 text-sm text-amber-700">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
          {t.installChecker.widgetNotDetected}
        </span>
      )}

      {status === "error" && (
        <span className="text-sm text-red-600">
          {errorMsg ?? t.installChecker.couldNotReach}
        </span>
      )}
    </div>
  );
}
