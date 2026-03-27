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
  theme: {
    switchToLight: string;
    switchToDark: string;
  };
  notifications: {
    label: string;
    unreadCount: string;
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
    somethingWentWrong: string;
    validEmail: string;
    passwordRequired: string;
    nameMinChars: string;
    nameMaxChars: string;
    currentPasswordRequired: string;
    passwordMinChars: string;
    passwordsDoNotMatch: string;
    minCharsPlaceholder: string;
    repeatPasswordPlaceholder: string;
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
    typeToConfirm: string;
    failedToUpdateName: string;
    failedToChangePassword: string;
    failedToDeleteAccount: string;
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
    triggerButtonPreview: string;
    buttonSizeMini: string;
    buttonSizeRegular: string;
  };
  errors: {
    somethingWentWrong: string;
    unexpectedError: string;
    errorId: string;
    tryAgain: string;
    goToDashboard: string;
    pageNotFound: string;
    pageNotFoundDesc: string;
    backToDashboard: string;
    home: string;
    dashboardError: string;
    dashboardErrorDesc: string;
  };
  banned: {
    title: string;
    description: string;
    contactSupport: string;
  };
  notificationsPage: {
    title: string;
    markAllRead: string;
    filterAll: string;
    filterUnread: string;
    noUnread: string;
    noNotifications: string;
    viewAll: string;
    allCaughtUp: string;
    loading: string;
    previous: string;
    next: string;
    pageOf: string;
    total: string;
  };
  timeAgo: {
    justNow: string;
    minutesAgo: string;
    hoursAgo: string;
    daysAgo: string;
  };
  auditLog: {
    title: string;
    description: string;
    entries: string;
    noActivity: string;
    siteCreated: string;
    siteRenamed: string;
    siteDeleted: string;
    configUpdated: string;
    apiKeyCreated: string;
    apiKeyRevoked: string;
    webhookCreated: string;
    webhookDeleted: string;
  };
  billing: {
    title: string;
    description: string;
    currentSubscription: string;
    plan: string;
    daysLeft: string;
    renewsOn: string;
    accessUntil: string;
    freeTrialDaysRemaining: string;
    freeTrialExpiredSubscribe: string;
    noActiveSubscription: string;
    manageBilling: string;
    cancelSubscription: string;
    cancelSubscriptionTitle: string;
    cancelSubscriptionDesc: string;
    canceling: string;
    yesCancel: string;
    keepPlan: string;
    statusLabel: string;
    billingLabel: string;
    periodStart: string;
    statusActive: string;
    statusTrial: string;
    statusPaymentOverdue: string;
    statusCanceled: string;
    statusCanceling: string;
    intervalAnnual: string;
    intervalMonthly: string;
    intervalYearly: string;
    freeTrialEnded: string;
    freeTrialEndedDesc: string;
    choosePlan: string;
    choosePlanDesc: string;
    mostPopular: string;
    currentBadge: string;
    currentPlan: string;
    getStarted: string;
    perYear: string;
    perMonth: string;
    save: string;
    redirecting: string;
    planSmallDesc: string;
    planMediumDesc: string;
    planLargeDesc: string;
    planNameFree: string;
    planNameSmall: string;
    planNameMedium: string;
    planNameLarge: string;
    featurePageviews: string;
    featureWebsites: string;
    featureWcagScan: string;
    featureAutoFixes: string;
    featureRealTimeMonitoring: string;
    featureContinuousMonitoring: string;
    featureFreeTrial: string;
    featurePriorityEmail: string;
    featureAutoTranslation: string;
    featureCustomBranding: string;
    featurePriorityPhoneEmail: string;
    cancellationFailed: string;
    upgradeTo: string;
    monthly: string;
    annual: string;
    save17: string;
    checkoutFailed: string;
  };
  deleteSitePage: {
    breadcrumbDelete: string;
    title: string;
    cannotBeUndone: string;
    aboutToDelete: string;
    andAllData: string;
    dataWillBeDeleted: string;
    siteConfigWidget: string;
    allAnalyticsEvents: string;
    widgetLoadHistory: string;
    wcagScanResults: string;
    confirmDelete: string;
    cancel: string;
  };
  scanner: {
    title: string;
    description: string;
    scanning: string;
    runScan: string;
    scanningHint: string;
    networkError: string;
    complianceScore: string;
    excellent: string;
    good: string;
    fair: string;
    needsWork: string;
    violations: string;
    violation: string;
    checksPassed: string;
    scanned: string;
    critical: string;
    serious: string;
    moderate: string;
    minor: string;
    criticalLabel: string;
    criticalDesc: string;
    warningLabel: string;
    warningDesc: string;
    scoreSimulation: string;
    scoreSimulationDesc: string;
    breakdownBySeverity: string;
    violationsSorted: string;
    allChecksPassed: string;
    allChecksPassedDesc: string;
    affectedElements: string;
    wcagDocument: string;
    instances: string;
  };
  statement: {
    hostedTitle: string;
    hostedDesc: string;
    copyUrl: string;
    copied: string;
    preview: string;
    hidePreview: string;
    eaaTitle: string;
    eaaDesc: string;
    detailsTitle: string;
    contactName: string;
    contactEmail: string;
    conformanceLevel: string;
    reviewDate: string;
    knownLimitations: string;
    knownLimitationsPlaceholder: string;
    downloadHtml: string;
    linkInWidget: string;
    linkInWidgetDesc: string;
    statementUrl: string;
    saveUrl: string;
    saving: string;
    saved: string;
    lastScanNoViolations: string;
    lastScanViolations: string;
    // Public hosted statement page
    publicTitle: string;
    appliesTo: string;
    lastReviewed: string;
    ourCommitmentTitle: string;
    ourCommitmentBody: string;
    conformanceStatusTitle: string;
    conformanceStatusBody: string;
    complianceWorkBegan: string;
    statusNoteNotScanned: string;
    statusNoteNoViolationsPublic: string;
    statusNoteViolationsPublic: string;
    technicalSpecificationsTitle: string;
    technicalSpecificationsBody: string;
    widgetNote: string;
    feedbackAndContactTitle: string;
    feedbackAndContactBody: string;
  };
  adminUsers: {
    badge: string;
    title: string;
    searchPlaceholder: string;
    search: string;
    clear: string;
    colUser: string;
    colPlan: string;
    colVerified: string;
    colJoined: string;
    colChangePlan: string;
    colStatus: string;
    yes: string;
    no: string;
    banned: string;
    active: string;
    noUsersFound: string;
  };
  analytics: {
    lastDays: string;
    exportCsv: string;
    widgetLoads: string;
    widgetOpens: string;
    uniqueSessions: string;
    featureActivations: string;
    dailyEvents: string;
    noEventsYet: string;
    featureAdoption: string;
    ofUniqueSessions: string;
    noFeatureActivations: string;
    feature: string;
    sessions: string;
    adoption: string;
    embedDomains: string;
    embedDomainsDesc: string;
    noDomainLoads: string;
    domain: string;
    loads: string;
    lastSeen: string;
    recentEvents: string;
    showingOf: string;
    exportAll: string;
    event: string;
    time: string;
  };
  siteTabs: {
    config: string;
    analytics: string;
    wcagScan: string;
    statement: string;
  };
  configTabs: {
    general: string;
    featuresAndProfiles: string;
  };
  featuresTab: {
    accessibilityProfiles: string;
    ofEnabled: string;
    saveChanges: string;
    saving: string;
    saved: string;
    vision: string;
    reading: string;
    motor: string;
    calm: string;
    failedToSave: string;
    networkError: string;
  };
  statisticsPage: {
    title: string;
    subtitle: string;
    widgetLoads: string;
    widgetOpens: string;
    uniqueSessions: string;
    featureActivations: string;
    engagementRate: string;
    opensLoads: string;
    featureUsage: string;
    featureUsageDesc: string;
    last30Days: string;
    profileUsage: string;
    profileUsageDesc: string;
    featureTextResizing: string;
    featureTextAlign: string;
    featureReadingGuide: string;
    featureTextSpacing: string;
    featureScreenReader: string;
    featureDyslexiaFont: string;
    featureReadingMask: string;
    featureCursorEnhancement: string;
    featureHighlightLinks: string;
    featureFocusHighlight: string;
    featurePauseAnimations: string;
    featureColorBlindMode: string;
    featureMuteMedia: string;
    featureSkipNavigation: string;
    featureSaturation: string;
    featureKeyboardNavigation: string;
    featureLargeClickTargets: string;
    featureBlueLightFilter: string;
    featureHideImages: string;
    featureDarkMode: string;
    featureContentMagnifier: string;
    featureSlowCursor: string;
    featureLineHeight: string;
    featureHighlightTitles: string;
    profileAdhd: string;
    profileBlind: string;
    profileLowVision: string;
    profileColorBlind: string;
    profileDyslexia: string;
    profileMotorImpaired: string;
  };
  referral: {
    title: string;
    description: string;
    copyLink: string;
    copied: string;
    yourCode: string;
    referrals: string;
  };
  installChecker: {
    checking: string;
    checkInstallation: string;
    widgetDetected: string;
    widgetNotDetected: string;
    couldNotReach: string;
  };
  siteName: {
    saving: string;
    save: string;
    cancel: string;
    nameLengthError: string;
    networkError: string;
    clickToRename: string;
  };
  breadcrumb: {
    dashboard: string;
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
  theme: {
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
  },
  notifications: {
    label: "Notifications",
    unreadCount: "{count} unread",
  },
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
    passwordResetSuccess:
      "Password updated successfully. Sign in with your new password.",
    createYourAccount: "Create your account",
    createAccountDesc: "Free forever. No credit card required.",
    forgotPasswordTitle: "Forgot password?",
    forgotPasswordDesc:
      "Enter your email and we\u2019ll send you a reset link.",
    checkInbox: "Check your inbox",
    checkInboxDesc: "We sent a reset link to",
    resetLinkExpiry: "The link expires in 1 hour.",
    setNewPasswordTitle: "Set new password",
    setNewPasswordDesc: "Must be at least 8 characters.",
    strongPasswordTitle: "Set a strong new password.",
    strongPasswordDesc:
      "Choose a password you haven\u2019t used before to keep your account secure.",
    secureRecovery: "Secure account recovery.",
    secureRecoveryDesc:
      "We\u2019ll email you a secure link so you can regain access quickly.",
    minChars: "Must be at least 8 characters.",
    agreeTerms: "By signing up you agree to our",
    terms: "Terms",
    privacyPolicy: "Privacy Policy",
    and: "and",
    loginFailed: "Login failed",
    registrationFailed: "Registration failed",
    resetFailed: "Reset failed. The link may have expired.",
    invalidToken:
      "Invalid or missing reset token. Please request a new reset link.",
    continueWithGoogle: "Continue with Google",
    continueWithGithub: "Continue with GitHub",
    orContinueWithEmail: "or continue with email",
    redirecting: "Redirecting\u2026",
    somethingWentWrong: "Something went wrong",
    validEmail: "Please enter a valid email address",
    passwordRequired: "Password is required",
    nameMinChars: "Name must be at least 2 characters",
    nameMaxChars: "Maximum 100 characters",
    currentPasswordRequired: "Current password is required",
    passwordMinChars: "Password must be at least 8 characters",
    passwordsDoNotMatch: "Passwords do not match",
    minCharsPlaceholder: "Min. 8 characters",
    repeatPasswordPlaceholder: "Repeat new password",
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
    quote:
      "\u201CSet up in 3 minutes. Our accessibility score went from D to A.\u201D",
    name: "Maria V.",
    role: "Frontend Lead, EU SaaS",
  },
  authBrand: {
    makeAccessible: "Make your website\naccessible to everyone.",
    makeAccessibleDesc:
      "Add real accessibility features to any site in under 5 minutes.",
    joinSites: "Join thousands of sites\nmaking the web inclusive.",
    joinSitesDesc:
      "Free plan forever. No credit card required. Up and running in under 5 minutes.",
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
    exportDataDesc:
      "Download a copy of all personal data we hold about you \u2014 your profile, sites, and API keys. This satisfies your GDPR Article 20 right to data portability.",
    downloadExport: "Download data export (JSON)",
    deleteAccount: "Delete Account",
    deleteAccountDesc:
      "Permanently delete your account, all sites, analytics data, and cancel your subscription. This cannot be undone.",
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
    typeToConfirm: "Type",
    failedToUpdateName: "Failed to update name",
    failedToChangePassword: "Failed to change password",
    failedToDeleteAccount: "Failed to delete account",
  },
  dashboard: {
    title: "My Websites",
    newSite: "New site",
    noSites: "No sites yet",
    noSitesDesc:
      "Register your domain and get an embed snippet. Your accessibility widget goes live in under 5 minutes.",
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
    nameYourSiteDesc:
      "Enter a friendly name and the domain you want to embed the widget on.",
    siteName: "Site name",
    siteNamePlaceholder: "My Company Website",
    domainLabel: "Domain",
    domainPlaceholder: "example.com",
    domainHint: "Without protocol \u2014 e.g.",
    dnsChecking: "Checking DNS\u2026",
    dnsValid: "DNS records found",
    dnsInvalid:
      "No DNS records found for this domain. Please check the domain name.",
    dnsError: "Could not verify DNS. Please check the domain name.",
    chooseBrandColor: "Choose your brand color",
    chooseBrandColorDesc:
      "This color will be used for the widget button and accents.",
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
    message:
      "We use cookies for authentication only \u2014 no tracking, no advertising, no third-party analytics.",
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
    domainHint:
      "You can paste a full URL \u2014 the protocol will be stripped automatically.",
    domainEmpty: "Domain cannot be empty.",
    domainNetworkError: "Network error.",
    domainClickToChange: "Click to change domain",
    dnsChecking: "Checking DNS\u2026",
    dnsValid: "DNS records found",
    dnsInvalid:
      "No DNS records found for this domain. Please check the domain name.",
    dnsError: "Could not verify DNS. Please check the domain name.",
    triggerButtonPreview: "Trigger button preview",
    buttonSizeMini: "Mini",
    buttonSizeRegular: "Regular",
  },
  errors: {
    somethingWentWrong: "Something went wrong",
    unexpectedError: "An unexpected error occurred.",
    errorId: "Error ID:",
    tryAgain: "Try again",
    goToDashboard: "Go to dashboard",
    pageNotFound: "Page not found",
    pageNotFoundDesc:
      "The page you\u2019re looking for doesn\u2019t exist or has been moved.",
    backToDashboard: "Back to dashboard",
    home: "Home",
    dashboardError: "Something went wrong",
    dashboardErrorDesc:
      "An unexpected error occurred while loading this page. Please try again.",
  },
  banned: {
    title: "Account Suspended",
    description:
      "Your account has been suspended. If you believe this is a mistake, please contact our support team.",
    contactSupport: "Contact support",
  },
  notificationsPage: {
    title: "Notifications",
    markAllRead: "Mark all read",
    filterAll: "All",
    filterUnread: "Unread",
    noUnread: "No unread notifications",
    noNotifications: "No notifications yet",
    viewAll: "View all notifications",
    allCaughtUp: "All caught up",
    loading: "Loading\u2026",
    previous: "Previous",
    next: "Next",
    pageOf: "Page {page} of {pages}",
    total: "total",
  },
  timeAgo: {
    justNow: "just now",
    minutesAgo: "m ago",
    hoursAgo: "h ago",
    daysAgo: "d ago",
  },
  auditLog: {
    title: "Audit Log",
    description: "Last 100 actions on your account.",
    entries: "entries",
    noActivity: "No activity recorded yet.",
    siteCreated: "Site created",
    siteRenamed: "Site renamed",
    siteDeleted: "Site deleted",
    configUpdated: "Config updated",
    apiKeyCreated: "API key created",
    apiKeyRevoked: "API key revoked",
    webhookCreated: "Webhook created",
    webhookDeleted: "Webhook deleted",
  },
  billing: {
    title: "Billing",
    description: "Manage your subscription and payment details",
    currentSubscription: "Current subscription",
    plan: "Plan",
    daysLeft: "d left",
    renewsOn: "Renews",
    accessUntil: "Access until",
    freeTrialDaysRemaining: "Free trial \u2014 {days} day(s) remaining",
    freeTrialExpiredSubscribe:
      "Free trial expired \u2014 subscribe to continue",
    noActiveSubscription: "No active subscription",
    manageBilling: "Manage billing",
    cancelSubscription: "Cancel subscription",
    cancelSubscriptionTitle: "Cancel subscription?",
    cancelSubscriptionDesc:
      "You\u2019ll keep full access until {date}. After that, your account will move to the Free plan.",
    canceling: "Canceling\u2026",
    yesCancel: "Yes, cancel",
    keepPlan: "Keep plan",
    statusLabel: "Status",
    billingLabel: "Billing",
    periodStart: "Period start",
    statusActive: "Active",
    statusTrial: "Trial",
    statusPaymentOverdue: "Payment overdue",
    statusCanceled: "Canceled",
    statusCanceling: "Canceling",
    intervalAnnual: "Annual",
    intervalMonthly: "Monthly",
    intervalYearly: "Yearly",
    freeTrialEnded: "Your free trial has ended",
    freeTrialEndedDesc:
      "Subscribe to a plan below to continue using the accessibility widget on your sites.",
    choosePlan: "Choose a plan",
    choosePlanDesc: "Subscribe anytime \u2014 cancel at end of billing period",
    mostPopular: "Most Popular",
    currentBadge: "Current",
    currentPlan: "Current plan",
    getStarted: "Get started",
    perYear: "/year",
    perMonth: "/mo",
    save: "Save",
    redirecting: "Redirecting\u2026",
    planSmallDesc: "Perfect for small websites",
    planMediumDesc: "Growing businesses & agencies",
    planLargeDesc: "High-traffic & enterprise sites",
    planNameFree: "Free",
    planNameSmall: "Small",
    planNameMedium: "Medium",
    planNameLarge: "Large",
    featurePageviews: "Up to {count} pageviews/mo",
    featureWebsites: "Up to {count} websites",
    featureWcagScan: "Full WCAG 2.1 AA & AAA scanning",
    featureAutoFixes: "Automated auto-fixes",
    featureRealTimeMonitoring: "Real-time monitoring",
    featureContinuousMonitoring: "Continuous monitoring",
    featureFreeTrial: "7-day free trial",
    featurePriorityEmail: "Priority email support",
    featureAutoTranslation: "Auto page translation (41+ languages)",
    featureCustomBranding: "Custom branding",
    featurePriorityPhoneEmail: "Priority support (phone & email)",
    cancellationFailed: "Cancellation failed",
    upgradeTo: "Upgrade to {plan} \u2192",
    monthly: "Monthly",
    annual: "Annual",
    save17: "SAVE 17%",
    checkoutFailed: "Failed to start checkout",
  },
  deleteSitePage: {
    breadcrumbDelete: "Delete",
    title: "Delete site permanently",
    cannotBeUndone: "This action cannot be undone.",
    aboutToDelete: "You are about to permanently delete",
    andAllData: "and all associated data.",
    dataWillBeDeleted: "Data that will be deleted",
    siteConfigWidget: "Site configuration & widget settings",
    allAnalyticsEvents: "All analytics events",
    widgetLoadHistory: "Widget load history",
    wcagScanResults: "WCAG scan results",
    confirmDelete: "Yes, delete this site",
    cancel: "Cancel",
  },
  scanner: {
    title: "WCAG Accessibility Scan",
    description:
      "Checks the public HTML of any URL for common WCAG A and AA violations. The page must be publicly accessible.",
    scanning: "Scanning\u2026",
    runScan: "Run Scan",
    scanningHint:
      "Fetching and analyzing HTML \u2014 this can take up to 15 seconds for slow sites\u2026",
    networkError: "Network error \u2014 please try again",
    complianceScore: "Compliance Score",
    excellent: "Excellent",
    good: "Good",
    fair: "Fair",
    needsWork: "Needs work",
    violations: "violations",
    violation: "violation",
    checksPassed: "checks passed",
    scanned: "Scanned",
    critical: "Critical",
    serious: "Serious",
    moderate: "Moderate",
    minor: "Minor",
    criticalLabel: "Critical",
    criticalDesc: "Serious / Critical \u2014 WCAG AA failures",
    warningLabel: "Warning",
    warningDesc: "Moderate / Minor \u2014 best practice issues",
    scoreSimulation: "Score Simulation",
    scoreSimulationDesc:
      "Fix all {count} critical issue(s) \u2192 score improves from {from} to {to} (+{points} points)",
    breakdownBySeverity: "Breakdown by Severity",
    violationsSorted: "Violations (sorted by severity)",
    allChecksPassed: "All {count} checks passed",
    allChecksPassedDesc:
      "No detectable violations in the static HTML. Consider running a full browser-based audit with axe DevTools for dynamic content.",
    affectedElements: "Affected elements",
    wcagDocument: "WCAG {wcag} understanding document",
    instances: "instances",
  },
  statement: {
    hostedTitle: "Hosted Accessibility Statement",
    hostedDesc:
      "Inculva hosts your accessibility statement automatically \u2014 no self-hosting required. Copy the URL below and use it as your accessibilityStatementUrl in the widget config.",
    copyUrl: "Copy URL",
    copied: "Copied!",
    preview: "Preview",
    hidePreview: "Hide Preview",
    eaaTitle: "EAA Article 13 Compliance",
    eaaDesc:
      "The European Accessibility Act (EAA) requires all digital products and services to publish an accessibility statement. Generate one below, host it on your site, then paste the URL in the widget config to link it from your widget.",
    detailsTitle: "Statement Details",
    contactName: "Contact Name",
    contactEmail: "Contact Email",
    conformanceLevel: "Conformance Level",
    reviewDate: "Review Date",
    knownLimitations: "Known Limitations (optional)",
    knownLimitationsPlaceholder:
      "Describe any known accessibility barriers and your plan to fix them...",
    downloadHtml: "Download HTML",
    linkInWidget: "Link in Widget",
    linkInWidgetDesc:
      "After hosting the HTML file on your site (or using the hosted URL above), add the URL below so it appears as a link in the widget panel footer.",
    statementUrl: "Accessibility Statement URL",
    saveUrl: "Save URL",
    saving: "Saving\u2026",
    saved: "Saved!",
    lastScanNoViolations: "Last WCAG scan ({date}) found no violations.",
    lastScanViolations:
      "Last WCAG scan ({date}) found {count} potential violation(s). Consider resolving these before generating the statement.",
    publicTitle: "Accessibility Statement",
    appliesTo: "This statement applies to:",
    lastReviewed: "Last reviewed:",
    ourCommitmentTitle: "Our Commitment",
    ourCommitmentBody:
      "{siteName} is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.",
    conformanceStatusTitle: "Conformance Status",
    conformanceStatusBody:
      "We aim for WCAG 2.1 Level AA conformance, as defined by the Web Content Accessibility Guidelines (WCAG) 2.1. This meets the requirements of the European Accessibility Act (EAA) and EN 301 549.",
    complianceWorkBegan: "Compliance work began on:",
    statusNoteNotScanned:
      "An automated accessibility scan has not yet been performed.",
    statusNoteNoViolationsPublic:
      "The most recent automated WCAG scan found no violations.",
    statusNoteViolationsPublic:
      "The most recent automated WCAG scan found {count} potential violation(s). We are actively working to resolve them.",
    technicalSpecificationsTitle: "Technical Specifications",
    technicalSpecificationsBody:
      "This website relies on the following technologies for conformance:",
    widgetNote:
      "An accessibility widget (powered by Inculva) is embedded on this site to provide on-demand assistive features including text resizing, high contrast, dyslexia-friendly fonts, keyboard navigation, screen reader support, and more.",
    feedbackAndContactTitle: "Feedback and Contact",
    feedbackAndContactBody:
      "We welcome your feedback on the accessibility of {siteName}. If you experience accessibility barriers, please contact the site owner directly via {email}.",
  },
  adminUsers: {
    badge: "Admin",
    title: "Users",
    searchPlaceholder: "Search by email...",
    search: "Search",
    clear: "Clear",
    colUser: "User",
    colPlan: "Plan",
    colVerified: "Verified",
    colJoined: "Joined",
    colChangePlan: "Change Plan",
    colStatus: "Status",
    yes: "Yes",
    no: "No",
    banned: "Banned",
    active: "Active",
    noUsersFound: "No users found.",
  },
  analytics: {
    lastDays: "Last {days} Days",
    exportCsv: "Export CSV",
    widgetLoads: "Widget Loads",
    widgetOpens: "Widget Opens",
    uniqueSessions: "Unique Sessions",
    featureActivations: "Feature Activations",
    dailyEvents: "Daily Events ({days} days)",
    noEventsYet:
      "No events yet. Embed the widget on your site to start tracking.",
    featureAdoption: "Feature Adoption",
    ofUniqueSessions: "% of {count} unique sessions",
    noFeatureActivations: "No feature activations yet in the last {days} days.",
    feature: "Feature",
    sessions: "Sessions",
    adoption: "Adoption",
    embedDomains: "Embed Domains",
    embedDomainsDesc:
      "Domains that loaded your widget in the last {days} days.",
    noDomainLoads: "No domain loads recorded yet.",
    domain: "Domain",
    loads: "Loads",
    lastSeen: "Last Seen",
    recentEvents: "Recent Events",
    showingOf: "Showing {shown} of {total}",
    exportAll: "export all",
    event: "Event",
    time: "Time",
  },
  siteTabs: {
    config: "Config",
    analytics: "Analytics",
    wcagScan: "WCAG Scan",
    statement: "Statement",
  },
  configTabs: {
    general: "General",
    featuresAndProfiles: "Features & Profiles",
  },
  featuresTab: {
    accessibilityProfiles: "Accessibility Profiles",
    ofEnabled: "{count} of {total} enabled",
    saveChanges: "Save Changes",
    saving: "Saving\u2026",
    saved: "Saved!",
    vision: "Vision",
    reading: "Reading",
    motor: "Motor",
    calm: "Calm",
    failedToSave: "Failed to save \u2014 please try again",
    networkError: "Network error \u2014 please check your connection",
  },
  statisticsPage: {
    title: "Statistics",
    subtitle: "Last 30 days across all your sites",
    widgetLoads: "Widget Loads",
    widgetOpens: "Widget Opens",
    uniqueSessions: "Unique Sessions",
    featureActivations: "Feature Activations",
    engagementRate: "Widget engagement rate",
    opensLoads: "opens / loads",
    featureUsage: "Feature usage",
    featureUsageDesc:
      "Unique sessions that activated each feature in the last 30 days",
    last30Days: "Last 30 days",
    profileUsage: "Accessibility profile usage",
    profileUsageDesc: "One-click profile activations in the last 30 days",
    featureTextResizing: "Text Resizing",
    featureTextAlign: "Text Alignment",
    featureReadingGuide: "Reading Guide",
    featureTextSpacing: "Text Spacing",
    featureScreenReader: "Screen Reader",
    featureDyslexiaFont: "Dyslexia Font",
    featureReadingMask: "Reading Mask",
    featureCursorEnhancement: "Cursor Enhancement",
    featureHighlightLinks: "Highlight Links",
    featureFocusHighlight: "Focus Highlight",
    featurePauseAnimations: "Pause Animations",
    featureColorBlindMode: "Color Blind Mode",
    featureMuteMedia: "Mute Media",
    featureSkipNavigation: "Skip Navigation",
    featureSaturation: "Saturation",
    featureKeyboardNavigation: "Keyboard Navigation",
    featureLargeClickTargets: "Large Click Targets",
    featureBlueLightFilter: "Blue Light Filter",
    featureHideImages: "Hide Images",
    featureDarkMode: "Dark Mode",
    featureContentMagnifier: "Content Magnifier",
    featureSlowCursor: "Slow Cursor",
    featureLineHeight: "Line Height",
    featureHighlightTitles: "Highlight Titles",
    profileAdhd: "ADHD",
    profileBlind: "Blind",
    profileLowVision: "Low Vision",
    profileColorBlind: "Color Blind",
    profileDyslexia: "Dyslexia",
    profileMotorImpaired: "Motor Impaired",
  },
  referral: {
    title: "Refer & Earn",
    description:
      "Share your unique link. Every friend who signs up is counted toward your referrals.",
    copyLink: "Copy link",
    copied: "Copied!",
    yourCode: "Your code",
    referrals: "Referrals",
  },
  installChecker: {
    checking: "Checking\u2026",
    checkInstallation: "Check installation",
    widgetDetected: "Widget detected on {domain}",
    widgetNotDetected: "Widget not detected yet \u2014 add the snippet below",
    couldNotReach: "Could not reach site",
  },
  siteName: {
    saving: "Saving\u2026",
    save: "Save",
    cancel: "Cancel",
    nameLengthError: "Name must be 1\u2013100 characters.",
    networkError: "Network error.",
    clickToRename: "Click to rename",
  },
  breadcrumb: {
    dashboard: "Dashboard",
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
  theme: {
    switchToLight: "A\u00e7\u0131k moda ge\u00e7",
    switchToDark: "Karanl\u0131k moda ge\u00e7",
  },
  notifications: {
    label: "Bildirimler",
    unreadCount: "{count} okunmam\u0131\u015f",
  },
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
    welcomeBackDesc:
      "Eri\u015Filebilir sitelerinizi y\u00F6netmek i\u00E7in giri\u015F yap\u0131n.",
    passwordResetSuccess:
      "\u015Eifre ba\u015Far\u0131yla g\u00FCncellendi. Yeni \u015Fifrenizle giri\u015F yap\u0131n.",
    createYourAccount: "Hesab\u0131n\u0131z\u0131 olu\u015Fturun",
    createAccountDesc: "Daima \u00FCcretsiz. Kredi kart\u0131 gerekmez.",
    forgotPasswordTitle: "\u015Eifrenizi mi unuttunuz?",
    forgotPasswordDesc:
      "E-postan\u0131z\u0131 girin, size bir s\u0131f\u0131rlama ba\u011Flant\u0131s\u0131 g\u00F6nderelim.",
    checkInbox: "Gelen kutunuzu kontrol edin",
    checkInboxDesc:
      "S\u0131f\u0131rlama ba\u011Flant\u0131s\u0131 g\u00F6nderildi:",
    resetLinkExpiry:
      "Ba\u011Flant\u0131 1 saat i\u00E7inde ge\u00E7erlili\u011Fini yitirir.",
    setNewPasswordTitle: "Yeni \u015Fifre belirle",
    setNewPasswordDesc: "En az 8 karakter olmal\u0131d\u0131r.",
    strongPasswordTitle: "G\u00FC\u00E7l\u00FC bir yeni \u015Fifre belirleyin.",
    strongPasswordDesc:
      "Hesab\u0131n\u0131z\u0131 g\u00FCvende tutmak i\u00E7in daha \u00F6nce kullanmad\u0131\u011F\u0131n\u0131z bir \u015Fifre se\u00E7in.",
    secureRecovery: "G\u00FCvenli hesap kurtarma.",
    secureRecoveryDesc:
      "H\u0131zl\u0131ca tekrar eri\u015Fim sa\u011Flaman\u0131z i\u00E7in size g\u00FCvenli bir ba\u011Flant\u0131 g\u00F6nderece\u011Fiz.",
    minChars: "En az 8 karakter olmal\u0131d\u0131r.",
    agreeTerms: "Kay\u0131t olarak kabul ediyorsunuz:",
    terms: "Kullan\u0131m Ko\u015Fullar\u0131",
    privacyPolicy: "Gizlilik Politikas\u0131",
    and: "ve",
    loginFailed: "Giri\u015F ba\u015Far\u0131s\u0131z",
    registrationFailed: "Kay\u0131t ba\u015Far\u0131s\u0131z",
    resetFailed:
      "S\u0131f\u0131rlama ba\u015Far\u0131s\u0131z. Ba\u011Flant\u0131n\u0131n s\u00FCresi dolmu\u015F olabilir.",
    invalidToken:
      "Ge\u00E7ersiz veya eksik s\u0131f\u0131rlama jetonu. L\u00FCtfen yeni bir ba\u011Flant\u0131 isteyin.",
    continueWithGoogle: "Google ile devam et",
    continueWithGithub: "GitHub ile devam et",
    orContinueWithEmail: "veya e-posta ile devam et",
    redirecting: "Y\u00F6nlendiriliyor\u2026",
    somethingWentWrong: "Bir \u015feyler ters gitti",
    validEmail: "L\u00fctfen ge\u00e7erli bir e-posta adresi girin",
    passwordRequired: "\u015eifre gereklidir",
    nameMinChars: "Ad en az 2 karakter olmal\u0131d\u0131r",
    nameMaxChars: "En fazla 100 karakter",
    currentPasswordRequired: "Mevcut \u015fifre gereklidir",
    passwordMinChars: "\u015eifre en az 8 karakter olmal\u0131d\u0131r",
    passwordsDoNotMatch: "\u015eifreler e\u015fle\u015fmiyor",
    minCharsPlaceholder: "En az 8 karakter",
    repeatPasswordPlaceholder: "Yeni \u015fifreyi tekrarla",
  },
  authFeatures: {
    oneScriptTag: "Tek script etiketi \u2014 dakikalar i\u00E7inde haz\u0131r",
    accessibilityFeatures:
      "24 ger\u00E7ek eri\u015Filebilirlik \u00F6zelli\u011Fi",
    languages: "RTL dahil 41 dil",
    wcagReady: "WCAG 2.1 AA ve EAA 2025 uyumlu",
  },
  authStats: {
    features: "Eri\u015Filebilirlik \u00F6zellikleri",
    languages: "Dil",
    bundleSize: "Paket boyutu",
  },
  authTips: {
    checkSpam:
      "\u0130stenmeyen veya \u00F6nemsiz posta klas\u00F6r\u00FCn\u00FCz\u00FC kontrol edin",
    resetLinkValid:
      "S\u0131f\u0131rlama ba\u011Flant\u0131s\u0131 1 saat ge\u00E7erlidir",
    strongPassword:
      "G\u00FC\u00E7l\u00FC ve benzersiz bir \u015Fifre kullan\u0131n",
    useEightChars: "En az 8 karakter kullan\u0131n",
    mixCharacters: "Harf, rakam ve sembol kar\u0131\u015Ft\u0131r\u0131n",
    avoidReuse: "Eski \u015Fifreleri tekrar kullanmay\u0131n",
  },
  authTestimonial: {
    quote:
      "\u201C3 dakikada kurduk. Eri\u015Filebilirlik puanl\u0131m\u0131z D\u2019den A\u2019ya y\u00FCkseldi.\u201D",
    name: "Maria V.",
    role: "Frontend Lider, AB SaaS",
  },
  authBrand: {
    makeAccessible:
      "Web sitenizi herkes i\u00E7in\neri\u015Filebilir yap\u0131n.",
    makeAccessibleDesc:
      "5 dakikadan k\u0131sa s\u00FCrede herhangi bir siteye ger\u00E7ek eri\u015Filebilirlik \u00F6zellikleri ekleyin.",
    joinSites:
      "Web\u2019i kapsay\u0131c\u0131 yapan\nbinlerce siteye kat\u0131l\u0131n.",
    joinSitesDesc:
      "Daima \u00FCcretsiz plan. Kredi kart\u0131 gerekmez. 5 dakikadan k\u0131sa s\u00FCrede haz\u0131r.",
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
    exportDataDesc:
      "Hakk\u0131n\u0131zda tuttu\u011Fumuz t\u00FCm ki\u015Fisel verilerin bir kopyas\u0131n\u0131 indirin \u2014 profiliniz, siteleriniz ve API anahtarlar\u0131n\u0131z. Bu, KVKK veri ta\u015F\u0131nabilirlik hakk\u0131n\u0131z\u0131 kar\u015F\u0131lar.",
    downloadExport:
      "Veri d\u0131\u015Fa aktar\u0131m\u0131n\u0131 indir (JSON)",
    deleteAccount: "Hesab\u0131 Sil",
    deleteAccountDesc:
      "Hesab\u0131n\u0131z\u0131, t\u00FCm sitelerinizi, analitik verilerinizi kal\u0131c\u0131 olarak silin ve aboneli\u011Finizi iptal edin. Bu i\u015Flem geri al\u0131namaz.",
    deleteAccountConfirm:
      "Onaylamak i\u00E7in <strong>delete</strong> yaz\u0131n:",
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
    emailChangeHint:
      "E-posta adresinizi de\u011Fi\u015Ftirmek i\u00E7in destekle ileti\u015Fime ge\u00E7in.",
    typeDeleteConfirm: "delete",
    typeToConfirm: "Yaz\u0131n",
    failedToUpdateName: "Ad g\u00fcncellenemedi",
    failedToChangePassword: "\u015eifre de\u011fi\u015ftirilemedi",
    failedToDeleteAccount: "Hesap silinemedi",
  },
  dashboard: {
    title: "Web Sitelerim",
    newSite: "Yeni site",
    noSites: "Hen\u00FCz site yok",
    noSitesDesc:
      "Alan ad\u0131n\u0131z\u0131 kay\u0131t edin ve bir g\u00F6mme kodu al\u0131n. Eri\u015Filebilirlik widget\u0027\u0131n\u0131z 5 dakikadan k\u0131sa s\u00FCrede yay\u0131na girer.",
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
    nameYourSiteDesc:
      "Kolay bir ad ve widget\u0027\u0131 g\u00F6mmek istedi\u011Finiz alan ad\u0131n\u0131 girin.",
    siteName: "Site ad\u0131",
    siteNamePlaceholder: "\u015Eirketim Web Sitesi",
    domainLabel: "Alan ad\u0131",
    domainPlaceholder: "ornek.com",
    domainHint: "Protokol olmadan \u2014 \u00F6rne\u011Fin",
    dnsChecking: "DNS kontrol ediliyor\u2026",
    dnsValid: "DNS kay\u0131tlar\u0131 bulundu",
    dnsInvalid:
      "Bu alan ad\u0131 i\u00E7in DNS kayd\u0131 bulunamad\u0131. L\u00FCtfen alan ad\u0131n\u0131 kontrol edin.",
    dnsError:
      "DNS do\u011Frulanamad\u0131. L\u00FCtfen alan ad\u0131n\u0131 kontrol edin.",
    chooseBrandColor: "Marka renginizi se\u00E7in",
    chooseBrandColorDesc:
      "Bu renk widget d\u00FC\u011Fmesi ve vurgular i\u00E7in kullan\u0131lacakt\u0131r.",
    presets: "\u00D6n ayarlar",
    widgetButtonPreview: "Widget d\u00FC\u011Fme \u00F6nizleme",
    widgetPosition: "Widget konumu",
    widgetPositionDesc:
      "Widget d\u00FC\u011Fmesinin sitenizde nerede g\u00F6r\u00FCnece\u011Fini se\u00E7in.",
    chooseLanguage: "Dil se\u00E7in",
    chooseLanguageDesc:
      "Widget 41 dili destekler. Varsay\u0131lan\u0131 se\u00E7in.",
    languageChangeHint:
      "Bunu daha sonra widget ayarlar\u0131ndan de\u011Fi\u015Ftirebilirsiniz.",
    reviewAndCreate: "\u0130ncele ve olu\u015Ftur",
    reviewAndCreateDesc:
      "Her \u015Fey iyi g\u00F6r\u00FCn\u00FCyor mu? Bitirmek i\u00E7in Site olu\u015Ftur\u2019a t\u0131klay\u0131n.",
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
    unlockFeatures:
      "t\u00FCm \u00F6zelliklerin kilidini a\u00E7mak i\u00E7in. Gelen kutunuzu kontrol edin:",
    checkInbox: "G\u00F6nderildi! Gelen kutunuzu kontrol edin.",
    sent: "G\u00F6nderildi!",
    resend: "Tekrar g\u00F6nder",
    sending: "G\u00F6nderiliyor\u2026",
    dismiss: "Kapat",
  },
  cookie: {
    message:
      "\u00C7erezleri yaln\u0131zca kimlik do\u011Frulama i\u00E7in kullan\u0131yoruz \u2014 izleme, reklam veya \u00FC\u00E7\u00FCnc\u00FC taraf analiti\u011Fi yok.",
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
    dangerZoneDesc:
      "Bu siteyi ve t\u00FCm verilerini kal\u0131c\u0131 olarak silin.",
    deleteSite: "Siteyi sil",
    accessibilityStatementUrl: "Eri\u015Filebilirlik beyannamesi URL\u2019si",
    domainLabel: "Alan ad\u0131",
    domainSave: "Kaydet",
    domainSaving: "Kaydediliyor\u2026",
    domainCancel: "\u0130ptal",
    domainHint:
      "Tam URL yapabilirsiniz \u2014 protokol otomatik olarak kald\u0131r\u0131l\u0131r.",
    domainEmpty: "Alan ad\u0131 bo\u015F olamaz.",
    domainNetworkError: "A\u011F hatas\u0131.",
    domainClickToChange:
      "Alan ad\u0131n\u0131 de\u011Fi\u015Ftirmek i\u00E7in t\u0131klay\u0131n",
    dnsChecking: "DNS kontrol ediliyor\u2026",
    dnsValid: "DNS kay\u0131tlar\u0131 bulundu",
    dnsInvalid:
      "Bu alan ad\u0131 i\u00E7in DNS kayd\u0131 bulunamad\u0131. L\u00FCtfen alan ad\u0131n\u0131 kontrol edin.",
    dnsError:
      "DNS do\u011Frulanamad\u0131. L\u00FCtfen alan ad\u0131n\u0131 kontrol edin.",
    triggerButtonPreview: "Tetik d\u00FC\u011Fmesi \u00F6nizleme",
    buttonSizeMini: "Mini",
    buttonSizeRegular: "Normal",
  },
  errors: {
    somethingWentWrong: "Bir \u015Feyler ters gitti",
    unexpectedError: "Beklenmeyen bir hata olu\u015Ftu.",
    errorId: "Hata ID:",
    tryAgain: "Tekrar dene",
    goToDashboard: "Panele git",
    pageNotFound: "Sayfa bulunamad\u0131",
    pageNotFoundDesc:
      "Arad\u0131\u011F\u0131n\u0131z sayfa mevcut de\u011Fil veya ta\u015F\u0131nm\u0131\u015F.",
    backToDashboard: "Panele d\u00F6n",
    home: "Ana Sayfa",
    dashboardError: "Bir \u015Feyler ters gitti",
    dashboardErrorDesc:
      "Bu sayfa y\u00FCklenirken beklenmeyen bir hata olu\u015Ftu. L\u00FCtfen tekrar deneyin.",
  },
  banned: {
    title: "Hesap Ask\u0131ya Al\u0131nd\u0131",
    description:
      "Hesab\u0131n\u0131z ask\u0131ya al\u0131nm\u0131\u015Ft\u0131r. Bunun bir hata oldu\u011Funu d\u00FC\u015F\u00FCn\u00FCyorsan\u0131z l\u00FCtfen destek ekibimizle ileti\u015Fime ge\u00E7in.",
    contactSupport: "Destek ile ileti\u015Fime ge\u00E7",
  },
  notificationsPage: {
    title: "Bildirimler",
    markAllRead: "T\u00FCm\u00FCn\u00FC okundu i\u015Faretle",
    filterAll: "T\u00FCm\u00FC",
    filterUnread: "Okunmam\u0131\u015F",
    noUnread: "Okunmam\u0131\u015F bildirim yok",
    noNotifications: "Hen\u00FCz bildirim yok",
    viewAll: "T\u00FCm bildirimleri g\u00F6r",
    allCaughtUp: "Hepsi okundu",
    loading: "Y\u00FCkleniyor\u2026",
    previous: "\u00D6nceki",
    next: "Sonraki",
    pageOf: "Sayfa {page} / {pages}",
    total: "toplam",
  },
  timeAgo: {
    justNow: "\u015Fimdi",
    minutesAgo: "dk \u00F6nce",
    hoursAgo: "sa \u00F6nce",
    daysAgo: "g \u00F6nce",
  },
  auditLog: {
    title: "Denetim G\u00FCnl\u00FC\u011F\u00FC",
    description: "Hesab\u0131n\u0131zdaki son 100 i\u015Flem.",
    entries: "kay\u0131t",
    noActivity: "Hen\u00FCz kaydedilmi\u015F etkinlik yok.",
    siteCreated: "Site olu\u015Fturuldu",
    siteRenamed: "Site yeniden adland\u0131r\u0131ld\u0131",
    siteDeleted: "Site silindi",
    configUpdated: "Yap\u0131land\u0131rma g\u00FCncellendi",
    apiKeyCreated: "API anahtar\u0131 olu\u015Fturuldu",
    apiKeyRevoked: "API anahtar\u0131 iptal edildi",
    webhookCreated: "Webhook olu\u015Fturuldu",
    webhookDeleted: "Webhook silindi",
  },
  billing: {
    title: "Faturalama",
    description:
      "Abonelik ve \u00F6deme detaylar\u0131n\u0131z\u0131 y\u00F6netin",
    currentSubscription: "Mevcut abonelik",
    plan: "Plan",
    daysLeft: "g\u00FCn kald\u0131",
    renewsOn: "Yenileme",
    accessUntil: "Eri\u015Fim biti\u015F",
    freeTrialDaysRemaining:
      "\u00DCcretsiz deneme \u2014 {days} g\u00FCn kald\u0131",
    freeTrialExpiredSubscribe:
      "\u00DCcretsiz deneme sona erdi \u2014 devam etmek i\u00E7in abone olun",
    noActiveSubscription: "Aktif abonelik yok",
    manageBilling: "Faturay\u0131 y\u00F6net",
    cancelSubscription: "Aboneli\u011Fi iptal et",
    cancelSubscriptionTitle: "Aboneli\u011Fi iptal et?",
    cancelSubscriptionDesc:
      "{date} tarihine kadar tam eri\u015Fime sahip olacaks\u0131n\u0131z. Sonras\u0131nda hesab\u0131n\u0131z \u00DCcretsiz plana ge\u00E7ecektir.",
    canceling: "\u0130ptal ediliyor\u2026",
    yesCancel: "Evet, iptal et",
    keepPlan: "Plan\u0131 koru",
    statusLabel: "Durum",
    billingLabel: "Faturalama",
    periodStart: "D\u00F6nem ba\u015Flang\u0131c\u0131",
    statusActive: "Aktif",
    statusTrial: "Deneme",
    statusPaymentOverdue: "\u00D6deme gecikmi\u015F",
    statusCanceled: "\u0130ptal edildi",
    statusCanceling: "\u0130ptal ediliyor",
    intervalAnnual: "Y\u0131ll\u0131k",
    intervalMonthly: "Ayl\u0131k",
    intervalYearly: "Y\u0131ll\u0131k",
    freeTrialEnded: "\u00DCcretsiz denemeniz sona erdi",
    freeTrialEndedDesc:
      "Sitelerinizde eri\u015Filebilirlik widget\u0027\u0131n\u0131 kullanmaya devam etmek i\u00E7in a\u015Fa\u011F\u0131dan bir plana abone olun.",
    choosePlan: "Bir plan se\u00E7in",
    choosePlanDesc:
      "Diledi\u011Finiz zaman abone olun \u2014 fatura d\u00F6nemi sonunda iptal edin",
    mostPopular: "En Pop\u00FCler",
    currentBadge: "Mevcut",
    currentPlan: "Mevcut plan",
    getStarted: "Ba\u015Fla",
    perYear: "/y\u0131l",
    perMonth: "/ay",
    save: "Tasarruf",
    redirecting: "Y\u00F6nlendiriliyor\u2026",
    planSmallDesc: "K\u00FC\u00E7\u00FCk web siteleri i\u00E7in ideal",
    planMediumDesc: "B\u00FCy\u00FCyen i\u015Fletmeler ve ajanslar",
    planLargeDesc: "Yüksek trafikli ve kurumsal siteler",
    planNameFree: "Ücretsiz",
    planNameSmall: "Small",
    planNameMedium: "Medium",
    planNameLarge: "Large",
    featurePageviews: "Aylık {count} sayfa görüntülemeye kadar",
    featureWebsites: "{count} web sitesine kadar",
    featureWcagScan: "Tam WCAG 2.1 AA & AAA taraması",
    featureAutoFixes: "Otomatik düzeltmeler",
    featureRealTimeMonitoring: "Gerçek zamanlı izleme",
    featureContinuousMonitoring: "Sürekli izleme",
    featureFreeTrial: "7 günlük ücretsiz deneme",
    featurePriorityEmail: "Öncelikli e-posta desteği",
    featureAutoTranslation: "Otomatik sayfa çevirisi (41+ dil)",
    featureCustomBranding: "Özel markalaştırma",
    featurePriorityPhoneEmail: "Öncelikli destek (telefon ve e-posta)",
    cancellationFailed: "\u0130ptal ba\u015far\u0131s\u0131z",
    upgradeTo: "{plan} plan\u0131na y\u00fckselt \u2192",
    monthly: "Ayl\u0131k",
    annual: "Y\u0131ll\u0131k",
    save17: "%17 TASARRUF",
    checkoutFailed: "\u00d6deme ba\u015flat\u0131lamad\u0131",
  },
  deleteSitePage: {
    breadcrumbDelete: "Sil",
    title: "Siteyi kalıcı olarak sil",
    cannotBeUndone: "Bu i\u015Flem geri al\u0131namaz.",
    aboutToDelete: "Kal\u0131c\u0131 olarak silmek \u00FCzeresiniz:",
    andAllData: "ve t\u00FCm ili\u015Fkili veriler.",
    dataWillBeDeleted: "Silinecek veriler",
    siteConfigWidget:
      "Site yap\u0131land\u0131rmas\u0131 ve widget ayarlar\u0131",
    allAnalyticsEvents: "T\u00FCm analitik olaylar\u0131",
    widgetLoadHistory: "Widget y\u00FCkleme ge\u00E7mi\u015Fi",
    wcagScanResults: "WCAG tarama sonu\u00E7lar\u0131",
    confirmDelete: "Evet, bu siteyi sil",
    cancel: "\u0130ptal",
  },
  scanner: {
    title: "WCAG Eri\u015Filebilirlik Taramas\u0131",
    description:
      "Herhangi bir URL\u2019nin genel HTML\u2019ini yayg\u0131n WCAG A ve AA ihlalleri i\u00E7in kontrol eder. Sayfa herkese a\u00E7\u0131k olmal\u0131d\u0131r.",
    scanning: "Taran\u0131yor\u2026",
    runScan: "Taramay\u0131 Ba\u015Flat",
    scanningHint:
      "HTML al\u0131n\u0131yor ve analiz ediliyor \u2014 yava\u015F siteler i\u00E7in 15 saniyeye kadar s\u00FCrebilir\u2026",
    networkError: "A\u011F hatas\u0131 \u2014 l\u00FCtfen tekrar deneyin",
    complianceScore: "Uyumluluk Puan\u0131",
    excellent: "M\u00FCkemmel",
    good: "\u0130yi",
    fair: "Orta",
    needsWork: "Geli\u015Ftirmeli",
    violations: "ihlal",
    violation: "ihlal",
    checksPassed: "kontrol ge\u00E7ti",
    scanned: "Tarand\u0131",
    critical: "Kritik",
    serious: "Ciddi",
    moderate: "Orta",
    minor: "K\u00FC\u00E7\u00FCk",
    criticalLabel: "Kritik",
    criticalDesc:
      "Ciddi / Kritik \u2014 WCAG AA ba\u015Far\u0131s\u0131zl\u0131klar\u0131",
    warningLabel: "Uyar\u0131",
    warningDesc:
      "Orta / K\u00FC\u00E7\u00FCk \u2014 en iyi uygulama sorunlar\u0131",
    scoreSimulation: "Puan Sim\u00FClasyonu",
    scoreSimulationDesc:
      "T\u00FCm {count} kritik sorunu d\u00FCzeltin \u2192 puan {from}\u2019dan {to}\u2019ya y\u00FCkselir (+{points} puan)",
    breakdownBySeverity: "Ciddiyete G\u00F6re Da\u011F\u0131l\u0131m",
    violationsSorted: "\u0130hlaller (ciddiyete g\u00F6re s\u0131ral\u0131)",
    allChecksPassed: "T\u00FCm {count} kontrol ge\u00E7ti",
    allChecksPassedDesc:
      "Statik HTML\u2019de tespit edilebilir ihlal yok. Dinamik i\u00E7erik i\u00E7in axe DevTools ile tam taray\u0131c\u0131 tabanl\u0131 denetim \u00F6nerilir.",
    affectedElements: "Etkilenen \u00F6\u011Feler",
    wcagDocument: "WCAG {wcag} anlama belgesi",
    instances: "\u00F6rnek",
  },
  statement: {
    hostedTitle: "Bar\u0131nd\u0131r\u0131lan Eri\u015Filebilirlik Beyannamesi",
    hostedDesc:
      "Inculva eri\u015Filebilirlik beyannamenizi otomatik olarak bar\u0131nd\u0131r\u0131r \u2014 kendi sunucunuz gerekmez. A\u015Fa\u011F\u0131daki URL\u2019yi kopyalay\u0131n ve widget yap\u0131land\u0131rman\u0131zda accessibilityStatementUrl olarak kullan\u0131n.",
    copyUrl: "URL\u2019yi Kopyala",
    copied: "Kopyaland\u0131!",
    preview: "\u00D6nizleme",
    hidePreview: "\u00D6nizlemeyi Gizle",
    eaaTitle: "EAA Madde 13 Uyumlulu\u011Fu",
    eaaDesc:
      "Avrupa Eri\u015Filebilirlik Yasas\u0131 (EAA), t\u00FCm dijital \u00FCr\u00FCn ve hizmetlerin bir eri\u015Filebilirlik beyannamesi yay\u0131nlamas\u0131n\u0131 gerektirir. A\u015Fa\u011F\u0131da bir tane olu\u015Fturun, sitenizde bar\u0131nd\u0131r\u0131n, ard\u0131ndan URL\u2019yi widget yap\u0131land\u0131rmas\u0131na yap\u0131\u015Ft\u0131r\u0131n.",
    detailsTitle: "Beyanname Detaylar\u0131",
    contactName: "\u0130leti\u015Fim Ad\u0131",
    contactEmail: "\u0130leti\u015Fim E-postas\u0131",
    conformanceLevel: "Uygunluk Seviyesi",
    reviewDate: "\u0130nceleme Tarihi",
    knownLimitations:
      "Bilinen K\u0131s\u0131tlamalar (iste\u011Fe ba\u011Fl\u0131)",
    knownLimitationsPlaceholder:
      "Bilinen eri\u015Filebilirlik engellerini ve bunlar\u0131 d\u00FCzeltme plan\u0131n\u0131z\u0131 a\u00E7\u0131klay\u0131n...",
    downloadHtml: "HTML \u0130ndir",
    linkInWidget: "Widget\u2019taki Ba\u011Flant\u0131",
    linkInWidgetDesc:
      "HTML dosyas\u0131n\u0131 sitenizde bar\u0131nd\u0131rd\u0131ktan (veya yukar\u0131daki bar\u0131nd\u0131r\u0131lan URL\u2019yi kulland\u0131ktan) sonra, widget panel alt bilgisinde bir ba\u011Flant\u0131 olarak g\u00F6r\u00FCnmesi i\u00E7in a\u015Fa\u011F\u0131ya URL\u2019yi ekleyin.",
    statementUrl: "Eri\u015Filebilirlik Beyannamesi URL\u2019si",
    saveUrl: "URL\u2019yi Kaydet",
    saving: "Kaydediliyor\u2026",
    saved: "Kaydedildi!",
    lastScanNoViolations:
      "Son WCAG taramas\u0131 ({date}) ihlal bulamad\u0131.",
    lastScanViolations:
      "Son WCAG taramas\u0131 ({date}) {count} potansiyel ihlal buldu. Beyanname olu\u015Fturmadan \u00F6nce bunlar\u0131 \u00E7\u00F6zmeyi d\u00FC\u015F\u00FCn\u00FCn.",
    publicTitle: "Eri\u015Filebilirlik Beyannamesi",
    appliesTo: "Bu beyanname \u015Funlar i\u00E7in ge\u00E7erlidir:",
    lastReviewed: "Son inceleme:",
    ourCommitmentTitle: "Taahh\u00FCd\u00FCm\u00FCz",
    ourCommitmentBody:
      "{siteName}, engelli bireyler i\u00E7in dijital eri\u015Filebilirli\u011Fi sa\u011Flamay\u0131 taahh\u00FCt eder. Herkes i\u00E7in kullan\u0131c\u0131 deneyimini s\u00FCrekli iyile\u015Ftirir ve ilgili eri\u015Filebilirlik standartlar\u0131n\u0131 uygular\u0131z.",
    conformanceStatusTitle: "Uygunluk Durumu",
    conformanceStatusBody:
      "Web \u0130\u00E7eri\u011Fi Eri\u015Filebilirlik Y\u00F6nergeleri (WCAG) 2.1\u2019de tan\u0131mland\u0131\u011F\u0131 \u015Fekilde WCAG 2.1 Seviye AA uygunlu\u011Funu hedefliyoruz. Bu, Avrupa Eri\u015Filebilirlik Yasas\u0131 (EAA) ve EN 301 549 gerekliliklerini kar\u015F\u0131lar.",
    complianceWorkBegan: "Uyum \u00E7al\u0131\u015Fmalar\u0131 ba\u015Flang\u0131c\u0131:",
    statusNoteNotScanned:
      "Hen\u00FCz otomatik bir eri\u015Filebilirlik taramas\u0131 yap\u0131lmad\u0131.",
    statusNoteNoViolationsPublic:
      "En son otomatik WCAG taramas\u0131 ihlal bulmad\u0131.",
    statusNoteViolationsPublic:
      "En son otomatik WCAG taramas\u0131 {count} potansiyel ihlal buldu. Bunlar\u0131 gidermek i\u00E7in aktif olarak \u00E7al\u0131\u015F\u0131yoruz.",
    technicalSpecificationsTitle: "Teknik \u00D6zellikler",
    technicalSpecificationsBody:
      "Bu web sitesi uygunluk i\u00E7in a\u015Fa\u011F\u0131daki teknolojilere dayan\u0131r:",
    widgetNote:
      "Bu sitede, metin b\u00FCy\u00FCtme, y\u00FCksek kontrast, disleksi dostu yaz\u0131 tipleri, klavye ile gezinme, ekran okuyucu deste\u011Fi ve daha fazlas\u0131 gibi iste\u011Fe ba\u011Fl\u0131 yard\u0131mc\u0131 \u00F6zellikler sunan (Inculva taraf\u0131ndan desteklenen) bir eri\u015Filebilirlik widget\u2019\u0131 bulunmaktad\u0131r.",
    feedbackAndContactTitle: "Geri Bildirim ve \u0130leti\u015Fim",
    feedbackAndContactBody:
      "{siteName} sitesinin eri\u015Filebilirli\u011Fi hakk\u0131nda geri bildiriminizi memnuniyetle kar\u015F\u0131lar\u0131z. Eri\u015Filebilirlik engelleriyle kar\u015F\u0131la\u015F\u0131rsan\u0131z l\u00FCtfen do\u011Frudan site sahibiyle {email} \u00FCzerinden ileti\u015Fime ge\u00E7in.",
  },
  adminUsers: {
    badge: "Admin",
    title: "Kullan\u0131c\u0131lar",
    searchPlaceholder: "E-posta ile ara...",
    search: "Ara",
    clear: "Temizle",
    colUser: "Kullan\u0131c\u0131",
    colPlan: "Plan",
    colVerified: "Do\u011Fruland\u0131",
    colJoined: "Kat\u0131ld\u0131",
    colChangePlan: "Plan De\u011Fi\u015Ftir",
    colStatus: "Durum",
    yes: "Evet",
    no: "Hay\u0131r",
    banned: "Engelli",
    active: "Aktif",
    noUsersFound: "Kullan\u0131c\u0131 bulunamad\u0131.",
  },
  analytics: {
    lastDays: "Son {days} G\u00FCn",
    exportCsv: "CSV D\u0131\u015Fa Aktar",
    widgetLoads: "Widget Y\u00FCklemeleri",
    widgetOpens: "Widget A\u00E7\u0131l\u0131\u015Flar\u0131",
    uniqueSessions: "Benzersiz Oturumlar",
    featureActivations: "\u00D6zellik Etkinle\u015Ftirmeleri",
    dailyEvents: "G\u00FCnl\u00FCk Olaylar ({days} g\u00FCn)",
    noEventsYet:
      "Hen\u00FCz olay yok. \u0130zlemeye ba\u015Flamak i\u00E7in widget\u0027\u0131 sitenize g\u00F6m\u00FCn.",
    featureAdoption: "\u00D6zellik Benimsemesi",
    ofUniqueSessions: "% / {count} benzersiz oturum",
    noFeatureActivations:
      "Son {days} g\u00FCnde \u00F6zellik etkinle\u015Ftirmesi yok.",
    feature: "\u00D6zellik",
    sessions: "Oturumlar",
    adoption: "Benimseme",
    embedDomains: "G\u00F6m\u00FCl\u00FC Alan Adlar\u0131",
    embedDomainsDesc:
      "Son {days} g\u00FCnde widget\u0027\u0131n\u0131z\u0131 y\u00FCkleyen alan adlar\u0131.",
    noDomainLoads: "Hen\u00FCz alan ad\u0131 y\u00FCklemesi kaydedilmedi.",
    domain: "Alan Ad\u0131",
    loads: "Y\u00FCklemeler",
    lastSeen: "Son G\u00F6r\u00FClme",
    recentEvents: "Son Olaylar",
    showingOf: "{shown} / {total} g\u00F6steriliyor",
    exportAll: "t\u00FCm\u00FCn\u00FC d\u0131\u015Fa aktar",
    event: "Olay",
    time: "Zaman",
  },
  siteTabs: {
    config: "Yap\u0131land\u0131rma",
    analytics: "Analitik",
    wcagScan: "WCAG Tarama",
    statement: "Beyanname",
  },
  configTabs: {
    general: "Genel",
    featuresAndProfiles: "\u00D6zellikler ve Profiller",
  },
  featuresTab: {
    accessibilityProfiles: "Eri\u015Filebilirlik Profilleri",
    ofEnabled: "{total} \u00FCzerinden {count} etkin",
    saveChanges: "De\u011Fi\u015Fiklikleri Kaydet",
    saving: "Kaydediliyor\u2026",
    saved: "Kaydedildi!",
    vision: "G\u00F6rme",
    reading: "Okuma",
    motor: "Motor",
    calm: "Sakinlik",
    failedToSave:
      "Kaydetme ba\u015Far\u0131s\u0131z \u2014 l\u00FCtfen tekrar deneyin",
    networkError:
      "A\u011F hatas\u0131 \u2014 l\u00FCtfen ba\u011Flant\u0131n\u0131z\u0131 kontrol edin",
  },
  statisticsPage: {
    title: "\u0130statistikler",
    subtitle: "T\u00fcm sitelerinizde son 30 g\u00fcn",
    widgetLoads: "Widget Y\u00fcklemeleri",
    widgetOpens: "Widget A\u00e7\u0131lmalar\u0131",
    uniqueSessions: "Benzersiz Oturumlar",
    featureActivations: "\u00d6zellik Etkinle\u015ftirmeleri",
    engagementRate: "Widget etkile\u015fim oran\u0131",
    opensLoads: "a\u00e7\u0131lma / y\u00fckleme",
    featureUsage: "\u00d6zellik kullan\u0131m\u0131",
    featureUsageDesc:
      "Son 30 g\u00fcnde her \u00f6zelli\u011fi etkinle\u015ftiren benzersiz oturumlar",
    last30Days: "Son 30 g\u00fcn",
    profileUsage: "Eri\u015filebilirlik profili kullan\u0131m\u0131",
    profileUsageDesc:
      "Son 30 g\u00fcnde tek t\u0131kla profil etkinle\u015ftirmeleri",
    featureTextResizing: "Metin Boyutland\u0131rma",
    featureTextAlign: "Metin Hizalama",
    featureReadingGuide: "Okuma Rehberi",
    featureTextSpacing: "Metin Aral\u0131\u011f\u0131",
    featureScreenReader: "Ekran Okuyucu",
    featureDyslexiaFont: "Disleksi Fontu",
    featureReadingMask: "Okuma Maskesi",
    featureCursorEnhancement: "\u0130mle\u00e7 \u0130yile\u015ftirme",
    featureHighlightLinks: "Ba\u011flant\u0131lar\u0131 Vurgula",
    featureFocusHighlight: "Odak Vurgulama",
    featurePauseAnimations: "Animasyonlar\u0131 Durdur",
    featureColorBlindMode: "Renk K\u00f6rl\u00fc\u011f\u00fc Modu",
    featureMuteMedia: "Medyay\u0131 Sessize Al",
    featureSkipNavigation: "Gezinmeyi Atla",
    featureSaturation: "Doygunluk",
    featureKeyboardNavigation: "Klavye Gezinme",
    featureLargeClickTargets: "B\u00fcy\u00fck T\u0131klama Hedefleri",
    featureBlueLightFilter: "Mavi I\u015f\u0131k Filtresi",
    featureHideImages: "G\u00f6rselleri Gizle",
    featureDarkMode: "Karanl\u0131k Mod",
    featureContentMagnifier: "\u0130\u00e7erik B\u00fcy\u00fcte\u00e7",
    featureSlowCursor: "Yava\u015f \u0130mle\u00e7",
    featureLineHeight: "Sat\u0131r Y\u00fcksekli\u011fi",
    featureHighlightTitles: "Ba\u015fl\u0131klar\u0131 Vurgula",
    profileAdhd: "DEHB",
    profileBlind: "G\u00f6rme Engelli",
    profileLowVision: "Az G\u00f6ren",
    profileColorBlind: "Renk K\u00f6r\u00fc",
    profileDyslexia: "Disleksi",
    profileMotorImpaired: "Motor Engelli",
  },
  referral: {
    title: "Davet Et ve Kazan",
    description:
      "Benzersiz ba\u011Flant\u0131n\u0131z\u0131 payla\u015F\u0131n. Kay\u0131t olan her arkada\u015F\u0131n\u0131z davetlerinize say\u0131l\u0131r.",
    copyLink: "Ba\u011Flant\u0131y\u0131 kopyala",
    copied: "Kopyaland\u0131!",
    yourCode: "Kodunuz",
    referrals: "Davetler",
  },
  installChecker: {
    checking: "Kontrol ediliyor\u2026",
    checkInstallation: "Kurulumu kontrol et",
    widgetDetected: "{domain} \u00FCzerinde widget tespit edildi",
    widgetNotDetected:
      "Widget hen\u00FCz tespit edilmedi \u2014 a\u015Fa\u011F\u0131daki kodu ekleyin",
    couldNotReach: "Siteye ula\u015F\u0131lamad\u0131",
  },
  siteName: {
    saving: "Kaydediliyor\u2026",
    save: "Kaydet",
    cancel: "\u0130ptal",
    nameLengthError: "Ad 1\u2013100 karakter olmal\u0131d\u0131r.",
    networkError: "A\u011F hatas\u0131.",
    clickToRename: "Yeniden adland\u0131rmak i\u00E7in t\u0131klay\u0131n",
  },
  breadcrumb: {
    dashboard: "Panel",
  },
};

const messages: Record<Locale, DashboardMessages> = { en, tr };

export function getMessages(locale: string): DashboardMessages {
  const key = SUPPORTED_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  return messages[key];
}
