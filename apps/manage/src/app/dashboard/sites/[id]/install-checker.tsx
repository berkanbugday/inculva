"use client";

import { useState } from "react";

type Status = "idle" | "checking" | "installed" | "not-installed" | "error";

interface Props {
  siteId: string;
  domain: string;
}

export function InstallChecker({ siteId, domain }: Props) {
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
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        {status === "checking" ? "Checking…" : "Check installation"}
      </button>

      {status === "installed" && (
        <span className="flex items-center gap-1.5 text-sm text-green-700 font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          Widget detected on {domain}
        </span>
      )}

      {status === "not-installed" && (
        <span className="flex items-center gap-1.5 text-sm text-amber-700">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
          Widget not detected yet — add the snippet below
        </span>
      )}

      {status === "error" && (
        <span className="text-sm text-red-600">
          {errorMsg ?? "Could not reach site"}
        </span>
      )}
    </div>
  );
}
