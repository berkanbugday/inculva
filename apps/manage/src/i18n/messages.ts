export const SUPPORTED_LOCALES = ["en", "tr", "de", "fr", "es"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export interface DashboardMessages {
  nav: {
    sites: string;
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
  auth: {
    email: string;
    password: string;
    fullName: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    signIn: string;
    signUp: string;
    forgotPassword: string;
    sendResetLink: string;
    setNewPassword: string;
    createAccount: string;
    backToSignIn: string;
    noAccount: string;
    haveAccount: string;
    rememberPassword: string;
  };
  settings: {
    title: string;
    account: string;
    profile: string;
    changePassword: string;
    billing: string;
    apiKeys: string;
    webhooks: string;
    auditLog: string;
    exportData: string;
    deleteAccount: string;
    saveName: string;
    saving: string;
    updating: string;
  };
  dashboard: {
    title: string;
    newSite: string;
    noSites: string;
    noSitesDesc: string;
  };
  sites: {
    health: string;
    domain: string;
    name: string;
    opens: string;
    wcagScore: string;
  };
}

const messages: Record<Locale, DashboardMessages> = {
  en: {
    nav: { sites: "Sites", settings: "Settings", pricing: "Pricing" },
    header: { signOut: "Sign out", signingOut: "Signing out…" },
    langSwitcher: { label: "Language" },
    auth: {
      email: "Email address",
      password: "Password",
      fullName: "Full name",
      currentPassword: "Current password",
      newPassword: "New password",
      confirmPassword: "Confirm new password",
      signIn: "Sign in",
      signUp: "Sign up",
      forgotPassword: "Forgot password?",
      sendResetLink: "Send reset link",
      setNewPassword: "Set new password",
      createAccount: "Create free account",
      backToSignIn: "Back to sign in",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      rememberPassword: "Remember it?",
    },
    settings: {
      title: "Settings",
      account: "Account",
      profile: "Profile",
      changePassword: "Change Password",
      billing: "Billing",
      apiKeys: "API Keys",
      webhooks: "Webhooks",
      auditLog: "Audit Log",
      exportData: "Export Your Data",
      deleteAccount: "Delete Account",
      saveName: "Save name",
      saving: "Saving…",
      updating: "Updating…",
    },
    dashboard: {
      title: "Your Sites",
      newSite: "New site",
      noSites: "No sites yet",
      noSitesDesc: "Add your first site to get started.",
    },
    sites: {
      health: "Health",
      domain: "Domain",
      name: "Name",
      opens: "Widget opens",
      wcagScore: "WCAG score",
    },
  },

  tr: {
    nav: { sites: "Siteler", settings: "Ayarlar", pricing: "Fiyatlandırma" },
    header: { signOut: "Çıkış yap", signingOut: "Çıkılıyor…" },
    langSwitcher: { label: "Dil" },
    auth: {
      email: "E-posta adresi",
      password: "Şifre",
      fullName: "Ad Soyad",
      currentPassword: "Mevcut şifre",
      newPassword: "Yeni şifre",
      confirmPassword: "Yeni şifreyi onayla",
      signIn: "Giriş yap",
      signUp: "Kayıt ol",
      forgotPassword: "Şifrenizi mi unuttunuz?",
      sendResetLink: "Sıfırlama bağlantısı gönder",
      setNewPassword: "Yeni şifre belirle",
      createAccount: "Ücretsiz hesap oluştur",
      backToSignIn: "Girişe dön",
      noAccount: "Hesabınız yok mu?",
      haveAccount: "Zaten hesabınız var mı?",
      rememberPassword: "Hatırladınız mı?",
    },
    settings: {
      title: "Ayarlar",
      account: "Hesap",
      profile: "Profil",
      changePassword: "Şifre Değiştir",
      billing: "Faturalama",
      apiKeys: "API Anahtarları",
      webhooks: "Webhooklar",
      auditLog: "Denetim Günlüğü",
      exportData: "Verilerimi Dışa Aktar",
      deleteAccount: "Hesabı Sil",
      saveName: "Adı kaydet",
      saving: "Kaydediliyor…",
      updating: "Güncelleniyor…",
    },
    dashboard: {
      title: "Siteleriniz",
      newSite: "Yeni site",
      noSites: "Henüz site yok",
      noSitesDesc: "Başlamak için ilk sitenizi ekleyin.",
    },
    sites: {
      health: "Durum",
      domain: "Alan Adı",
      name: "Ad",
      opens: "Widget açılışları",
      wcagScore: "WCAG puanı",
    },
  },

  de: {
    nav: { sites: "Websites", settings: "Einstellungen", pricing: "Preise" },
    header: { signOut: "Abmelden", signingOut: "Abmelden…" },
    langSwitcher: { label: "Sprache" },
    auth: {
      email: "E-Mail-Adresse",
      password: "Passwort",
      fullName: "Vollständiger Name",
      currentPassword: "Aktuelles Passwort",
      newPassword: "Neues Passwort",
      confirmPassword: "Neues Passwort bestätigen",
      signIn: "Anmelden",
      signUp: "Registrieren",
      forgotPassword: "Passwort vergessen?",
      sendResetLink: "Reset-Link senden",
      setNewPassword: "Neues Passwort setzen",
      createAccount: "Kostenloses Konto erstellen",
      backToSignIn: "Zurück zur Anmeldung",
      noAccount: "Noch kein Konto?",
      haveAccount: "Bereits ein Konto?",
      rememberPassword: "Erinnern Sie sich?",
    },
    settings: {
      title: "Einstellungen",
      account: "Konto",
      profile: "Profil",
      changePassword: "Passwort ändern",
      billing: "Abrechnung",
      apiKeys: "API-Schlüssel",
      webhooks: "Webhooks",
      auditLog: "Audit-Protokoll",
      exportData: "Daten exportieren",
      deleteAccount: "Konto löschen",
      saveName: "Namen speichern",
      saving: "Wird gespeichert…",
      updating: "Wird aktualisiert…",
    },
    dashboard: {
      title: "Ihre Websites",
      newSite: "Neue Website",
      noSites: "Noch keine Websites",
      noSitesDesc: "Fügen Sie Ihre erste Website hinzu, um zu beginnen.",
    },
    sites: {
      health: "Status",
      domain: "Domain",
      name: "Name",
      opens: "Widget-Öffnungen",
      wcagScore: "WCAG-Bewertung",
    },
  },

  fr: {
    nav: { sites: "Sites", settings: "Paramètres", pricing: "Tarifs" },
    header: { signOut: "Se déconnecter", signingOut: "Déconnexion…" },
    langSwitcher: { label: "Langue" },
    auth: {
      email: "Adresse e-mail",
      password: "Mot de passe",
      fullName: "Nom complet",
      currentPassword: "Mot de passe actuel",
      newPassword: "Nouveau mot de passe",
      confirmPassword: "Confirmer le nouveau mot de passe",
      signIn: "Se connecter",
      signUp: "S'inscrire",
      forgotPassword: "Mot de passe oublié ?",
      sendResetLink: "Envoyer le lien de réinitialisation",
      setNewPassword: "Définir un nouveau mot de passe",
      createAccount: "Créer un compte gratuit",
      backToSignIn: "Retour à la connexion",
      noAccount: "Pas encore de compte ?",
      haveAccount: "Déjà un compte ?",
      rememberPassword: "Vous vous en souvenez ?",
    },
    settings: {
      title: "Paramètres",
      account: "Compte",
      profile: "Profil",
      changePassword: "Changer de mot de passe",
      billing: "Facturation",
      apiKeys: "Clés API",
      webhooks: "Webhooks",
      auditLog: "Journal d'audit",
      exportData: "Exporter vos données",
      deleteAccount: "Supprimer le compte",
      saveName: "Enregistrer le nom",
      saving: "Enregistrement…",
      updating: "Mise à jour…",
    },
    dashboard: {
      title: "Vos sites",
      newSite: "Nouveau site",
      noSites: "Aucun site pour l'instant",
      noSitesDesc: "Ajoutez votre premier site pour commencer.",
    },
    sites: {
      health: "Santé",
      domain: "Domaine",
      name: "Nom",
      opens: "Ouvertures widget",
      wcagScore: "Score WCAG",
    },
  },

  es: {
    nav: { sites: "Sitios", settings: "Ajustes", pricing: "Precios" },
    header: { signOut: "Cerrar sesión", signingOut: "Cerrando sesión…" },
    langSwitcher: { label: "Idioma" },
    auth: {
      email: "Correo electrónico",
      password: "Contraseña",
      fullName: "Nombre completo",
      currentPassword: "Contraseña actual",
      newPassword: "Nueva contraseña",
      confirmPassword: "Confirmar nueva contraseña",
      signIn: "Iniciar sesión",
      signUp: "Registrarse",
      forgotPassword: "¿Olvidaste tu contraseña?",
      sendResetLink: "Enviar enlace de restablecimiento",
      setNewPassword: "Establecer nueva contraseña",
      createAccount: "Crear cuenta gratis",
      backToSignIn: "Volver al inicio de sesión",
      noAccount: "¿No tienes cuenta?",
      haveAccount: "¿Ya tienes una cuenta?",
      rememberPassword: "¿La recuerdas?",
    },
    settings: {
      title: "Ajustes",
      account: "Cuenta",
      profile: "Perfil",
      changePassword: "Cambiar contraseña",
      billing: "Facturación",
      apiKeys: "Claves API",
      webhooks: "Webhooks",
      auditLog: "Registro de auditoría",
      exportData: "Exportar tus datos",
      deleteAccount: "Eliminar cuenta",
      saveName: "Guardar nombre",
      saving: "Guardando…",
      updating: "Actualizando…",
    },
    dashboard: {
      title: "Tus sitios",
      newSite: "Nuevo sitio",
      noSites: "Sin sitios todavía",
      noSitesDesc: "Agrega tu primer sitio para comenzar.",
    },
    sites: {
      health: "Estado",
      domain: "Dominio",
      name: "Nombre",
      opens: "Aperturas del widget",
      wcagScore: "Puntuación WCAG",
    },
  },
};

export function getMessages(locale: string): DashboardMessages {
  const key = SUPPORTED_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  return messages[key];
}
