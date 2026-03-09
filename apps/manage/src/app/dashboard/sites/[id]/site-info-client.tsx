"use client";

import { useState } from "react";
import { SiteNameForm } from "./site-name-form";
import { SiteDomainForm } from "./site-domain-form";
import { InstallChecker } from "./install-checker";

interface Props {
  siteId: string;
  initialName: string;
  initialDomain: string;
  widgetScriptSrc: string;
}

export function SiteInfoClient({ siteId, initialName, initialDomain, widgetScriptSrc }: Props) {
  const [domain, setDomain] = useState(initialDomain);

  return (
    <>
      {/* Site header — name + domain */}
      <div className="space-y-0.5">
        <SiteNameForm siteId={siteId} initialName={initialName} />
        <SiteDomainForm
          siteId={siteId}
          initialDomain={initialDomain}
          onDomainChange={setDomain}
        />
      </div>

      {/* Embed snippet */}
      <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-2xl p-6 border border-gray-800">
        <h3 className="font-semibold mb-1">Embed Code</h3>
        <p className="text-sm text-gray-400 mb-3">
          Add before the closing{" "}
          <code className="text-green-400">&lt;/body&gt;</code> tag on{" "}
          <strong className="text-white">{domain}</strong>:
        </p>
        <pre className="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto text-green-300 select-all">
{`<script\n  src="${widgetScriptSrc}"\n  data-site-id="${siteId}"\n  defer\n></script>`}
        </pre>
        <InstallChecker siteId={siteId} domain={domain} />
      </div>
    </>
  );
}
