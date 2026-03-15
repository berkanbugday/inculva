"use client";

import { useState } from "react";

type WebhookEvent =
  | "site.config_updated"
  | "usage.warning"
  | "usage.limit"
  | "payment.failed";

interface Webhook {
  id: string;
  url: string;
  events: string[];
  enabled: boolean;
  createdAt: string;
}

const ALL_EVENTS: { value: WebhookEvent; label: string; desc: string }[] = [
  {
    value: "site.config_updated",
    label: "Site config updated",
    desc: "When widget settings are saved",
  },
  {
    value: "usage.warning",
    label: "Usage warning (80%)",
    desc: "When monthly event quota hits 80%",
  },
  {
    value: "usage.limit",
    label: "Usage limit (100%)",
    desc: "When monthly event quota is exhausted",
  },
  {
    value: "payment.failed",
    label: "Payment failed",
    desc: "When a subscription payment fails",
  },
];

interface Props {
  initialWebhooks: Webhook[];
}

export function WebhooksManager({ initialWebhooks }: Props) {
  const [webhooks, setWebhooks] = useState<Webhook[]>(initialWebhooks);
  const [showForm, setShowForm] = useState(false);
  const [url, setUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<WebhookEvent[]>([
    "site.config_updated",
  ]);
  const [saving, setSaving] = useState(false);
  const [newSecret, setNewSecret] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{
    id: string;
    ok: boolean;
  } | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, events: selectedEvents }),
      });
      const json = (await res.json()) as {
        success?: boolean;
        error?: string;
        data?: Webhook & { secret?: string };
      };
      if (!res.ok || !json.success) {
        setError(json.error ?? "Failed to create webhook.");
        return;
      }
      const { secret, ...hook } = json.data!;
      setWebhooks((prev) => [hook, ...prev]);
      setNewSecret(secret ?? null);
      setShowForm(false);
      setUrl("");
      setSelectedEvents(["site.config_updated"]);
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/webhooks/${id}`, { method: "DELETE" });
    if (res.ok) {
      setWebhooks((prev) => prev.filter((w) => w.id !== id));
      if (newSecret) setNewSecret(null);
    }
  }

  async function handleToggle(id: string, enabled: boolean) {
    const res = await fetch(`/api/webhooks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled }),
    });
    if (res.ok) {
      setWebhooks((prev) =>
        prev.map((w) => (w.id === id ? { ...w, enabled } : w)),
      );
    }
  }

  async function handleTest(id: string) {
    setTestingId(id);
    setTestResult(null);
    try {
      const res = await fetch(`/api/webhooks/${id}/test`, { method: "POST" });
      setTestResult({ id, ok: res.ok });
    } catch {
      setTestResult({ id, ok: false });
    } finally {
      setTestingId(null);
    }
  }

  function toggleEvent(ev: WebhookEvent) {
    setSelectedEvents((prev) =>
      prev.includes(ev) ? prev.filter((e) => e !== ev) : [...prev, ev],
    );
  }

  return (
    <section className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-sm p-8 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Webhooks
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Receive HTTP POST notifications when platform events occur.
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setNewSecret(null);
              setError("");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            + Add webhook
          </button>
        )}
      </div>

      {/* Create form */}
      {showForm && (
        <form
          onSubmit={(e) => void handleCreate(e)}
          className="border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl p-5 space-y-4 bg-[#f8f9fc] dark:bg-[#0e0e10]"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Endpoint URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-server.com/webhooks/inculva"
              className="w-full px-4 py-2.5 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-2xl bg-white dark:bg-[#1a1a2e] text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Must be HTTPS. Max 500 characters.
            </p>
          </div>

          <div>
            <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Events to subscribe
            </p>
            <div className="space-y-2">
              {ALL_EVENTS.map((ev) => (
                <label
                  key={ev.value}
                  className="flex items-start gap-2.5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(ev.value)}
                    onChange={() => toggleEvent(ev.value)}
                    className="mt-0.5 rounded border-gray-300"
                  />
                  <span className="text-sm">
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {ev.label}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500 ml-2">
                      {ev.desc}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving || selectedEvents.length === 0}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {saving ? "Creating…" : "Create webhook"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setError("");
              }}
              className="px-5 py-2.5 border border-[#e8eaf0] dark:border-[#2a2a3e] rounded-full text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Secret reveal (shown once after creation) */}
      {newSecret && (
        <div className="border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950 rounded-xl p-4">
          <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
            Save your signing secret — shown only once
          </p>
          <p className="text-xs text-yellow-700 dark:text-yellow-400 mb-3">
            Use this to verify incoming requests are from Inculva. Check the{" "}
            <code className="font-mono">X-Inculva-Signature</code> header
            against <code className="font-mono">HMAC-SHA256(secret, body)</code>
            .
          </p>
          <code className="block bg-white dark:bg-gray-900 border border-yellow-200 dark:border-yellow-800 rounded-lg px-3 py-2 text-xs font-mono text-gray-800 dark:text-gray-200 break-all select-all">
            {newSecret}
          </code>
          <button
            onClick={() => setNewSecret(null)}
            className="mt-3 text-xs text-yellow-700 dark:text-yellow-400 hover:underline"
          >
            I've saved it — dismiss
          </button>
        </div>
      )}

      {/* Webhook list */}
      {webhooks.length === 0 && !showForm ? (
        <p className="text-sm text-gray-400 dark:text-gray-600 text-center py-6">
          No webhooks yet. Add one to start receiving event notifications.
        </p>
      ) : (
        <div className="divide-y divide-[#f8f9fc] dark:divide-[#2a2a3e]">
          {webhooks.map((hook) => (
            <div key={hook.id} className="py-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-mono text-gray-800 dark:text-gray-200 truncate">
                  {hook.url}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {hook.events.map((ev) => (
                    <span
                      key={ev}
                      className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs font-mono"
                    >
                      {ev}
                    </span>
                  ))}
                </div>
                {testResult?.id === hook.id && (
                  <p
                    className={`text-xs mt-1.5 ${testResult.ok ? "text-green-600 dark:text-green-400" : "text-red-500"}`}
                  >
                    {testResult.ok
                      ? "Test delivered successfully."
                      : "Test delivery failed — check your endpoint."}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {/* Enable/disable toggle */}
                <button
                  onClick={() => void handleToggle(hook.id, !hook.enabled)}
                  title={hook.enabled ? "Disable" : "Enable"}
                  className={`relative w-9 h-5 rounded-full transition-colors ${hook.enabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${hook.enabled ? "translate-x-4" : ""}`}
                  />
                </button>
                {/* Test */}
                <button
                  onClick={() => void handleTest(hook.id)}
                  disabled={testingId === hook.id}
                  className="text-xs px-2 py-1 border border-gray-200 dark:border-gray-700 rounded text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
                >
                  {testingId === hook.id ? "…" : "Test"}
                </button>
                {/* Delete */}
                <button
                  onClick={() => void handleDelete(hook.id)}
                  className="text-xs px-2 py-1 border border-red-200 dark:border-red-900 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
