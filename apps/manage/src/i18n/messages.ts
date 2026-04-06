export const SUPPORTED_LOCALES = ["en", "tr"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export interface DashboardMessages {
  nav: {
    sites: string;
    settings: string;
    pricing: string;
    statistics: string;
    customize: string;
    wcagScan: string;
    statement: string;
    notifications: string;
    deleteSite: string;
    newSite: string;
    support: string;
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
    /** Better Auth INVALID_EMAIL_OR_PASSWORD */
    invalidEmailOrPassword: string;
    /** Better Auth INVALID_EMAIL (API / credential flow) */
    invalidEmailApi: string;
    /** Shown when Better Auth returns EMAIL_NOT_VERIFIED (sign-in blocked until verified). */
    emailNotVerified: string;
    /** Better Auth FAILED_TO_CREATE_SESSION */
    authSessionFailed: string;
    /** Better Auth USER_ALREADY_EXISTS */
    userAlreadyExists: string;
    registrationFailed: string;
    resetFailed: string;
    invalidToken: string;
    continueWithGoogle: string;
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
    showPassword: string;
    hidePassword: string;
  };
  authFeatures: {
    oneScriptTag: string;
    languages: string;
    wcagReady: string;
    featureDarkMode: string;
    featureBlueLightFilter: string;
    featureTextResizing: string;
    featureTextAlign: string;
    featureLineHeight: string;
    featureTextSpacing: string;
    featureScreenReader: string;
    featureDyslexiaFont: string;
    featureReadingMask: string;
    featureReadingGuide: string;
    featureContentMagnifier: string;
    featureHighlightLinks: string;
    featureHighlightTitles: string;
    featureHideImages: string;
    featurePauseAnimations: string;
    featureCursorEnhancement: string;
    featureColorBlindMode: string;
    featureSaturation: string;
    featureFocusHighlight: string;
    featureLargeClickTargets: string;
    featureSlowCursor: string;
    featureSkipNavigation: string;
    featureMuteMedia: string;
    featureKeyboardNavigation: string;
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
    deleteAccountPlaceholder: string;
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
  legal: {
    termsTitle: string;
    termsLastUpdated: string;
    termsIntro: string;
    termsAcceptanceTitle: string;
    termsAcceptanceP1: string;
    termsServicesTitle: string;
    termsServicesP1: string;
    termsAccountTitle: string;
    termsAccountP1: string;
    termsUseTitle: string;
    termsUseP1: string;
    termsIpTitle: string;
    termsIpP1: string;
    termsLiabilityTitle: string;
    termsLiabilityP1: string;
    termsTerminationTitle: string;
    termsTerminationP1: string;
    termsChangesTitle: string;
    termsChangesP1: string;
    termsContactTitle: string;
    termsContactP1: string;
    privacyTitle: string;
    privacyLastUpdated: string;
    privacyIntro: string;
    privacyCollectTitle: string;
    privacyCollectP1: string;
    privacyUseTitle: string;
    privacyUseP1: string;
    privacySharingTitle: string;
    privacySharingP1: string;
    privacySecurityTitle: string;
    privacySecurityP1: string;
    privacyCookiesTitle: string;
    privacyCookiesP1: string;
    privacyRightsTitle: string;
    privacyRightsP1: string;
    privacyChangesTitle: string;
    privacyChangesP1: string;
    privacyContactTitle: string;
    privacyContactP1: string;
    contactEmail: string;
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
    yearly: string;
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
    needsReview: string;
    needsManualReview: string;
    needsManualReviewDesc: string;
    reviewReason: string;
    wcagDocument: string;
    instances: string;
    scanHistory: string;
    noScanHistory: string;
    scanTab: string;
    historyTab: string;
    singlePage: string;
    fullSite: string;
    fullSiteDesc: string;
    pageLimit: string;
    crawlProgress: string;
    pagesScanned: string;
    scanType: string;
    reportTitle: string;
    methodology: string;
    methodologyDesc: string;
    wcagPrinciples: string;
    perceivable: string;
    perceivableDesc: string;
    operable: string;
    operableDesc: string;
    understandable: string;
    understandableDesc: string;
    robust: string;
    robustDesc: string;
    passedChecks: string;
    passedChecksDesc: string;
    rulesPassed: string;
    elementsChecked: string;
    noViolations: string;
    scanSummary: string;
    wcagLevel: string;
    rulesEvaluated: string;
    scanDuration: string;
    scannedPages: string;
    scannedPagesDesc: string;
    pageCompleted: string;
    pageFailed: string;
    showAllPages: string;
    showFewerPages: string;
    learnMore: string;
    wcagKbArticleGeneric: string;
    bestPractice: string;
    cssSelector: string;
    passed: string;
    failedStatus: string;
    rules: string;
    elements: string;
    showSummary: string;
    showAllPassedRules: string;
    perceivableCategory: string;
    operableCategory: string;
    understandableCategory: string;
    robustCategory: string;
    statusCompleted: string;
    statusFailed: string;
    statusScanning: string;
    statusCrawling: string;
    statusPending: string;
    pagesAbbrev: string;
    scanFailed: string;
    fetchStatusFailed: string;
    apiErrorDailyLimitReached: string;
    apiErrorRateLimitReached: string;
    apiErrorUnauthorized: string;
    apiErrorSiteNotFound: string;
    apiErrorUrlRequired: string;
    apiErrorInvalidUrl: string;
    apiErrorDomainMismatch: string;
    wcagDocs: string;
    pageOf: string;
    prev: string;
    next: string;
    totalScans: string;
  };
  statement: {
    hostedTitle: string;
    hostedDesc: string;
    copyUrl: string;
    copied: string;
    preview: string;
    hidePreview: string;
    previewIframeTitle: string;
    eaaTitle: string;
    eaaDesc: string;
    detailsTitle: string;
    contactName: string;
    contactNamePlaceholder: string;
    contactEmail: string;
    conformanceLevel: string;
    conformanceLevelA: string;
    conformanceLevelAA: string;
    conformanceLevelAAA: string;
    reviewDate: string;
    knownLimitations: string;
    knownLimitationsPlaceholder: string;
    downloadHtml: string;
    linkInWidget: string;
    linkInWidgetDesc: string;
    statementUrl: string;
    statementUrlPlaceholder: string;
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
    feedbackIntro: string;
    contactNameLabel: string;
    contactEmailLabel: string;
    contactWebsiteLabel: string;
    responseTime: string;
    enforcementTitle: string;
    enforcementBody: string;
    footerPrepared: string;
    footerDirectiveName: string;
    footerPowered: string;
    footerGenerated: string;
    conformanceBodyGeneric: string;
    conformanceEaaNote: string;
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
  statistics: {
    lastDays: string;
    exportExcel: string;
    widgetLoads: string;
    widgetOpens: string;
    featureActivations: string;
    noEventsYet: string;
    feature: string;
    recentEvents: string;
    event: string;
    time: string;
    detail: string;
    eventOpened: string;
    eventClosed: string;
    eventFeatureEnabled: string;
    eventFeatureDisabled: string;
    eventProfileActivated: string;
  };
  siteTabs: {
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
    featureUsage: string;
    profileUsage: string;
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
  support: {
    title: string;
    titleDesc: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    categoryLabel: string;
    categoryGeneral: string;
    categoryBug: string;
    categoryFeature: string;
    categoryBilling: string;
    categoryAccessibility: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    sendAnother: string;
    errorTitle: string;
    errorDesc: string;
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    subjectRequired: string;
    categoryRequired: string;
    messageRequired: string;
    messageMinLength: string;
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
    wcagScan: "WCAG Scan",
    statement: "Statement",
    notifications: "Notifications",
    deleteSite: "Delete Site",
    newSite: "New Site",
    support: "Support",
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
    createAccount: "Create account",
    creatingAccount: "Creating account…",
    backToSignIn: "Back to sign in",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    rememberPassword: "Remember it?",
    signUpFree: "Sign up",
    welcomeBack: "Welcome back",
    welcomeBackDesc: "Sign in to manage your accessible sites.",
    passwordResetSuccess:
      "Password updated successfully. Sign in with your new password.",
    createYourAccount: "Create your account",
    createAccountDesc: "7-day free trial. No credit card required.",
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
    invalidEmailOrPassword: "Invalid email or password",
    invalidEmailApi: "Invalid email address",
    emailNotVerified:
      "Email not verified. Open the link we sent you to verify your account, then try again.",
    authSessionFailed: "Could not start your session. Please try again.",
    userAlreadyExists: "An account with this email already exists",
    registrationFailed: "Registration failed",
    resetFailed: "Reset failed. The link may have expired.",
    invalidToken:
      "Invalid or missing reset token. Please request a new reset link.",
    continueWithGoogle: "Continue with Google",
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
    showPassword: "Show password",
    hidePassword: "Hide password",
  },
  authFeatures: {
    oneScriptTag: "One script tag \u2014 live in minutes",
    languages: "41 languages including RTL",
    wcagReady: "WCAG 2.1 AA & EAA 2025 ready",
    featureDarkMode: "Dark Mode",
    featureBlueLightFilter: "Blue Light Filter",
    featureTextResizing: "Larger Text",
    featureTextAlign: "Text Alignment",
    featureLineHeight: "Line Height",
    featureTextSpacing: "Text Spacing",
    featureScreenReader: "Screen Reader",
    featureDyslexiaFont: "Dyslexia Mode",
    featureReadingMask: "Reading Mask",
    featureReadingGuide: "Reading Guide",
    featureContentMagnifier: "Magnifier",
    featureHighlightLinks: "Link Selection",
    featureHighlightTitles: "Highlight Titles",
    featureHideImages: "Hide Images",
    featurePauseAnimations: "Stop Animation",
    featureCursorEnhancement: "Cursor",
    featureColorBlindMode: "Color Blind",
    featureSaturation: "Contrast+",
    featureFocusHighlight: "Focus Indicator",
    featureLargeClickTargets: "Large Targets",
    featureSlowCursor: "Slow Cursor",
    featureSkipNavigation: "Skip to Main",
    featureMuteMedia: "Mute Media",
    featureKeyboardNavigation: "Keyboard Nav",
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
    name: "Alex T.",
    role: "Product Manager, US Tech",
  },
  authBrand: {
    makeAccessible: "Make your website\naccessible to everyone.",
    makeAccessibleDesc:
      "Add real accessibility features to any site in under 5 minutes.",
    joinSites: "Join thousands of sites\nmaking the web inclusive.",
    joinSitesDesc:
      "7-day free trial. No credit card required. Up and running in under 5 minutes.",
    standards: "Standards",
  },
  settings: {
    title: "Account",
    titleDesc: "Manage your profile and account settings.",
    account: "Account",
    profile: "Profile",
    changePassword: "Change Password",
    billing: "Billing",
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
    deleteAccountPlaceholder: "Type delete to confirm",
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
  legal: {
    termsTitle: "Terms of Use",
    termsLastUpdated: "Last updated: April 2026",
    termsIntro:
      "These Terms of Use govern your access to and use of the inculva platform, website, and services. By using our services, you agree to be bound by these terms.",
    termsAcceptanceTitle: "1. Acceptance of Terms",
    termsAcceptanceP1:
      "By accessing or using inculva\u2019s services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, you may not use our services.",
    termsServicesTitle: "2. Description of Services",
    termsServicesP1:
      "inculva provides web accessibility tools and services, including an accessibility widget, WCAG compliance scanning, accessibility statement generation, a knowledge base, and a management dashboard.",
    termsAccountTitle: "3. Account Registration",
    termsAccountP1:
      "To use certain features, you must create an account with accurate, current, and complete information. You are responsible for maintaining the confidentiality of your credentials and for all activities under your account.",
    termsUseTitle: "4. Acceptable Use",
    termsUseP1:
      "You agree not to use our services to violate any laws, infringe upon the rights of others, transmit harmful content, attempt unauthorized access to our systems, or interfere with the integrity of our services.",
    termsIpTitle: "5. Intellectual Property",
    termsIpP1:
      "All content, features, and functionality of our services are the exclusive property of inculva and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written consent.",
    termsLiabilityTitle: "6. Limitation of Liability",
    termsLiabilityP1:
      "To the maximum extent permitted by law, inculva shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our services are provided on an \u201Cas is\u201D basis without warranties of any kind.",
    termsTerminationTitle: "7. Termination",
    termsTerminationP1:
      "We may suspend or terminate your account if you violate these terms. You may terminate your account at any time by contacting us. Upon termination, your right to use the services will immediately cease.",
    termsChangesTitle: "8. Changes to Terms",
    termsChangesP1:
      "We may update these Terms of Use from time to time. Continued use of our services after changes constitutes acceptance of the new terms.",
    termsContactTitle: "9. Contact Us",
    termsContactP1:
      "If you have any questions about these Terms of Use, please contact us at",
    privacyTitle: "Privacy Policy",
    privacyLastUpdated: "Last updated: March 2026",
    privacyIntro:
      "At inculva, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.",
    privacyCollectTitle: "1. Information We Collect",
    privacyCollectP1:
      "We collect personal information you voluntarily provide (name, email, company, website URL, billing information) and automatically collected data (IP address, browser type, operating system, usage patterns).",
    privacyUseTitle: "2. How We Use Your Information",
    privacyUseP1:
      "We use the information we collect to provide, operate, and improve our services, communicate with you, process transactions, and prevent fraud.",
    privacySharingTitle: "3. Data Sharing and Disclosure",
    privacySharingP1:
      "We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us, to comply with legal obligations, or to protect our rights.",
    privacySecurityTitle: "4. Data Security",
    privacySecurityP1:
      "We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.",
    privacyCookiesTitle: "5. Cookies",
    privacyCookiesP1:
      "We use cookies for authentication purposes only \u2014 no tracking, no advertising, no third-party analytics. You can instruct your browser to refuse all cookies.",
    privacyRightsTitle: "6. Your Rights",
    privacyRightsP1:
      "Depending on your location, you may have the right to access, correct, delete, restrict processing, or port your personal data. Contact us to exercise these rights.",
    privacyChangesTitle: "7. Changes to This Policy",
    privacyChangesP1:
      "We may update this Privacy Policy from time to time. We will notify you of changes by posting the updated policy on this page.",
    privacyContactTitle: "8. Contact Us",
    privacyContactP1:
      "If you have any questions about this Privacy Policy, please contact us at",
    contactEmail: "hi@inculva.com",
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
    savedLabel: "Changes saved successfully.",
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
    intervalMonthly: "Monthly",
    intervalYearly: "Yearly",
    freeTrialEnded: "Your free trial has ended",
    freeTrialEndedDesc:
      "Subscribe to a plan below to continue using the accessibility widget on your sites.",
    choosePlan: "Choose a plan",
    choosePlanDesc: "Start now. You can end your plan at anytime.",
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
    yearly: "Yearly",
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
    needsReview: "Needs Review",
    needsManualReview: "Needs Manual Review",
    needsManualReviewDesc:
      "These elements could not be automatically verified. A human reviewer should check them to confirm compliance.",
    reviewReason: "Why manual review is needed",
    wcagDocument: "WCAG {wcag} understanding document",
    instances: "instances",
    scanHistory: "Scan History",
    noScanHistory: "No scans yet. Run your first scan to see results here.",
    scanTab: "Scan",
    historyTab: "History",
    singlePage: "Single Page",
    fullSite: "Full Site Scan",
    fullSiteDesc:
      "Crawls your entire site and scans every page for WCAG violations",
    pageLimit: "Up to {count} pages",
    crawlProgress: "Scanning page {current} of {total}\u2026",
    pagesScanned: "{count} pages scanned",
    scanType: "Scan Type",
    reportTitle: "Accessibility Compliance Report",
    methodology: "How this score is calculated",
    methodologyDesc:
      "This scan uses axe-core, an open-source WCAG testing engine by Deque Systems. Each page is rendered in a real browser (Chromium) with JavaScript enabled, then evaluated against {ruleCount} accessibility rules mapped to WCAG {level} success criteria. The compliance score is weighted by severity: critical violations (4x), serious (3x), moderate (2x), minor (1x), normalized against total checks.",
    wcagPrinciples: "WCAG Compliance by Principle",
    perceivable: "Perceivable",
    perceivableDesc:
      "Content must be presentable to users in ways they can perceive",
    operable: "Operable",
    operableDesc: "UI components and navigation must be operable",
    understandable: "Understandable",
    understandableDesc:
      "Information and operation of UI must be understandable",
    robust: "Robust",
    robustDesc:
      "Content must be robust enough to be interpreted by assistive technologies",
    passedChecks: "Passed Checks",
    passedChecksDesc:
      "These accessibility rules were evaluated and passed successfully",
    rulesPassed: "{count} rules passed",
    elementsChecked: "{count} elements checked",
    noViolations: "No violations detected",
    scanSummary: "Scan Summary",
    wcagLevel: "WCAG Level",
    rulesEvaluated: "Rules Evaluated",
    scanDuration: "Duration",
    scannedPages: "Scanned Pages",
    scannedPagesDesc:
      "All pages discovered and scanned during this full site scan",
    pageCompleted: "completed",
    pageFailed: "failed",
    showAllPages: "Show all {count} pages",
    showFewerPages: "Show fewer",
    learnMore: "Learn more",
    wcagKbArticleGeneric: "WCAG knowledge article",
    bestPractice: "Best Practice",
    cssSelector: "CSS Selector",
    passed: "passed",
    failedStatus: "failed",
    rules: "rules",
    elements: "elements",
    showSummary: "Show summary",
    showAllPassedRules: "Show all {count} passed rules",
    perceivableCategory: "Perceivable (1.x)",
    operableCategory: "Operable (2.x)",
    understandableCategory: "Understandable (3.x)",
    robustCategory: "Robust (4.x)",
    statusCompleted: "Completed",
    statusFailed: "Failed",
    statusScanning: "Scanning",
    statusCrawling: "Crawling",
    statusPending: "Pending",
    pagesAbbrev: "pg",
    scanFailed: "Scan failed",
    fetchStatusFailed: "Failed to fetch scan status",
    apiErrorDailyLimitReached:
      "Daily scan limit reached. Upgrade your plan or try again tomorrow.",
    apiErrorRateLimitReached: "Too many scans — try again in a few minutes.",
    apiErrorUnauthorized: "Please sign in to run a scan.",
    apiErrorSiteNotFound: "Site not found.",
    apiErrorUrlRequired: "Please enter a URL.",
    apiErrorInvalidUrl: "Invalid URL.",
    apiErrorDomainMismatch: "URL must match this site's domain.",
    wcagDocs: "WCAG docs",
    pageOf: "Page {current} of {total}",
    prev: "Previous",
    next: "Next",
    totalScans: "{count} scans",
  },
  statement: {
    hostedTitle: "Hosted Accessibility Statement",
    hostedDesc:
      "inculva hosts your accessibility statement automatically \u2014 no self-hosting required. Copy the URL below and use it as your accessibilityStatementUrl in the widget config.",
    copyUrl: "Copy URL",
    copied: "Copied!",
    preview: "Preview",
    hidePreview: "Hide Preview",
    previewIframeTitle: "Accessibility statement preview",
    eaaTitle: "EAA Article 13 Compliance",
    eaaDesc:
      "The European Accessibility Act (EAA) requires all digital products and services to publish an accessibility statement. Generate one below, host it on your site, then paste the URL in the widget config to link it from your widget.",
    detailsTitle: "Statement Details",
    contactName: "Contact Name",
    contactNamePlaceholder: "Jane Smith",
    contactEmail: "Contact Email",
    conformanceLevel: "Conformance Level",
    conformanceLevelA: "WCAG 2.1 Level A",
    conformanceLevelAA: "WCAG 2.1 Level AA (EAA required)",
    conformanceLevelAAA: "WCAG 2.1 Level AAA",
    reviewDate: "Review Date",
    knownLimitations: "Known Limitations (optional)",
    knownLimitationsPlaceholder:
      "Describe any known accessibility barriers and your plan to fix them...",
    downloadHtml: "Download HTML",
    linkInWidget: "Link in Widget",
    linkInWidgetDesc:
      "After hosting the HTML file on your site (or using the hosted URL above), add the URL below so it appears as a link in the widget panel footer.",
    statementUrl: "Accessibility Statement URL",
    statementUrlPlaceholder:
      "https://example.com/accessibility or use hosted URL above",
    saveUrl: "Save URL",
    saving: "Saving\u2026",
    saved: "Changes saved successfully.",
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
      "An accessibility widget (powered by inculva) is embedded on this site to provide on-demand assistive features including text resizing, high contrast, dyslexia-friendly fonts, keyboard navigation, screen reader support, and more.",
    feedbackAndContactTitle: "Feedback and Contact",
    feedbackAndContactBody:
      "We welcome your feedback on the accessibility of {siteName}. If you experience accessibility barriers, please contact the site owner directly via {email}.",
    feedbackIntro:
      "We welcome your feedback on the accessibility of {siteName}. If you experience accessibility barriers, please contact us:",
    contactNameLabel: "Name:",
    contactEmailLabel: "Email:",
    contactWebsiteLabel: "Website:",
    responseTime:
      "We try to respond to accessibility feedback within 2 business days.",
    enforcementTitle: "Enforcement Procedure",
    enforcementBody:
      "If you are not satisfied with our response, you may contact the relevant national supervisory body responsible for enforcing the European Accessibility Act in your country.",
    footerPrepared:
      "This accessibility statement was prepared in accordance with {directive} (European Accessibility Act) and WCAG 2.1.",
    footerDirectiveName: "Directive (EU) 2019/882",
    footerPowered: "Powered by {inculva} accessibility platform.",
    footerGenerated: "Statement generated by {inculva} on {date}.",
    conformanceBodyGeneric:
      "We aim for WCAG 2.1 Level {level} conformance, as defined by the Web Content Accessibility Guidelines (WCAG) 2.1.",
    conformanceEaaNote:
      "This meets the requirements of the European Accessibility Act (EAA) and EN 301 549.",
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
  statistics: {
    lastDays: "Last {days} Days",
    exportExcel: "Export Excel",
    widgetLoads: "Widget Loads",
    widgetOpens: "Widget Opens",
    featureActivations: "Feature Activations",
    noEventsYet:
      "No events yet. Embed the widget on your site to start tracking.",
    feature: "Feature",
    recentEvents: "Recent Events",
    event: "Event",
    time: "Time",
    detail: "Detail",
    eventOpened: "Opened",
    eventClosed: "Closed",
    eventFeatureEnabled: "Feature enabled",
    eventFeatureDisabled: "Feature disabled",
    eventProfileActivated: "Profile activated",
  },
  siteTabs: {
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
    saved: "Changes saved successfully.",
    vision: "Vision",
    reading: "Reading",
    motor: "Motor",
    calm: "Calm",
    failedToSave: "Failed to save \u2014 please try again",
    networkError: "Network error \u2014 please check your connection",
  },
  statisticsPage: {
    featureUsage: "Feature Usage",
    profileUsage: "Accessibility Profile Usage",
    featureTextResizing: "Text Resizing",
    featureTextAlign: "Text Alignment",
    featureReadingGuide: "Reading Guide",
    featureTextSpacing: "Text Spacing",
    featureScreenReader: "Screen Reader",
    featureDyslexiaFont: "Dyslexia Font",
    featureReadingMask: "Reading Mask",
    featureCursorEnhancement: "Big Cursor",
    featureHighlightLinks: "Highlight Links",
    featureFocusHighlight: "Focus Indicator",
    featurePauseAnimations: "Pause Animations",
    featureColorBlindMode: "Color Blind Mode",
    featureMuteMedia: "Mute Media",
    featureSkipNavigation: "Skip Navigation",
    featureSaturation: "Contrast+",
    featureKeyboardNavigation: "Keyboard Nav",
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
  support: {
    title: "Support",
    titleDesc:
      "Have a question or issue? Send us a message and we'll get back to you as soon as possible.",
    nameLabel: "Full name",
    namePlaceholder: "Jane Smith",
    emailLabel: "Email address",
    emailPlaceholder: "jane@example.com",
    subjectLabel: "Subject",
    subjectPlaceholder: "Brief description of your issue",
    categoryLabel: "Category",
    categoryGeneral: "General inquiry",
    categoryBug: "Bug report",
    categoryFeature: "Feature request",
    categoryBilling: "Billing",
    categoryAccessibility: "Accessibility",
    messageLabel: "Message",
    messagePlaceholder: "Describe your issue or question in detail\u2026",
    submit: "Send message",
    submitting: "Sending\u2026",
    successTitle: "Message sent!",
    successDesc:
      "Thank you for reaching out. We\u2019ll get back to you within 1\u20132 business days.",
    sendAnother: "Send another message",
    errorTitle: "Something went wrong",
    errorDesc:
      "Your message could not be sent. Please try again or email us directly at hi@inculva.com.",
    nameRequired: "Name is required.",
    emailRequired: "Email is required.",
    emailInvalid: "Please enter a valid email address.",
    subjectRequired: "Subject is required.",
    categoryRequired: "Please select a category.",
    messageRequired: "Message is required.",
    messageMinLength: "Message must be at least 10 characters.",
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
    wcagScan: "WCAG Tarama",
    statement: "Beyanname",
    notifications: "Bildirimler",
    deleteSite: "Siteyi Sil",
    newSite: "Yeni Site",
    support: "Destek",
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
    createAccount: "Hesap olu\u015Ftur",
    creatingAccount: "Hesap olu\u015Fturuluyor\u2026",
    backToSignIn: "Giri\u015Fe d\u00F6n",
    noAccount: "Hesab\u0131n\u0131z yok mu?",
    haveAccount: "Zaten hesab\u0131n\u0131z var m\u0131?",
    rememberPassword: "Hat\u0131rlad\u0131n\u0131z m\u0131?",
    signUpFree: "Kay\u0131t ol",
    welcomeBack: "Tekrar ho\u015F geldiniz",
    welcomeBackDesc:
      "Eri\u015Filebilir sitelerinizi y\u00F6netmek i\u00E7in giri\u015F yap\u0131n.",
    passwordResetSuccess:
      "\u015Eifre ba\u015Far\u0131yla g\u00FCncellendi. Yeni \u015Fifrenizle giri\u015F yap\u0131n.",
    createYourAccount: "Hesab\u0131n\u0131z\u0131 olu\u015Fturun",
    createAccountDesc:
      "7 g\u00FCnl\u00FCk \u00FCcretsiz deneme. Kredi kart\u0131 gerekmez.",
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
    invalidEmailOrPassword: "E-posta veya \u015Fifre hatal\u0131",
    invalidEmailApi: "Ge\u00E7ersiz e-posta adresi",
    emailNotVerified:
      "E-posta do\u011Frulanmad\u0131. Hesab\u0131n\u0131z\u0131 do\u011Frulamak i\u00E7in g\u00F6nderdi\u011Fimiz ba\u011Flant\u0131y\u0131 a\u00E7\u0131n, ard\u0131ndan tekrar deneyin.",
    authSessionFailed:
      "Oturum ba\u015Flat\u0131lamad\u0131. L\u00FCtfen tekrar deneyin.",
    userAlreadyExists: "Bu e-posta ile zaten bir hesap var",
    registrationFailed: "Kay\u0131t ba\u015Far\u0131s\u0131z",
    resetFailed:
      "S\u0131f\u0131rlama ba\u015Far\u0131s\u0131z. Ba\u011Flant\u0131n\u0131n s\u00FCresi dolmu\u015F olabilir.",
    invalidToken:
      "Ge\u00E7ersiz veya eksik s\u0131f\u0131rlama jetonu. L\u00FCtfen yeni bir ba\u011Flant\u0131 isteyin.",
    continueWithGoogle: "Google ile devam et",
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
    showPassword: "\u015Eifreyi g\u00F6ster",
    hidePassword: "\u015Eifreyi gizle",
  },
  authFeatures: {
    oneScriptTag: "Tek script etiketi \u2014 dakikalar i\u00E7inde haz\u0131r",
    languages: "RTL dahil 41 dil",
    wcagReady: "WCAG 2.1 AA ve EAA 2025 uyumlu",
    featureDarkMode: "Karanl\u0131k Mod",
    featureBlueLightFilter: "Mavi I\u015F\u0131k Filtresi",
    featureTextResizing: "B\u00FCy\u00FCk Metin",
    featureTextAlign: "Metin Hizalama",
    featureLineHeight: "Sat\u0131r Y\u00FCksekli\u011Fi",
    featureTextSpacing: "Harf Aral\u0131\u011F\u0131",
    featureScreenReader: "Ekran Okuyucu",
    featureDyslexiaFont: "Disleksi Modu",
    featureReadingMask: "Okuma Maskesi",
    featureReadingGuide: "Okuma K\u0131lavuzu",
    featureContentMagnifier: "B\u00FCy\u00FCte\u00E7",
    featureHighlightLinks: "Ba\u011Flant\u0131lar\u0131 Vurgula",
    featureHighlightTitles: "Ba\u015Fl\u0131klar\u0131 Vurgula",
    featureHideImages: "G\u00F6rselleri Gizle",
    featurePauseAnimations: "Animasyonu Durdur",
    featureCursorEnhancement: "\u0130mle\u00E7",
    featureColorBlindMode: "Renk K\u00F6r\u00FC",
    featureSaturation: "Kontrast+",
    featureFocusHighlight: "Odak G\u00F6stergesi",
    featureLargeClickTargets: "B\u00FCy\u00FCk Hedefler",
    featureSlowCursor: "Yava\u015F \u0130mle\u00E7",
    featureSkipNavigation: "\u0130\u00E7eri\u011Fe Atla",
    featureMuteMedia: "Medyay\u0131 Sessize Al",
    featureKeyboardNavigation: "Klavye Navigasyonu",
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
    name: "Ay\u015Fe Y.",
    role: "Ürün M\u00FCd\u00FCr\u00FC, TR Tech",
  },
  authBrand: {
    makeAccessible:
      "Web sitenizi herkes i\u00E7in\neri\u015Filebilir yap\u0131n.",
    makeAccessibleDesc:
      "5 dakikadan k\u0131sa s\u00FCrede herhangi bir siteye ger\u00E7ek eri\u015Filebilirlik \u00F6zellikleri ekleyin.",
    joinSites:
      "Web\u2019i kapsay\u0131c\u0131 yapan\nbinlerce siteye kat\u0131l\u0131n.",
    joinSitesDesc:
      "7 g\u00FCnl\u00FCk \u00FCcretsiz deneme. Kredi kart\u0131 gerekmez. 5 dakikadan k\u0131sa s\u00FCrede haz\u0131r.",
    standards: "Standartlar",
  },
  settings: {
    title: "Hesap",
    titleDesc: "Profil ve hesap ayarlar\u0131n\u0131z\u0131 y\u00F6netin.",
    account: "Hesap",
    profile: "Profil",
    changePassword: "\u015Eifre De\u011Fi\u015Ftir",
    billing: "Faturalama",
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
    deleteAccountPlaceholder: "Onaylamak i\u00E7in delete yaz\u0131n",
    failedToUpdateName: "Ad g\u00fcncellenemedi",
    failedToChangePassword: "\u015eifre de\u011fi\u015ftirilemedi",
    failedToDeleteAccount: "Hesap silinemedi",
  },
  dashboard: {
    title: "Web Sitelerim",
    newSite: "Yeni site",
    noSites: "Hen\u00FCz site yok",
    noSitesDesc:
      "Alan ad\u0131n\u0131z\u0131 kay\u0131t edin ve bir g\u00F6m\u00FCl\u00FC kod al\u0131n. Eri\u015Filebilirlik widget\u0027\u0131n\u0131z 5 dakikadan k\u0131sa s\u00FCrede yay\u0131na girer.",
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
  legal: {
    termsTitle: "Kullan\u0131m Ko\u015Fullar\u0131",
    termsLastUpdated: "Son g\u00FCncelleme: Nisan 2026",
    termsIntro:
      "Bu Kullan\u0131m Ko\u015Fullar\u0131, inculva platformuna, web sitesine ve hizmetlerine eri\u015Fiminizi ve kullan\u0131m\u0131n\u0131z\u0131 d\u00FCzenler. Hizmetlerimizi kullanarak bu ko\u015Fullara ba\u011Fl\u0131 olmay\u0131 kabul edersiniz.",
    termsAcceptanceTitle: "1. Ko\u015Fullar\u0131n Kabul\u00FC",
    termsAcceptanceP1:
      "inculva hizmetlerine eri\u015Ferek veya kullanarak, bu Kullan\u0131m Ko\u015Fullar\u0131n\u0131 ve Gizlilik Politikam\u0131z\u0131 okudunuzu, anlad\u0131\u011F\u0131n\u0131z\u0131 ve bunlara ba\u011Fl\u0131 olmay\u0131 kabul etti\u011Finizi onaylars\u0131n\u0131z.",
    termsServicesTitle: "2. Hizmetlerin Tan\u0131m\u0131",
    termsServicesP1:
      "inculva; eri\u015Filebilirlik widget\u2019\u0131, WCAG uyumluluk taramas\u0131, eri\u015Filebilirlik beyan\u0131 olu\u015Fturma, bilgi bankas\u0131 ve y\u00F6netim paneli dahil web eri\u015Filebilirlik ara\u00E7lar\u0131 ve hizmetleri sunar.",
    termsAccountTitle: "3. Hesap Kayd\u0131",
    termsAccountP1:
      "Belirli \u00F6zellikleri kullanmak i\u00E7in do\u011Fru ve g\u00FCncel bilgilerle bir hesap olu\u015Fturman\u0131z gerekmektedir. Hesap kimlik bilgilerinizin gizlili\u011Finden ve hesab\u0131n\u0131z alt\u0131ndaki t\u00FCm faaliyetlerden siz sorumlusunuz.",
    termsUseTitle: "4. Kabul Edilebilir Kullan\u0131m",
    termsUseP1:
      "Hizmetlerimizi yasalar\u0131 ihlal etmek, ba\u015Fkalar\u0131n\u0131n haklar\u0131n\u0131 ihlal etmek, zararl\u0131 i\u00E7erik iletmek, sistemlerimize yetkisiz eri\u015Fim sa\u011Flamaya \u00E7al\u0131\u015Fmak veya hizmetlerimizin b\u00FCt\u00FCnl\u00FC\u011F\u00FCn\u00FC bozmak amac\u0131yla kullanmamay\u0131 kabul edersiniz.",
    termsIpTitle: "5. Fikri M\u00FClkiyet",
    termsIpP1:
      "Hizmetlerimizin t\u00FCm i\u00E7eri\u011Fi, \u00F6zellikleri ve i\u015Flevleri inculva\u2019n\u0131n m\u00FCnhas\u0131r m\u00FClkiyetindedir ve fikri m\u00FClkiyet yasalar\u0131yla korunmaktad\u0131r. \u00D6nceden yaz\u0131l\u0131 onay almadan i\u00E7eri\u011Fimizi \u00E7o\u011Faltamaz veya t\u00FCrev eserler olu\u015Fturamazs\u0131n\u0131z.",
    termsLiabilityTitle: "6. Sorumluluk S\u0131n\u0131rlamas\u0131",
    termsLiabilityP1:
      "Yasalar\u0131n izin verdi\u011Fi azami \u00F6l\u00E7\u00FCde, inculva hizmetlerimizin kullan\u0131m\u0131ndan kaynaklanan dolayl\u0131, ar\u0131zi, \u00F6zel veya sonu\u00E7 olarak ortaya \u00E7\u0131kan zararlardan sorumlu olmayacakt\u0131r. Hizmetlerimiz herhangi bir garanti olmaks\u0131z\u0131n \u201Coldu\u011Fu gibi\u201D sa\u011Flanmaktad\u0131r.",
    termsTerminationTitle: "7. Fesih",
    termsTerminationP1:
      "Bu ko\u015Fullar\u0131 ihlal etmeniz durumunda hesab\u0131n\u0131z\u0131 ask\u0131ya alabilir veya sonland\u0131rabiliriz. Hesab\u0131n\u0131z\u0131 istedi\u011Finiz zaman bizimle ileti\u015Fime ge\u00E7erek sonland\u0131rabilirsiniz.",
    termsChangesTitle: "8. Ko\u015Fullardaki De\u011Fi\u015Fiklikler",
    termsChangesP1:
      "Bu Kullan\u0131m Ko\u015Fullar\u0131n\u0131 zaman zaman g\u00FCncelleyebiliriz. De\u011Fi\u015Fikliklerden sonra hizmetlerimizi kullanmaya devam etmeniz, yeni ko\u015Fullar\u0131n kabul edildi\u011Fi anlam\u0131na gelir.",
    termsContactTitle: "9. Bize Ula\u015F\u0131n",
    termsContactP1:
      "Bu Kullan\u0131m Ko\u015Fullar\u0131 hakk\u0131nda herhangi bir sorunuz varsa, l\u00FCtfen bizimle ileti\u015Fime ge\u00E7in:",
    privacyTitle: "Gizlilik Politikas\u0131",
    privacyLastUpdated: "Son g\u00FCncelleme: Mart 2026",
    privacyIntro:
      "inculva olarak gizlili\u011Finizi korumaya kar\u0131rl\u0131y\u0131z. Bu Gizlilik Politikas\u0131, web sitemizi ziyaret etti\u011Finizde ve hizmetlerimizi kulland\u0131\u011F\u0131n\u0131zda bilgilerinizi nas\u0131l toplad\u0131\u011F\u0131m\u0131z\u0131, kulland\u0131\u011F\u0131m\u0131z\u0131 ve korudu\u011Fumuzu a\u00E7\u0131klar.",
    privacyCollectTitle: "1. Toplad\u0131\u011F\u0131m\u0131z Bilgiler",
    privacyCollectP1:
      "G\u00F6n\u00FCll\u00FC olarak sa\u011Flad\u0131\u011F\u0131n\u0131z ki\u015Fisel bilgileri (ad, e-posta, \u015Firket, web sitesi URL\u2019si, fatura bilgileri) ve otomatik olarak toplanan verileri (IP adresi, taray\u0131c\u0131 t\u00FCr\u00FC, i\u015Fletim sistemi, kullan\u0131m kal\u0131plar\u0131) toplar\u0131z.",
    privacyUseTitle: "2. Bilgilerinizi Nas\u0131l Kullan\u0131yoruz",
    privacyUseP1:
      "Toplad\u0131\u011F\u0131m\u0131z bilgileri hizmetlerimizi sa\u011Flamak, i\u015Fletmek ve iyile\u015Ftirmek, sizinle ileti\u015Fim kurmak, i\u015Flemleri ger\u00E7ekle\u015Ftirmek ve doland\u0131r\u0131c\u0131l\u0131\u011F\u0131 \u00F6nlemek i\u00E7in kullan\u0131r\u0131z.",
    privacySharingTitle:
      "3. Veri Payla\u015F\u0131m\u0131 ve A\u00E7\u0131klama",
    privacySharingP1:
      "Ki\u015Fisel bilgilerinizi \u00FC\u00E7\u00FCnc\u00FC taraflara satm\u0131yor, takas etmiyor veya kirlam\u0131yoruz. Bilgilerinizi yaln\u0131zca bize yard\u0131mc\u0131 olan hizmet sa\u011Flay\u0131c\u0131larla, yasal y\u00FCk\u00FCml\u00FCl\u00FCklere uymak veya haklar\u0131m\u0131z\u0131 korumak i\u00E7in payla\u015Fabiliriz.",
    privacySecurityTitle: "4. Veri G\u00FCvenli\u011Fi",
    privacySecurityP1:
      "Ki\u015Fisel bilgilerinizi korumak i\u00E7in uygun teknik ve organizasyonel g\u00FCvenlik \u00F6nlemleri uyguluyor\u0131z. Ancak internet \u00FCzerinden hi\u00E7bir iletim y\u00F6ntemi %100 g\u00FCvenli de\u011Fildir.",
    privacyCookiesTitle: "5. \u00C7erezler",
    privacyCookiesP1:
      "\u00C7erezleri yaln\u0131zca kimlik do\u011Frulama ama\u00E7l\u0131 kullan\u0131yoruz \u2014 izleme, reklam veya \u00FC\u00E7\u00FCnc\u00FC taraf analiti\u011Fi yok. Taray\u0131c\u0131n\u0131za t\u00FCm \u00E7erezleri reddetmesi talimat\u0131 verebilirsiniz.",
    privacyRightsTitle: "6. Haklar\u0131n\u0131z",
    privacyRightsP1:
      "Bulundu\u011Funuz konuma ba\u011Fl\u0131 olarak, ki\u015Fisel verilerinize eri\u015Fme, d\u00FCzeltme, silme, i\u015Flemeyi k\u0131s\u0131tlama veya ta\u015F\u0131ma hakk\u0131na sahip olabilirsiniz. Bu haklar\u0131n\u0131z\u0131 kullanmak i\u00E7in bizimle ileti\u015Fime ge\u00E7in.",
    privacyChangesTitle: "7. Bu Politikadaki De\u011Fi\u015Fiklikler",
    privacyChangesP1:
      "Bu Gizlilik Politikas\u0131n\u0131 zaman zaman g\u00FCncelleyebiliriz. G\u00FCncellenmi\u015F politikay\u0131 bu sayfada yay\u0131nlayarak sizi de\u011Fi\u015Fikliklerden haberdar edece\u011Fiz.",
    privacyContactTitle: "8. Bize Ula\u015F\u0131n",
    privacyContactP1:
      "Bu Gizlilik Politikas\u0131 hakk\u0131nda herhangi bir sorunuz varsa, l\u00FCtfen bizimle ileti\u015Fime ge\u00E7in:",
    contactEmail: "hi@inculva.com",
  },
  config: {
    embedCode: "G\u00F6m\u00FCl\u00FC Kod",
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
    savedLabel: "Değişiklikler başarıyla kaydedildi.",
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
    intervalMonthly: "Ayl\u0131k",
    intervalYearly: "Y\u0131ll\u0131k",
    freeTrialEnded: "\u00DCcretsiz denemeniz sona erdi",
    freeTrialEndedDesc:
      "Sitelerinizde eri\u015Filebilirlik widget\u0027\u0131n\u0131 kullanmaya devam etmek i\u00E7in a\u015Fa\u011F\u0131dan bir plana abone olun.",
    choosePlan: "Bir plan se\u00E7in",
    choosePlanDesc:
      "Hemen ba\u015Flay\u0131n. Plan\u0131n\u0131z\u0131 istedi\u011Finiz zaman sonland\u0131rabilirsiniz.",
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
    yearly: "Y\u0131ll\u0131k",
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
    needsReview: "\u0130nceleme Gerekli",
    needsManualReview: "Manuel \u0130nceleme Gerekli",
    needsManualReviewDesc:
      "Bu \u00F6\u011Feler otomatik olarak do\u011Frulanamad\u0131. Uyumlulu\u011Fu onaylamak i\u00E7in bir ki\u015Finin kontrol etmesi gerekir.",
    reviewReason: "Neden manuel inceleme gerekli",
    wcagDocument: "WCAG {wcag} anlama belgesi",
    instances: "\u00F6rnek",
    scanHistory: "Tarama Ge\u00E7mi\u015Fi",
    noScanHistory:
      "Hen\u00FCz tarama yok. Sonu\u00E7lar\u0131 burada g\u00F6rmek i\u00E7in ilk taraman\u0131z\u0131 ba\u015Flat\u0131n.",
    scanTab: "Tarama",
    historyTab: "Ge\u00E7mi\u015F",
    singlePage: "Tek Sayfa",
    fullSite: "Tam Site Taramas\u0131",
    fullSiteDesc:
      "T\u00FCm sitenizi tarar ve her sayfay\u0131 WCAG ihlalleri i\u00E7in kontrol eder",
    pageLimit: "{count} sayfaya kadar",
    crawlProgress: "Sayfa {current} / {total} taran\u0131yor\u2026",
    pagesScanned: "{count} sayfa tarand\u0131",
    scanType: "Tarama T\u00FCr\u00FC",
    reportTitle: "Eri\u015Filebilirlik Uyumluluk Raporu",
    methodology: "Bu skor nas\u0131l hesaplan\u0131r",
    methodologyDesc:
      "Bu tarama, Deque Systems taraf\u0131ndan geli\u015Ftirilen a\u00E7\u0131k kaynak WCAG test motoru axe-core kullan\u0131r. Her sayfa ger\u00E7ek bir taray\u0131c\u0131da (Chromium) JavaScript etkin olarak render edilir, ard\u0131ndan WCAG {level} ba\u015Far\u0131 kriterlerine e\u015Flenen {ruleCount} eri\u015Filebilirlik kural\u0131na g\u00F6re de\u011Ferlendirilir. Uyumluluk skoru ciddiyet a\u011F\u0131rl\u0131kl\u0131d\u0131r: kritik ihlaller (4x), ciddi (3x), orta (2x), k\u00FC\u00E7\u00FCk (1x), toplam kontrollere g\u00F6re normalize edilir.",
    wcagPrinciples: "WCAG \u0130lkelerine G\u00F6re Uyumluluk",
    perceivable: "Alg\u0131lanabilir",
    perceivableDesc:
      "\u0130\u00E7erik kullan\u0131c\u0131lara alg\u0131layabilecekleri \u015Fekillerde sunulmal\u0131d\u0131r",
    operable: "\u00C7al\u0131\u015Ft\u0131r\u0131labilir",
    operableDesc:
      "Kullan\u0131c\u0131 aray\u00FCz\u00FC bile\u015Fenleri ve gezinme \u00E7al\u0131\u015Ft\u0131r\u0131labilir olmal\u0131d\u0131r",
    understandable: "Anla\u015F\u0131labilir",
    understandableDesc:
      "Bilgi ve kullan\u0131c\u0131 aray\u00FCz\u00FC i\u015Fletimi anla\u015F\u0131labilir olmal\u0131d\u0131r",
    robust: "Sa\u011Flam",
    robustDesc:
      "\u0130\u00E7erik yard\u0131mc\u0131 teknolojiler taraf\u0131ndan yorumlanabilecek kadar sa\u011Flam olmal\u0131d\u0131r",
    passedChecks: "Ge\u00E7en Kontroller",
    passedChecksDesc:
      "Bu eri\u015Filebilirlik kurallar\u0131 de\u011Ferlendirildi ve ba\u015Far\u0131yla ge\u00E7ti",
    rulesPassed: "{count} kural ge\u00E7ti",
    elementsChecked: "{count} \u00F6\u011Fe kontrol edildi",
    noViolations: "\u0130hlal tespit edilmedi",
    scanSummary: "Tarama \u00D6zeti",
    wcagLevel: "WCAG Seviyesi",
    rulesEvaluated: "De\u011Ferlendirilen Kurallar",
    scanDuration: "S\u00FCre",
    scannedPages: "Taranan Sayfalar",
    scannedPagesDesc:
      "Bu tam site taramas\u0131nda ke\u015Ffedilen ve taranan t\u00FCm sayfalar",
    pageCompleted: "tamamland\u0131",
    pageFailed: "ba\u015Far\u0131s\u0131z",
    showAllPages: "T\u00FCm {count} sayfay\u0131 g\u00F6ster",
    showFewerPages: "Daha az g\u00F6ster",
    learnMore: "Daha fazla bilgi",
    wcagKbArticleGeneric: "WCAG bilgi makalesi",
    bestPractice: "En \u0130yi Uygulama",
    cssSelector: "CSS Se\u00E7ici",
    passed: "ge\u00E7ti",
    failedStatus: "ba\u015Far\u0131s\u0131z",
    rules: "kural",
    elements: "\u00F6\u011Fe",
    showSummary: "\u00D6zeti g\u00F6ster",
    showAllPassedRules: "T\u00FCm {count} ge\u00E7en kural\u0131 g\u00F6ster",
    perceivableCategory: "Alg\u0131lanabilir (1.x)",
    operableCategory: "\u00C7al\u0131\u015Ft\u0131r\u0131labilir (2.x)",
    understandableCategory: "Anla\u015F\u0131labilir (3.x)",
    robustCategory: "Sa\u011Flam (4.x)",
    statusCompleted: "Tamamland\u0131",
    statusFailed: "Ba\u015Far\u0131s\u0131z",
    statusScanning: "Taran\u0131yor",
    statusCrawling: "Taran\u0131yor",
    statusPending: "Bekliyor",
    pagesAbbrev: "sf",
    scanFailed: "Tarama ba\u015Far\u0131s\u0131z",
    fetchStatusFailed: "Tarama durumu al\u0131namad\u0131",
    apiErrorDailyLimitReached:
      "G\u00FCnl\u00FCk tarama limitine ula\u015F\u0131ld\u0131. Plan\u0131n\u0131z\u0131 y\u00FCkseltin veya yar\u0131n tekrar deneyin.",
    apiErrorRateLimitReached:
      "\u00C7ok fazla tarama iste\u011Fi \u2014 birka\u00E7 dakika sonra tekrar deneyin.",
    apiErrorUnauthorized:
      "Tarama ba\u015Flatmak i\u00E7in giri\u015F yap\u0131n.",
    apiErrorSiteNotFound: "Site bulunamad\u0131.",
    apiErrorUrlRequired: "L\u00FCtfen bir URL girin.",
    apiErrorInvalidUrl: "Ge\u00E7ersiz URL.",
    apiErrorDomainMismatch:
      "URL bu sitenin alan ad\u0131yla e\u015Fle\u015Fmelidir.",
    wcagDocs: "WCAG belgeleri",
    pageOf: "Sayfa {current} / {total}",
    prev: "\u00D6nceki",
    next: "Sonraki",
    totalScans: "{count} tarama",
  },
  statement: {
    hostedTitle: "Bar\u0131nd\u0131r\u0131lan Eri\u015Filebilirlik Beyannamesi",
    hostedDesc:
      "inculva eri\u015Filebilirlik beyannamenizi otomatik olarak bar\u0131nd\u0131r\u0131r \u2014 kendi sunucunuz gerekmez. A\u015Fa\u011F\u0131daki URL\u2019yi kopyalay\u0131n ve widget yap\u0131land\u0131rman\u0131zda accessibilityStatementUrl olarak kullan\u0131n.",
    copyUrl: "URL\u2019yi Kopyala",
    copied: "Kopyaland\u0131!",
    preview: "\u00D6nizleme",
    hidePreview: "\u00D6nizlemeyi Gizle",
    previewIframeTitle: "Eri\u015Filebilirlik beyannamesi \u00F6nizlemesi",
    eaaTitle: "EAA Madde 13 Uyumlulu\u011Fu",
    eaaDesc:
      "Avrupa Eri\u015Filebilirlik Yasas\u0131 (EAA), t\u00FCm dijital \u00FCr\u00FCn ve hizmetlerin bir eri\u015Filebilirlik beyannamesi yay\u0131nlamas\u0131n\u0131 gerektirir. A\u015Fa\u011F\u0131da bir tane olu\u015Fturun, sitenizde bar\u0131nd\u0131r\u0131n, ard\u0131ndan URL\u2019yi widget yap\u0131land\u0131rmas\u0131na yap\u0131\u015Ft\u0131r\u0131n.",
    detailsTitle: "Beyanname Detaylar\u0131",
    contactName: "\u0130leti\u015Fim Ad\u0131",
    contactNamePlaceholder: "Ad\u0131 Soyad\u0131",
    contactEmail: "\u0130leti\u015Fim E-postas\u0131",
    conformanceLevel: "Uygunluk Seviyesi",
    conformanceLevelA: "WCAG 2.1 Seviye A",
    conformanceLevelAA: "WCAG 2.1 Seviye AA (EAA gerekli)",
    conformanceLevelAAA: "WCAG 2.1 Seviye AAA",
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
    statementUrlPlaceholder:
      "https://ornek.com/erisim veya yukar\u0131daki bar\u0131nd\u0131r\u0131lan URL\u2019yi kullan\u0131n",
    saveUrl: "URL\u2019yi Kaydet",
    saving: "Kaydediliyor\u2026",
    saved: "Değişiklikler başarıyla kaydedildi.",
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
    complianceWorkBegan:
      "Uyum \u00E7al\u0131\u015Fmalar\u0131 ba\u015Flang\u0131c\u0131:",
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
      "Bu sitede, metin b\u00FCy\u00FCtme, y\u00FCksek kontrast, disleksi dostu yaz\u0131 tipleri, klavye ile gezinme, ekran okuyucu deste\u011Fi ve daha fazlas\u0131 gibi iste\u011Fe ba\u011Fl\u0131 yard\u0131mc\u0131 \u00F6zellikler sunan (inculva taraf\u0131ndan desteklenen) bir eri\u015Filebilirlik widget\u2019\u0131 bulunmaktad\u0131r.",
    feedbackAndContactTitle: "Geri Bildirim ve \u0130leti\u015Fim",
    feedbackAndContactBody:
      "{siteName} sitesinin eri\u015Filebilirli\u011Fi hakk\u0131nda geri bildiriminizi memnuniyetle kar\u015F\u0131lar\u0131z. Eri\u015Filebilirlik engelleriyle kar\u015F\u0131la\u015F\u0131rsan\u0131z l\u00FCtfen do\u011Frudan site sahibiyle {email} \u00FCzerinden ileti\u015Fime ge\u00E7in.",
    feedbackIntro:
      "{siteName} sitesinin eri\u015Filebilirli\u011Fi hakk\u0131nda geri bildiriminizi memnuniyetle kar\u015F\u0131lar\u0131z. Eri\u015Filebilirlik engelleriyle kar\u015F\u0131la\u015F\u0131rsan\u0131z l\u00FCtfen bizimle ileti\u015Fime ge\u00E7in:",
    contactNameLabel: "Ad:",
    contactEmailLabel: "E-posta:",
    contactWebsiteLabel: "Web sitesi:",
    responseTime:
      "Eri\u015Filebilirlik geri bildirimlerine 2 i\u015F g\u00FCn\u00FC i\u00E7inde yan\u0131t vermeye \u00E7al\u0131\u015F\u0131yoruz.",
    enforcementTitle: "Uygulama Prosed\u00FCr\u00FC",
    enforcementBody:
      "Yan\u0131t\u0131m\u0131zdan memnun de\u011Filseniz, \u00FClkenizdeki Avrupa Eri\u015Filebilirlik Yasas\u0131\u2019n\u0131n uygulanmas\u0131ndan sorumlu ulusal denetim kurumuna ba\u015Fvurabilirsiniz.",
    footerPrepared:
      "Bu eri\u015Filebilirlik beyannamesi {directive} (Avrupa Eri\u015Filebilirlik Yasas\u0131) ve WCAG 2.1 uyar\u0131nca haz\u0131rlanm\u0131\u015Ft\u0131r.",
    footerDirectiveName: "Direktif (AB) 2019/882",
    footerPowered:
      "{inculva} eri\u015Filebilirlik platformu taraf\u0131ndan desteklenmektedir.",
    footerGenerated:
      "Beyanname {date} tarihinde {inculva} taraf\u0131ndan olu\u015Fturulmu\u015Ftur.",
    conformanceBodyGeneric:
      "Web \u0130\u00E7eri\u011Fi Eri\u015Filebilirlik Y\u00F6nergeleri (WCAG) 2.1\u2019de tan\u0131mland\u0131\u011F\u0131 \u015Fekilde WCAG 2.1 Seviye {level} uygunlu\u011Funu hedefliyoruz.",
    conformanceEaaNote:
      "Bu, Avrupa Eri\u015Filebilirlik Yasas\u0131 (EAA) ve EN 301 549 gerekliliklerini kar\u015F\u0131lar.",
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
  statistics: {
    lastDays: "Son {days} G\u00FCn",
    exportExcel: "Excel D\u0131\u015Fa Aktar",
    widgetLoads: "Widget Y\u00FCklemeleri",
    widgetOpens: "Widget A\u00E7\u0131l\u0131\u015Flar\u0131",
    featureActivations: "\u00D6zellik Etkinle\u015Ftirmeleri",
    noEventsYet:
      "Hen\u00FCz olay yok. \u0130zlemeye ba\u015Flamak i\u00E7in widget\u0027\u0131 sitenize g\u00F6m\u00FCn.",
    feature: "\u00D6zellik",
    recentEvents: "Son Olaylar",
    event: "Olay",
    time: "Zaman",
    detail: "Detay",
    eventOpened: "A\u00E7\u0131ld\u0131",
    eventClosed: "Kapat\u0131ld\u0131",
    eventFeatureEnabled: "\u00D6zellik etkinle\u015Ftirildi",
    eventFeatureDisabled:
      "\u00D6zellik devre d\u0131\u015F\u0131 b\u0131rak\u0131ld\u0131",
    eventProfileActivated: "Profil etkinle\u015Ftirildi",
  },
  siteTabs: {
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
    saved: "Değişiklikler başarıyla kaydedildi.",
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
    featureUsage: "\u00d6zellik Kullan\u0131m\u0131",
    profileUsage: "Eri\u015filebilirlik Profili Kullan\u0131m\u0131",
    featureTextResizing: "Metin Boyutland\u0131rma",
    featureTextAlign: "Metin Hizalama",
    featureReadingGuide: "Okuma Rehberi",
    featureTextSpacing: "Metin Aral\u0131\u011f\u0131",
    featureScreenReader: "Ekran Okuyucu",
    featureDyslexiaFont: "Disleksi Fontu",
    featureReadingMask: "Okuma Maskesi",
    featureCursorEnhancement: "B\u00fcy\u00fck \u0130mle\u00e7",
    featureHighlightLinks: "Ba\u011flant\u0131lar\u0131 Vurgula",
    featureFocusHighlight: "Odak G\u00f6stergesi",
    featurePauseAnimations: "Animasyonlar\u0131 Durdur",
    featureColorBlindMode: "Renk K\u00f6rl\u00fc\u011f\u00fc Modu",
    featureMuteMedia: "Medyay\u0131 Sessize Al",
    featureSkipNavigation: "Gezinmeyi Atla",
    featureSaturation: "Kontrast+",
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
  support: {
    title: "Destek",
    titleDesc:
      "Bir sorunuz veya sorununuz mu var? Bize mesaj g\u00F6nderin, en k\u0131sa s\u00FCrede size d\u00F6nece\u011Fiz.",
    nameLabel: "Ad soyad",
    namePlaceholder: "Ay\u015Fe Y\u0131lmaz",
    emailLabel: "E-posta adresi",
    emailPlaceholder: "ayse@ornek.com",
    subjectLabel: "Konu",
    subjectPlaceholder: "Sorununuzun k\u0131sa a\u00E7\u0131klamas\u0131",
    categoryLabel: "Kategori",
    categoryGeneral: "Genel soru",
    categoryBug: "Hata bildirimi",
    categoryFeature: "\u00D6zellik iste\u011Fi",
    categoryBilling: "Faturaland\u0131rma",
    categoryAccessibility: "Eri\u015Filebilirlik",
    messageLabel: "Mesaj",
    messagePlaceholder:
      "Sorununuzu veya sorunuzu ayr\u0131nt\u0131l\u0131 olarak a\u00E7\u0131klay\u0131n\u2026",
    submit: "Mesaj g\u00F6nder",
    submitting: "G\u00F6nderiliyor\u2026",
    successTitle: "Mesaj g\u00F6nderildi!",
    successDesc:
      "Bize ula\u015Ft\u0131\u011F\u0131n\u0131z i\u00E7in te\u015Fekk\u00FCrler. 1\u20132 i\u015F g\u00FCn\u00FC i\u00E7inde size d\u00F6nece\u011Fiz.",
    sendAnother: "Ba\u015Fka bir mesaj g\u00F6nder",
    errorTitle: "Bir \u015Feyler ters gitti",
    errorDesc:
      "Mesaj\u0131n\u0131z g\u00F6nderilemedi. L\u00FCtfen tekrar deneyin veya do\u011Frudan hi@inculva.com adresine e-posta g\u00F6nderin.",
    nameRequired: "Ad gereklidir.",
    emailRequired: "E-posta gereklidir.",
    emailInvalid: "L\u00FCtfen ge\u00E7erli bir e-posta adresi girin.",
    subjectRequired: "Konu gereklidir.",
    categoryRequired: "L\u00FCtfen bir kategori se\u00E7in.",
    messageRequired: "Mesaj gereklidir.",
    messageMinLength: "Mesaj en az 10 karakter olmal\u0131d\u0131r.",
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
