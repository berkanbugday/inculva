"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const labels = {
  en: {
    title: "Set Up inculva",
    subtitle:
      "Create your account to activate the accessibility widget on your store.",
    email: "Email",
    emailPlaceholder: "you@example.com",
    password: "Password",
    passwordPlaceholder: "Min. 8 characters",
    domain: "Website Domain",
    domainHint: "The domain where the widget will appear",
    domainPlaceholder: "mystore.com",
    submit: "Complete Setup",
    submitting: "Setting up...",
    errors: {
      missing_fields: "Please fill in all fields.",
      invalid_email: "Please enter a valid email address.",
      invalid_domain: "Please enter a valid domain.",
      weak_password: "Password must be at least 8 characters.",
      expired_token:
        "Setup link has expired. Please reinstall from ikas.",
      already_installed:
        "This store is already set up. Please reopen from ikas admin.",
      email_taken:
        "This email is already registered. Please use a different email.",
    } as Record<string, string>,
  },
  tr: {
    title: "inculva Kurulumu",
    subtitle:
      "Mağazanızda erişilebilirlik widget'ını etkinleştirmek için hesabınızı oluşturun.",
    email: "E-posta",
    emailPlaceholder: "siz@ornek.com",
    password: "Şifre",
    passwordPlaceholder: "En az 8 karakter",
    domain: "Web Sitesi Alan Adı",
    domainHint: "Widget'ın görüneceği alan adı",
    domainPlaceholder: "magazam.com",
    submit: "Kurulumu Tamamla",
    submitting: "Kuruluyor...",
    errors: {
      missing_fields: "Lütfen tüm alanları doldurun.",
      invalid_email: "Lütfen geçerli bir e-posta adresi girin.",
      invalid_domain: "Lütfen geçerli bir alan adı girin.",
      weak_password: "Şifre en az 8 karakter olmalıdır.",
      expired_token:
        "Kurulum bağlantısının süresi doldu. Lütfen ikas üzerinden tekrar kurun.",
      already_installed:
        "Bu mağaza zaten kurulmuş. Lütfen ikas yönetim panelinden açın.",
      email_taken:
        "Bu e-posta adresi zaten kayıtlı. Lütfen farklı bir e-posta kullanın.",
    } as Record<string, string>,
  },
};

type Locale = "tr" | "en";

function getLocale(): Locale {
  if (typeof navigator !== "undefined") {
    return navigator.language.toLowerCase().startsWith("tr") ? "tr" : "en";
  }
  return "en";
}

export default function SetupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setupToken = searchParams.get("token");

  const [locale, setLocale] = useState<Locale>("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const t = labels[locale];

  useEffect(() => {
    setLocale(getLocale());
    const defaultDomain = searchParams.get("domain");
    if (defaultDomain) setDomain(defaultDomain);
  }, [searchParams]);

  if (!setupToken) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <p className="text-gray-500">{t.errors.expired_token}</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setupToken, email, password, domain }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        const errorKey = data.error ?? "";
        setError(t.errors[errorKey] ?? t.errors.missing_fields ?? null);
        setSubmitting(false);
        return;
      }

      const { token } = (await res.json()) as { token: string };
      sessionStorage.setItem("ikas_token", token);
      router.push("/dashboard");
    } catch {
      setError(t.errors.missing_fields ?? null);
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="absolute right-4 top-4">
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          className="rounded border bg-white px-2 py-1 text-sm text-gray-600"
        >
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{t.subtitle}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border bg-white p-6 shadow-sm"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              {t.email}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              placeholder={t.emailPlaceholder}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              {t.password}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder={t.passwordPlaceholder}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="domain"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              {t.domain}
            </label>
            <input
              id="domain"
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
              placeholder={t.domainPlaceholder}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="none"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <p className="mt-1 text-xs text-gray-400">{t.domainHint}</p>
          </div>

          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={
              submitting ||
              !email.trim() ||
              !password.trim() ||
              !domain.trim()
            }
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? t.submitting : t.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
