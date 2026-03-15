"use client";

import { useState } from "react";
import { cn } from "@inculva/ui";

type ApiKey = {
  id: string;
  name: string;
  keyPrefix: string;
  lastUsedAt: Date | null;
  expiresAt: Date | null;
  createdAt: Date;
};

interface Props {
  initialKeys: ApiKey[];
}

export function ApiKeysManager({ initialKeys }: Props) {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [revoking, setRevoking] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!res.ok) return;
      const json = (await res.json()) as {
        success: boolean;
        data: { key: string; name: string; keyPrefix: string };
      };
      setNewKey(json.data.key);
      setName("");
      // Refresh key list
      const listRes = await fetch("/api/keys");
      const listJson = (await listRes.json()) as {
        success: boolean;
        data: ApiKey[];
      };
      if (listJson.success) setKeys(listJson.data);
    } finally {
      setCreating(false);
    }
  }

  async function handleRevoke(id: string) {
    setRevoking(id);
    try {
      const res = await fetch(`/api/keys/${id}`, { method: "DELETE" });
      if (res.ok) {
        setKeys((prev) => prev.filter((k) => k.id !== id));
      }
    } finally {
      setRevoking(null);
    }
  }

  async function copyKey() {
    if (!newKey) return;
    await navigator.clipboard.writeText(newKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function formatDate(date: Date | null): string {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8 space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900">API Keys</h3>
        <p className="text-sm text-gray-500 mt-1">
          Use these keys to authenticate requests to the Inculva API from your
          own integrations.
        </p>
      </div>

      {/* New key banner */}
      {newKey && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm font-medium text-green-800 mb-2">
            Key created — copy it now. You won&apos;t see it again.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-white border border-green-200 rounded-lg px-3 py-2 text-xs font-mono text-green-900 overflow-x-auto">
              {newKey}
            </code>
            <button
              onClick={() => void copyKey()}
              className={cn(
                "px-3 py-2 rounded-lg text-xs font-medium transition-colors shrink-0",
                copied
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-800 hover:bg-green-200",
              )}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <button
            onClick={() => setNewKey(null)}
            className="text-xs text-green-600 hover:underline mt-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Create form */}
      <form onSubmit={(e) => void handleCreate(e)} className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Key name (e.g. Production)"
          required
          className="flex-1 px-4 py-2.5 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl text-sm bg-white dark:bg-[#0e0e10] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={creating}
          className={cn(
            "px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shrink-0",
            creating && "opacity-60 cursor-not-allowed",
          )}
        >
          {creating ? "Creating…" : "Create key"}
        </button>
      </form>

      {/* Key list */}
      {keys.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">
          No API keys yet. Create one above.
        </p>
      ) : (
        <div className="divide-y divide-[#f8f9fc] dark:divide-[#2a2a3e]">
          {keys.map((key) => (
            <div
              key={key.id}
              className="flex items-center justify-between py-3 gap-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {key.name}
                  </span>
                  <code className="text-xs font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                    {key.keyPrefix}…
                  </code>
                </div>
                <div className="flex gap-3 mt-0.5 text-xs text-gray-400">
                  <span>Created {formatDate(key.createdAt)}</span>
                  <span>Last used {formatDate(key.lastUsedAt)}</span>
                  {key.expiresAt && (
                    <span className="text-amber-600">
                      Expires {formatDate(key.expiresAt)}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => void handleRevoke(key.id)}
                disabled={revoking === key.id}
                className="text-xs text-red-600 hover:text-red-800 font-medium disabled:opacity-50 shrink-0"
              >
                {revoking === key.id ? "Revoking…" : "Revoke"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
