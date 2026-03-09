export const SUPPORTED_LOCALES = ["en", "tr", "de", "fr", "es"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export interface DashboardMessages {
  nav: {
    sites: string;
    teams: string;
    settings: string;
    pricing: string;
  };
  header: {
    signOut: string;
    signingOut: string;
  };
  langSwitcher: {
    label: string;
  };
}

const messages: Record<Locale, DashboardMessages> = {
  en: {
    nav: { sites: "Sites", teams: "Teams", settings: "Settings", pricing: "Pricing" },
    header: { signOut: "Sign out", signingOut: "Signing out…" },
    langSwitcher: { label: "Language" },
  },
  tr: {
    nav: { sites: "Siteler", teams: "Takımlar", settings: "Ayarlar", pricing: "Fiyatlandırma" },
    header: { signOut: "Çıkış yap", signingOut: "Çıkılıyor…" },
    langSwitcher: { label: "Dil" },
  },
  de: {
    nav: { sites: "Websites", teams: "Teams", settings: "Einstellungen", pricing: "Preise" },
    header: { signOut: "Abmelden", signingOut: "Abmelden…" },
    langSwitcher: { label: "Sprache" },
  },
  fr: {
    nav: { sites: "Sites", teams: "Équipes", settings: "Paramètres", pricing: "Tarifs" },
    header: { signOut: "Se déconnecter", signingOut: "Déconnexion…" },
    langSwitcher: { label: "Langue" },
  },
  es: {
    nav: { sites: "Sitios", teams: "Equipos", settings: "Ajustes", pricing: "Precios" },
    header: { signOut: "Cerrar sesión", signingOut: "Cerrando sesión…" },
    langSwitcher: { label: "Idioma" },
  },
};

export function getMessages(locale: string): DashboardMessages {
  const key = SUPPORTED_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  return messages[key];
}
