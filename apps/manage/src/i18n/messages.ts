export const SUPPORTED_LOCALES = ["en", "tr"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export interface DashboardMessages {
  nav: {
    sites: string;
    settings: string;
    pricing: string;
    statistics: string;
    customize: string;
    analytics: string;
    wcagScan: string;
    statement: string;
    notifications: string;
    deleteSite: string;
    newSite: string;
  };
  header: {
    signOut: string;
    signingOut: string;
    toggleMenu: string;
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
    signingIn: string;
    signUp: string;
    forgotPassword: string;
    sendResetLink: string;
    sendingResetLink: string;
    setNewPassword: string;
    updatingPassword: string;
    createAccount: string;
    creatingAccount: string;
    backToSignIn: string;
    noAccount: string;
    haveAccount: string;
    rememberPassword: string;
    signUpFree: string;
    welcomeBack: string;
    welcomeBackDesc: string;
    passwordResetSuccess: string;
    createYourAccount: string;
    createAccountDesc: string;
    forgotPasswordTitle: string;
    forgotPasswordDesc: string;
    checkInbox: string;
    checkInboxDesc: string;
    resetLinkExpiry: string;
    setNewPasswordTitle: string;
    setNewPasswordDesc: string;
    strongPasswordTitle: string;
    strongPasswordDesc: string;
    secureRecovery: string;
    secureRecoveryDesc: string;
    minChars: string;
    agreeTerms: string;
    terms: string;
    privacyPolicy: string;
    and: string;
    loginFailed: string;
    registrationFailed: string;
    resetFailed: string;
    invalidToken: string;
    continueWithGoogle: string;
    continueWithGithub: string;
    orContinueWithEmail: string;
    redirecting: string;
  };
  authFeatures: {
    oneScriptTag: string;
    accessibilityFeatures: string;
    languages: string;
    wcagReady: string;
  };
  authStats: {
    features: string;
    languages: string;
    bundleSize: string;
  };
  authTips: {
    checkSpam: string;
    resetLinkValid: string;
    strongPassword: string;
    useEightChars: string;
    mixCharacters: string;
    avoidReuse: string;
  };
  authTestimonial: {
    quote: string;
    name: string;
    role: string;
  };
  authBrand: {
    makeAccessible: string;
    makeAccessibleDesc: string;
    joinSites: string;
    joinSitesDesc: string;
    standards: string;
  };
  settings: {
    title: string;
    titleDesc: string;
    account: string;
    profile: string;
    changePassword: string;
    billing: string;
    auditLog: string;
    exportData: string;
    exportDataDesc: string;
    downloadExport: string;
    deleteAccount: string;
    deleteAccountDesc: string;
    deleteAccountConfirm: string;
    deleteAccountPermanent: string;
    deleting: string;
    save: string;
    saving: string;
    saved: string;
    updating: string;
    changePasswordBtn: string;
    passwordUpdated: string;
    cancel: string;
    dangerZone: string;
    name: string;
    emailAddress: string;
    emailChangeHint: string;
    typeDeleteConfirm: string;
  };
  dashboard: {
    title: string;
    newSite: string;
    noSites: string;
    noSitesDesc: string;
    noSitesAction: string;
    noSitesHint: string;
    siteConnected: string;
    sitesConnected: string;
    totalSites: string;
    widgetOpens: string;
    liveSites: string;
    open: string;
  };
  sites: {
    health: string;
    domain: string;
    name: string;
    opens: string;
    wcagScore: string;
  };
  siteHealth: {
    notScanned: string;
    perfect: string;
    good: string;
    fair: string;
    needsWork: string;
    live: string;
    offline: string;
    checking: string;
  };
  wizard: {
    siteInfo: string;
    siteInfoDesc: string;
    brandColor: string;
    brandColorDesc: string;
    position: string;
    positionDesc: string;
    language: string;
    languageDesc: string;
    review: string;
    reviewDesc: string;
    nameYourSite: string;
    nameYourSiteDesc: string;
    siteName: string;
    siteNamePlaceholder: string;
    domainLabel: string;
    domainPlaceholder: string;
    domainHint: string;
    dnsChecking: string;
    dnsValid: string;
    dnsInvalid: string;
    dnsError: string;
    chooseBrandColor: string;
    chooseBrandColorDesc: string;
    presets: string;
    widgetButtonPreview: string;
    widgetPosition: string;
    widgetPositionDesc: string;
    chooseLanguage: string;
    chooseLanguageDesc: string;
    languageChangeHint: string;
    reviewAndCreate: string;
    reviewAndCreateDesc: string;
    createSite: string;
    creating: string;
    continue: string;
    back: string;
    cancelLabel: string;
    viewUpgradeOptions: string;
    widgetLanguageCount: string;
  };
  positions: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
  verification: {
    verifyEmail: string;
    unlockFeatures: string;
    checkInbox: string;
    sent: string;
    resend: string;
    sending: string;
    dismiss: string;
  };
  cookie: {
    message: string;
    privacyPolicy: string;
    accept: string;
  };
  config: {
    embedCode: string;
    copy: string;
    copied: string;
    siteConfiguration: string;
    languageLabel: string;
    widgetAppearance: string;
    primaryColor: string;
    buttonSize: string;
    buttonSizeSmall: string;
    buttonSizeMedium: string;
    buttonSizeLarge: string;
    buttonType: string;
    widgetPositionLabel: string;
    saveChanges: string;
    savingChanges: string;
    savedLabel: string;
    dangerZone: string;
    dangerZoneDesc: string;
    deleteSite: string;
    accessibilityStatementUrl: string;
    domainLabel: string;
    domainSave: string;
    domainSaving: string;
    domainCancel: string;
    domainHint: string;
    domainEmpty: string;
    domainNetworkError: string;
    domainClickToChange: string;
    dnsChecking: string;
    dnsValid: string;
    dnsInvalid: string;
    dnsError: string;
  };
}

const en: DashboardMessages = {
  nav: {
    sites: "My Websites",
    settings: "Settings",
    pricing: "Pricing",
    statistics: "Statistics",
    customize: "Customize",
    analytics: "Analytics",
    wcagScan: "WCAG Scan",
    statement: "Statement",
    notifications: "Notifications",
    deleteSite: "Delete Site",
    newSite: "New Site",
  },
  header: {
    signOut: "Sign out",
    signingOut: "Signing out\u2026",
    toggleMenu: "Toggle menu",
  },
  langSwitcher: { label: "Language" },
  auth: {
    email: "Email address",
    password: "Password",
    fullName: "Full name",
    currentPassword: "Current password",
    newPassword: "New password",
    confirmPassword: "Confirm new password",
    signIn: "Sign in",
    signingIn: "Signing in\u2026",
    signUp: "Sign up",
    forgotPassword: "Forgot password?",
    sendResetLink: "Send reset link",
    sendingResetLink: "Sending\u2026",
    setNewPassword: "Set new password",
    updatingPassword: "Updating\u2026",
    createAccount: "Create free account",
    creatingAccount: "Creating account\u2026",
    backToSignIn: "Back to sign in",
    noAccount: "Don\u2019t have an account?",
    haveAccount: "Already have an account?",
    rememberPassword: "Remember it?",
    signUpFree: "Sign up free",
    welcomeBack: "Welcome back",
    welcomeBackDesc: "Sign in to manage your accessible sites.",
    passwordResetSuccess: "Password updated successfully. Sign in with your new password.",
    createYourAccount: "Create your account",
    createAccountDesc: "Free forever. No credit card required.",
    forgotPasswordTitle: "Forgot password?",
    forgotPasswordDesc: "Enter your email and we\u2019ll send you a reset link.",
    checkInbox: "Check your inbox",
    checkInboxDesc: "We sent a reset link to",
    resetLinkExpiry: "The link expires in 1 hour.",
    setNewPasswordTitle: "Set new password",
    setNewPasswordDesc: "Must be at least 8 characters.",
    strongPasswordTitle: "Set a strong new password.",
    strongPasswordDesc: "Choose a password you haven\u2019t used before to keep your account secure.",
    secureRecovery: "Secure account recovery.",
    secureRecoveryDesc: "We\u2019ll email you a secure link so you can regain access quickly.",
    minChars: "Must be at least 8 characters.",
    agreeTerms: "By signing up you agree to our",
    terms: "Terms",
    privacyPolicy: "Privacy Policy",
    and: "and",
    loginFailed: "Login failed",
    registrationFailed: "Registration failed",
    resetFailed: "Reset failed. The link may have expired.",
    invalidToken: "Invalid or missing reset token. Please request a new reset link.",
    continueWithGoogle: "Continue with Google",
    continueWithGithub: "Continue with GitHub",
    orContinueWithEmail: "or continue with email",
    redirecting: "Redirecting\u2026",
  },
  authFeatures: {
    oneScriptTag: "One script tag \u2014 live in minutes",
    accessibilityFeatures: "24 real accessibility features",
    languages: "41 languages including RTL",
    wcagReady: "WCAG 2.1 AA & EAA 2025 ready",
  },
  authStats: {
    features: "Accessibility features",
    languages: "Languages",
    bundleSize: "Bundle size",
  },
  authTips: {
    checkSpam: "Check your spam or junk folder",
    resetLinkValid: "Reset link is valid for 1 hour",
    strongPassword: "Use a strong, unique new password",
    useEightChars: "Use at least 8 characters",
    mixCharacters: "Mix letters, numbers, and symbols",
    avoidReuse: "Avoid reusing old passwords",
  },
  authTestimonial: {
    quote: "\u201CSet up in 3 minutes. Our accessibility score went from D to A.\u201D",
    name: "Maria V.",
    role: "Frontend Lead, EU SaaS",
  },
  authBrand: {
    makeAccessible: "Make your website\naccessible to everyone.",
    makeAccessibleDesc: "Add real accessibility features to any site in under 5 minutes.",
    joinSites: "Join thousands of sites\nmaking the web inclusive.",
    joinSitesDesc: "Free plan forever. No credit card required. Up and running in under 5 minutes.",
    standards: "Standards",
  },
  settings: {
    title: "Account",
    titleDesc: "Manage your profile and account settings.",
    account: "Account",
    profile: "Profile",
    changePassword: "Change Password",
    billing: "Billing",
    auditLog: "Audit Log",
    exportData: "Export Your Data",
    exportDataDesc: "Download a copy of all personal data we hold about you \u2014 your profile, sites, and API keys. This satisfies your GDPR Article 20 right to data portability.",
    downloadExport: "Download data export (JSON)",
    deleteAccount: "Delete Account",
    deleteAccountDesc: "Permanently delete your account, all sites, analytics data, and cancel your subscription. This cannot be undone.",
    deleteAccountConfirm: "Type <strong>delete</strong> to confirm:",
    deleteAccountPermanent: "Permanently delete account",
    deleting: "Deleting\u2026",
    save: "Save",
    saving: "Saving\u2026",
    saved: "Saved",
    updating: "Updating\u2026",
    changePasswordBtn: "Change password",
    passwordUpdated: "Password updated",
    cancel: "Cancel",
    dangerZone: "Danger Zone",
    name: "Name",
    emailAddress: "Email address",
    emailChangeHint: "Contact support to change your email address.",
    typeDeleteConfirm: "delete",
  },
  dashboard: {
    title: "My Websites",
    newSite: "New site",
    noSites: "No sites yet",
    noSitesDesc: "Register your domain and get an embed snippet. Your accessibility widget goes live in under 5 minutes.",
    noSitesAction: "Add your first site",
    noSitesHint: "Add your first site to get started.",
    siteConnected: "site connected",
    sitesConnected: "sites connected",
    totalSites: "Total sites",
    widgetOpens: "Widget opens",
    liveSites: "Live sites",
    open: "Open",
  },
  sites: {
    health: "Health",
    domain: "Domain",
    name: "Name",
    opens: "Widget opens",
    wcagScore: "WCAG score",
  },
  siteHealth: {
    notScanned: "Not scanned",
    perfect: "Perfect",
    good: "Good",
    fair: "Fair",
    needsWork: "Needs work",
    live: "Live",
    offline: "Offline",
    checking: "Checking",
  },
  wizard: {
    siteInfo: "Site Info",
    siteInfoDesc: "Name and domain",
    brandColor: "Brand Color",
    brandColorDesc: "Widget color",
    position: "Position",
    positionDesc: "Widget placement",
    language: "Language",
    languageDesc: "Widget language",
    review: "Review",
    reviewDesc: "Create your site",
    nameYourSite: "Name your site",
    nameYourSiteDesc: "Enter a friendly name and the domain you want to embed the widget on.",
    siteName: "Site name",
    siteNamePlaceholder: "My Company Website",
    domainLabel: "Domain",
    domainPlaceholder: "example.com",
    domainHint: "Without protocol \u2014 e.g.",
    dnsChecking: "Checking DNS\u2026",
    dnsValid: "DNS records found",
    dnsInvalid: "No DNS records found for this domain. Please check the domain name.",
    dnsError: "Could not verify DNS. Please check the domain name.",
    chooseBrandColor: "Choose your brand color",
    chooseBrandColorDesc: "This color will be used for the widget button and accents.",
    presets: "Presets",
    widgetButtonPreview: "Widget button preview",
    widgetPosition: "Widget position",
    widgetPositionDesc: "Choose where the widget button appears on your site.",
    chooseLanguage: "Choose language",
    chooseLanguageDesc: "The widget supports 41 languages. Select the default.",
    languageChangeHint: "You can change this later in widget settings.",
    reviewAndCreate: "Review and create",
    reviewAndCreateDesc: "Everything looks good? Click Create site to finish.",
    createSite: "Create site",
    creating: "Creating\u2026",
    continue: "Continue",
    back: "Back",
    cancelLabel: "Cancel",
    viewUpgradeOptions: "View upgrade options \u2192",
    widgetLanguageCount: "41 languages",
  },
  positions: {
    topLeft: "Top Left",
    topRight: "Top Right",
    bottomLeft: "Bottom Left",
    bottomRight: "Bottom Right",
  },
  verification: {
    verifyEmail: "Verify your email",
    unlockFeatures: "to unlock all features. Check your inbox at",
    checkInbox: "Sent! Check your inbox.",
    sent: "Sent!",
    resend: "Resend email",
    sending: "Sending\u2026",
    dismiss: "Dismiss",
  },
  cookie: {
    message: "We use cookies for authentication only \u2014 no tracking, no advertising, no third-party analytics.",
    privacyPolicy: "Privacy Policy",
    accept: "Got it",
  },
  config: {
    embedCode: "Embed Code",
    copy: "Copy",
    copied: "Copied!",
    siteConfiguration: "Site Configuration",
    languageLabel: "Language",
    widgetAppearance: "Widget Appearance",
    primaryColor: "Primary color",
    buttonSize: "Button size",
    buttonSizeSmall: "Small",
    buttonSizeMedium: "Medium",
    buttonSizeLarge: "Large",
    buttonType: "Button type",
    widgetPositionLabel: "Widget position",
    saveChanges: "Save Changes",
    savingChanges: "Saving\u2026",
    savedLabel: "Saved!",
    dangerZone: "Danger Zone",
    dangerZoneDesc: "Permanently delete this site and all its data.",
    deleteSite: "Delete site",
    accessibilityStatementUrl: "Accessibility statement URL",
    domainLabel: "Domain",
    domainSave: "Save",
    domainSaving: "Saving\u2026",
    domainCancel: "Cancel",
    domainHint: "You can paste a full URL \u2014 the protocol will be stripped automatically.",
    domainEmpty: "Domain cannot be empty.",
    domainNetworkError: "Network error.",
    domainClickToChange: "Click to change domain",
    dnsChecking: "Checking DNS\u2026",
    dnsValid: "DNS records found",
    dnsInvalid: "No DNS records found for this domain. Please check the domain name.",
    dnsError: "Could not verify DNS. Please check the domain name.",
  },
};

const tr: DashboardMessages = {
  nav: {
    sites: "Web Sitelerim",
    settings: "Ayarlar",
    pricing: "Fiyatland\u0131rma",
    statistics: "\u0130statistikler",
    customize: "\u00D6zelle\u015Ftir",
    analytics: "Analitik",
    wcagScan: "WCAG Tarama",
    statement: "Beyanname",
    notifications: "Bildirimler",
    deleteSite: "Siteyi Sil",
    newSite: "Yeni Site",
  },
  header: {
    signOut: "\u00C7\u0131k\u0131\u015F yap",
    signingOut: "\u00C7\u0131k\u0131l\u0131yor\u2026",
    toggleMenu: "Men\u00FCy\u00FC a\u00E7/kapat",
  },
  langSwitcher: { label: "Dil" },
  auth: {
    email: "E-posta adresi",
    password: "\u015Eifre",
    fullName: "Ad Soyad",
    currentPassword: "Mevcut \u015Fifre",
    newPassword: "Yeni \u015Fifre",
    confirmPassword: "Yeni \u015Fifreyi onayla",
    signIn: "Giri\u015F yap",
    signingIn: "Giri\u015F yap\u0131l\u0131yor\u2026",
    signUp: "Kay\u0131t ol",
    forgotPassword: "\u015Eifrenizi mi unuttunuz?",
    sendResetLink: "S\u0131f\u0131rlama ba\u011Flant\u0131s\u0131 g\u00F6nder",
    sendingResetLink: "G\u00F6nderiliyor\u2026",
    setNewPassword: "Yeni \u015Fifre belirle",
    updatingPassword: "G\u00FCncelleniyor\u2026",
    createAccount: "\u00DCcretsiz hesap olu\u015Ftur",
    creatingAccount: "Hesap olu\u015Fturuluyor\u2026",
    backToSignIn: "Giri\u015Fe d\u00F6n",
    noAccount: "Hesab\u0131n\u0131z yok mu?",
    haveAccount: "Zaten hesab\u0131n\u0131z var m\u0131?",
    rememberPassword: "Hat\u0131rlad\u0131n\u0131z m\u0131?",
    signUpFree: "\u00DCcretsiz kay\u0131t ol",
    welcomeBack: "Tekrar ho\u015F geldiniz",
    welcomeBackDesc: "Eri\u015Filebilir sitelerinizi y\u00F6netmek i\u00E7in giri\u015F yap\u0131n.",
    passwordResetSuccess: "\u015Eifre ba\u015Far\u0131yla g\u00FCncellendi. Yeni \u015Fifrenizle giri\u015F yap\u0131n.",
    createYourAccount: "Hesab\u0131n\u0131z\u0131 olu\u015Fturun",
    createAccountDesc: "Daima \u00FCcretsiz. Kredi kart\u0131 gerekmez.",
    forgotPasswordTitle: "\u015Eifrenizi mi unuttunuz?",
    forgotPasswordDesc: "E-postan\u0131z\u0131 girin, size bir s\u0131f\u0131rlama ba\u011Flant\u0131s\u0131 g\u00F6nderelim.",
    checkInbox: "Gelen kutunuzu kontrol edin",
    checkInboxDesc: "S\u0131f\u0131rlama ba\u011Flant\u0131s\u0131 g\u00F6nderildi:",
    resetLinkExpiry: "Ba\u011Flant\u0131 1 saat i\u00E7inde ge\u00E7erlili\u011Fini yitirir.",
    setNewPasswordTitle: "Yeni \u015Fifre belirle",
    setNewPasswordDesc: "En az 8 karakter olmal\u0131d\u0131r.",
    strongPasswordTitle: "G\u00FC\u00E7l\u00FC bir yeni \u015Fifre belirleyin.",
    strongPasswordDesc: "Hesab\u0131n\u0131z\u0131 g\u00FCvende tutmak i\u00E7in daha \u00F6nce kullanmad\u0131\u011F\u0131n\u0131z bir \u015Fifre se\u00E7in.",
    secureRecovery: "G\u00FCvenli hesap kurtarma.",
    secureRecoveryDesc: "H\u0131zl\u0131ca tekrar eri\u015Fim sa\u011Flaman\u0131z i\u00E7in size g\u00FCvenli bir ba\u011Flant\u0131 g\u00F6nderece\u011Fiz.",
    minChars: "En az 8 karakter olmal\u0131d\u0131r.",
    agreeTerms: "Kay\u0131t olarak kabul ediyorsunuz:",
    terms: "Kullan\u0131m Ko\u015Fullar\u0131",
    privacyPolicy: "Gizlilik Politikas\u0131",
    and: "ve",
    loginFailed: "Giri\u015F ba\u015Far\u0131s\u0131z",
    registrationFailed: "Kay\u0131t ba\u015Far\u0131s\u0131z",
    resetFailed: "S\u0131f\u0131rlama ba\u015Far\u0131s\u0131z. Ba\u011Flant\u0131n\u0131n s\u00FCresi dolmu\u015F olabilir.",
    invalidToken: "Ge\u00E7ersiz veya eksik s\u0131f\u0131rlama jetonu. L\u00FCtfen yeni bir ba\u011Flant\u0131 isteyin.",
    continueWithGoogle: "Google ile devam et",
    continueWithGithub: "GitHub ile devam et",
    orContinueWithEmail: "veya e-posta ile devam et",
    redirecting: "Y\u00F6nlendiriliyor\u2026",
  },
  authFeatures: {
    oneScriptTag: "Tek script etiketi \u2014 dakikalar i\u00E7inde haz\u0131r",
    accessibilityFeatures: "24 ger\u00E7ek eri\u015Filebilirlik \u00F6zelli\u011Fi",
    languages: "RTL dahil 41 dil",
    wcagReady: "WCAG 2.1 AA ve EAA 2025 uyumlu",
  },
  authStats: {
    features: "Eri\u015Filebilirlik \u00F6zellikleri",
    languages: "Dil",
    bundleSize: "Paket boyutu",
  },
  authTips: {
    checkSpam: "\u0130stenmeyen veya \u00F6nemsiz posta klas\u00F6r\u00FCn\u00FCz\u00FC kontrol edin",
    resetLinkValid: "S\u0131f\u0131rlama ba\u011Flant\u0131s\u0131 1 saat ge\u00E7erlidir",
    strongPassword: "G\u00FC\u00E7l\u00FC ve benzersiz bir \u015Fifre kullan\u0131n",
    useEightChars: "En az 8 karakter kullan\u0131n",
    mixCharacters: "Harf, rakam ve sembol kar\u0131\u015Ft\u0131r\u0131n",
    avoidReuse: "Eski \u015Fifreleri tekrar kullanmay\u0131n",
  },
  authTestimonial: {
    quote: "\u201C3 dakikada kurduk. Eri\u015Filebilirlik puanl\u0131m\u0131z D\u2019den A\u2019ya y\u00FCkseldi.\u201D",
    name: "Maria V.",
    role: "Frontend Lider, AB SaaS",
  },
  authBrand: {
    makeAccessible: "Web sitenizi herkes i\u00E7in\neri\u015Filebilir yap\u0131n.",
    makeAccessibleDesc: "5 dakikadan k\u0131sa s\u00FCrede herhangi bir siteye ger\u00E7ek eri\u015Filebilirlik \u00F6zellikleri ekleyin.",
    joinSites: "Web\u2019i kapsay\u0131c\u0131 yapan\nbinlerce siteye kat\u0131l\u0131n.",
    joinSitesDesc: "Daima \u00FCcretsiz plan. Kredi kart\u0131 gerekmez. 5 dakikadan k\u0131sa s\u00FCrede haz\u0131r.",
    standards: "Standartlar",
  },
  settings: {
    title: "Hesap",
    titleDesc: "Profil ve hesap ayarlar\u0131n\u0131z\u0131 y\u00F6netin.",
    account: "Hesap",
    profile: "Profil",
    changePassword: "\u015Eifre De\u011Fi\u015Ftir",
    billing: "Faturalama",
    auditLog: "Denetim G\u00FCnl\u00FC\u011F\u00FC",
    exportData: "Verilerinizi D\u0131\u015Fa Aktar\u0131n",
    exportDataDesc: "Hakk\u0131n\u0131zda tuttu\u011Fumuz t\u00FCm ki\u015Fisel verilerin bir kopyas\u0131n\u0131 indirin \u2014 profiliniz, siteleriniz ve API anahtarlar\u0131n\u0131z. Bu, KVKK veri ta\u015F\u0131nabilirlik hakk\u0131n\u0131z\u0131 kar\u015F\u0131lar.",
    downloadExport: "Veri d\u0131\u015Fa aktar\u0131m\u0131n\u0131 indir (JSON)",
    deleteAccount: "Hesab\u0131 Sil",
    deleteAccountDesc: "Hesab\u0131n\u0131z\u0131, t\u00FCm sitelerinizi, analitik verilerinizi kal\u0131c\u0131 olarak silin ve aboneli\u011Finizi iptal edin. Bu i\u015Flem geri al\u0131namaz.",
    deleteAccountConfirm: "Onaylamak i\u00E7in <strong>delete</strong> yaz\u0131n:",
    deleteAccountPermanent: "Hesab\u0131 kal\u0131c\u0131 olarak sil",
    deleting: "Siliniyor\u2026",
    save: "Kaydet",
    saving: "Kaydediliyor\u2026",
    saved: "Kaydedildi",
    updating: "G\u00FCncelleniyor\u2026",
    changePasswordBtn: "\u015Eifreyi de\u011Fi\u015Ftir",
    passwordUpdated: "\u015Eifre g\u00FCncellendi",
    cancel: "\u0130ptal",
    dangerZone: "Tehlikeli B\u00F6lge",
    name: "Ad",
    emailAddress: "E-posta adresi",
    emailChangeHint: "E-posta adresinizi de\u011Fi\u015Ftirmek i\u00E7in destekle ileti\u015Fime ge\u00E7in.",
    typeDeleteConfirm: "delete",
  },
  dashboard: {
    title: "Web Sitelerim",
    newSite: "Yeni site",
    noSites: "Hen\u00FCz site yok",
    noSitesDesc: "Alan ad\u0131n\u0131z\u0131 kay\u0131t edin ve bir g\u00F6mme kodu al\u0131n. Eri\u015Filebilirlik widget\u0027\u0131n\u0131z 5 dakikadan k\u0131sa s\u00FCrede yay\u0131na girer.",
    noSitesAction: "\u0130lk sitenizi ekleyin",
    noSitesHint: "Ba\u015Flamak i\u00E7in ilk sitenizi ekleyin.",
    siteConnected: "site ba\u011Fl\u0131",
    sitesConnected: "site ba\u011Fl\u0131",
    totalSites: "Toplam site",
    widgetOpens: "Widget a\u00E7\u0131l\u0131\u015Flar\u0131",
    liveSites: "Aktif siteler",
    open: "A\u00E7",
  },
  sites: {
    health: "Durum",
    domain: "Alan Ad\u0131",
    name: "Ad",
    opens: "Widget a\u00E7\u0131l\u0131\u015Flar\u0131",
    wcagScore: "WCAG puan\u0131",
  },
  siteHealth: {
    notScanned: "Taranmad\u0131",
    perfect: "M\u00FCkemmel",
    good: "\u0130yi",
    fair: "Orta",
    needsWork: "Geli\u015Ftirmeli",
    live: "Aktif",
    offline: "\u00C7evrimd\u0131\u015F\u0131",
    checking: "Kontrol ediliyor",
  },
  wizard: {
    siteInfo: "Site Bilgileri",
    siteInfoDesc: "Ad ve alan ad\u0131",
    brandColor: "Marka Rengi",
    brandColorDesc: "Widget rengi",
    position: "Konum",
    positionDesc: "Widget yerle\u015Fimi",
    language: "Dil",
    languageDesc: "Widget dili",
    review: "\u0130nceleme",
    reviewDesc: "Sitenizi olu\u015Fturun",
    nameYourSite: "Sitenize ad verin",
    nameYourSiteDesc: "Kolay bir ad ve widget\u0027\u0131 g\u00F6mmek istedi\u011Finiz alan ad\u0131n\u0131 girin.",
    siteName: "Site ad\u0131",
    siteNamePlaceholder: "\u015Eirketim Web Sitesi",
    domainLabel: "Alan ad\u0131",
    domainPlaceholder: "ornek.com",
    domainHint: "Protokol olmadan \u2014 \u00F6rne\u011Fin",
    dnsChecking: "DNS kontrol ediliyor\u2026",
    dnsValid: "DNS kay\u0131tlar\u0131 bulundu",
    dnsInvalid: "Bu alan ad\u0131 i\u00E7in DNS kayd\u0131 bulunamad\u0131. L\u00FCtfen alan ad\u0131n\u0131 kontrol edin.",
    dnsError: "DNS do\u011Frulanamad\u0131. L\u00FCtfen alan ad\u0131n\u0131 kontrol edin.",
    chooseBrandColor: "Marka renginizi se\u00E7in",
    chooseBrandColorDesc: "Bu renk widget d\u00FC\u011Fmesi ve vurgular i\u00E7in kullan\u0131lacakt\u0131r.",
    presets: "\u00D6n ayarlar",
    widgetButtonPreview: "Widget d\u00FC\u011Fme \u00F6nizleme",
    widgetPosition: "Widget konumu",
    widgetPositionDesc: "Widget d\u00FC\u011Fmesinin sitenizde nerede g\u00F6r\u00FCnece\u011Fini se\u00E7in.",
    chooseLanguage: "Dil se\u00E7in",
    chooseLanguageDesc: "Widget 41 dili destekler. Varsay\u0131lan\u0131 se\u00E7in.",
    languageChangeHint: "Bunu daha sonra widget ayarlar\u0131ndan de\u011Fi\u015Ftirebilirsiniz.",
    reviewAndCreate: "\u0130ncele ve olu\u015Ftur",
    reviewAndCreateDesc: "Her \u015Fey iyi g\u00F6r\u00FCn\u00FCyor mu? Bitirmek i\u00E7in Site olu\u015Ftur\u2019a t\u0131klay\u0131n.",
    createSite: "Site olu\u015Ftur",
    creating: "Olu\u015Fturuluyor\u2026",
    continue: "Devam",
    back: "Geri",
    cancelLabel: "\u0130ptal",
    viewUpgradeOptions: "Y\u00FCkseltme se\u00E7eneklerini g\u00F6r \u2192",
    widgetLanguageCount: "41 dil",
  },
  positions: {
    topLeft: "Sol \u00DCst",
    topRight: "Sa\u011F \u00DCst",
    bottomLeft: "Sol Alt",
    bottomRight: "Sa\u011F Alt",
  },
  verification: {
    verifyEmail: "E-postan\u0131z\u0131 do\u011Frulay\u0131n",
    unlockFeatures: "t\u00FCm \u00F6zelliklerin kilidini a\u00E7mak i\u00E7in. Gelen kutunuzu kontrol edin:",
    checkInbox: "G\u00F6nderildi! Gelen kutunuzu kontrol edin.",
    sent: "G\u00F6nderildi!",
    resend: "Tekrar g\u00F6nder",
    sending: "G\u00F6nderiliyor\u2026",
    dismiss: "Kapat",
  },
  cookie: {
    message: "\u00C7erezleri yaln\u0131zca kimlik do\u011Frulama i\u00E7in kullan\u0131yoruz \u2014 izleme, reklam veya \u00FC\u00E7\u00FCnc\u00FC taraf analiti\u011Fi yok.",
    privacyPolicy: "Gizlilik Politikas\u0131",
    accept: "Anla\u015F\u0131ld\u0131",
  },
  config: {
    embedCode: "G\u00F6mme Kodu",
    copy: "Kopyala",
    copied: "Kopyaland\u0131!",
    siteConfiguration: "Site Yap\u0131land\u0131rmas\u0131",
    languageLabel: "Dil",
    widgetAppearance: "Widget G\u00F6r\u00FCn\u00FCm\u00FC",
    primaryColor: "Ana renk",
    buttonSize: "D\u00FC\u011Fme boyutu",
    buttonSizeSmall: "K\u00FC\u00E7\u00FCk",
    buttonSizeMedium: "Orta",
    buttonSizeLarge: "B\u00FCy\u00FCk",
    buttonType: "D\u00FC\u011Fme tipi",
    widgetPositionLabel: "Widget konumu",
    saveChanges: "De\u011Fi\u015Fiklikleri Kaydet",
    savingChanges: "Kaydediliyor\u2026",
    savedLabel: "Kaydedildi!",
    dangerZone: "Tehlikeli B\u00F6lge",
    dangerZoneDesc: "Bu siteyi ve t\u00FCm verilerini kal\u0131c\u0131 olarak silin.",
    deleteSite: "Siteyi sil",
    accessibilityStatementUrl: "Eri\u015Filebilirlik beyannamesi URL\u2019si",
    domainLabel: "Alan ad\u0131",
    domainSave: "Kaydet",
    domainSaving: "Kaydediliyor\u2026",
    domainCancel: "\u0130ptal",
    domainHint: "Tam URL yapabilirsiniz \u2014 protokol otomatik olarak kald\u0131r\u0131l\u0131r.",
    domainEmpty: "Alan ad\u0131 bo\u015F olamaz.",
    domainNetworkError: "A\u011F hatas\u0131.",
    domainClickToChange: "Alan ad\u0131n\u0131 de\u011Fi\u015Ftirmek i\u00E7in t\u0131klay\u0131n",
    dnsChecking: "DNS kontrol ediliyor\u2026",
    dnsValid: "DNS kay\u0131tlar\u0131 bulundu",
    dnsInvalid: "Bu alan ad\u0131 i\u00E7in DNS kayd\u0131 bulunamad\u0131. L\u00FCtfen alan ad\u0131n\u0131 kontrol edin.",
    dnsError: "DNS do\u011Frulanamad\u0131. L\u00FCtfen alan ad\u0131n\u0131 kontrol edin.",
  },
};

const messages: Record<Locale, DashboardMessages> = { en, tr };

export function getMessages(locale: string): DashboardMessages {
  const key = SUPPORTED_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  return messages[key];
}
