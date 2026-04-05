-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "plan" TEXT NOT NULL DEFAULT 'free',
    "polarCustomerId" TEXT,
    "usageAlertSent80" TIMESTAMP(3),
    "usageAlertSent100" TIMESTAMP(3),
    "dripDay3Sent" BOOLEAN NOT NULL DEFAULT false,
    "dripDay7Sent" BOOLEAN NOT NULL DEFAULT false,
    "dripDay30Sent" BOOLEAN NOT NULL DEFAULT false,
    "bannedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "polarSubscriptionId" TEXT NOT NULL,
    "polarProductId" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "interval" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "canceledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastHealthCheck" TIMESTAMP(3),
    "healthStatus" TEXT,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WidgetConfig" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "position" TEXT NOT NULL DEFAULT 'bottom-right',
    "theme" TEXT NOT NULL DEFAULT 'auto',
    "primaryColor" TEXT NOT NULL DEFAULT '#0066cc',
    "language" TEXT NOT NULL DEFAULT 'en',
    "textResizing" BOOLEAN NOT NULL DEFAULT true,
    "highContrast" BOOLEAN NOT NULL DEFAULT true,
    "dyslexiaFont" BOOLEAN NOT NULL DEFAULT true,
    "cursorEnhancement" BOOLEAN NOT NULL DEFAULT true,
    "keyboardNavigation" BOOLEAN NOT NULL DEFAULT true,
    "readingGuide" BOOLEAN NOT NULL DEFAULT true,
    "screenReader" BOOLEAN NOT NULL DEFAULT true,
    "pauseAnimations" BOOLEAN NOT NULL DEFAULT true,
    "textSpacing" BOOLEAN NOT NULL DEFAULT true,
    "highlightLinks" BOOLEAN NOT NULL DEFAULT true,
    "colorBlindMode" BOOLEAN NOT NULL DEFAULT true,
    "largeClickTargets" BOOLEAN NOT NULL DEFAULT true,
    "focusHighlight" BOOLEAN NOT NULL DEFAULT true,
    "grayscale" BOOLEAN NOT NULL DEFAULT true,
    "skipNavigation" BOOLEAN NOT NULL DEFAULT true,
    "muteMedia" BOOLEAN NOT NULL DEFAULT true,
    "readingMask" BOOLEAN NOT NULL DEFAULT true,
    "textAlign" BOOLEAN NOT NULL DEFAULT true,
    "saturation" BOOLEAN NOT NULL DEFAULT true,
    "blueLightFilter" BOOLEAN NOT NULL DEFAULT true,
    "hideImages" BOOLEAN NOT NULL DEFAULT true,
    "darkMode" BOOLEAN NOT NULL DEFAULT true,
    "contentMagnifier" BOOLEAN NOT NULL DEFAULT true,
    "toolTips" BOOLEAN NOT NULL DEFAULT true,
    "sustainabilityMode" BOOLEAN NOT NULL DEFAULT false,
    "slowCursor" BOOLEAN NOT NULL DEFAULT true,
    "dictionary" BOOLEAN NOT NULL DEFAULT false,
    "lineHeight" BOOLEAN NOT NULL DEFAULT true,
    "highlightTitles" BOOLEAN NOT NULL DEFAULT true,
    "profileAdhd" BOOLEAN NOT NULL DEFAULT true,
    "profileBlind" BOOLEAN NOT NULL DEFAULT true,
    "profileLowVision" BOOLEAN NOT NULL DEFAULT true,
    "profileColorBlind" BOOLEAN NOT NULL DEFAULT true,
    "profileDyslexia" BOOLEAN NOT NULL DEFAULT true,
    "profileMotorImpaired" BOOLEAN NOT NULL DEFAULT true,
    "profileCognitive" BOOLEAN NOT NULL DEFAULT true,
    "profileSeizure" BOOLEAN NOT NULL DEFAULT true,
    "profileParkinson" BOOLEAN NOT NULL DEFAULT true,
    "accessibilityStatementUrl" TEXT,
    "whiteLabelText" TEXT,
    "buttonSize" TEXT NOT NULL DEFAULT 'medium',
    "buttonIcon" TEXT NOT NULL DEFAULT 'universal-access',
    "lastScanViolations" INTEGER,
    "lastScanAt" TIMESTAMP(3),
    "lastComplianceScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WidgetConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WidgetEvent" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "feature" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WidgetEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WidgetLoad" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "WidgetLoad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "href" TEXT,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scan" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "trigger" TEXT NOT NULL DEFAULT 'manual',
    "maxPages" INTEGER NOT NULL DEFAULT 1,
    "wcagLevel" TEXT NOT NULL DEFAULT 'AA',
    "totalPages" INTEGER,
    "totalViolations" INTEGER,
    "totalPasses" INTEGER,
    "totalIncomplete" INTEGER,
    "complianceScore" DOUBLE PRECISION,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "errorMessage" TEXT,

    CONSTRAINT "Scan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScanPage" (
    "id" TEXT NOT NULL,
    "scanId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "violations" INTEGER,
    "passes" INTEGER,
    "incomplete" INTEGER,
    "score" DOUBLE PRECISION,
    "errorMessage" TEXT,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScanPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScanIssue" (
    "id" TEXT NOT NULL,
    "scanId" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "wcag" TEXT NOT NULL,
    "wcagLevel" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "selector" TEXT,
    "html" TEXT,
    "helpUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'open',
    "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fixedAt" TIMESTAMP(3),
    "fixSuggestion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScanIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScanPassedRule" (
    "id" TEXT NOT NULL,
    "scanId" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "helpText" TEXT,
    "wcag" TEXT NOT NULL,
    "wcagLevel" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "helpUrl" TEXT,
    "nodeCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScanPassedRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScanIncomplete" (
    "id" TEXT NOT NULL,
    "scanId" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "wcag" TEXT NOT NULL,
    "wcagLevel" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "selector" TEXT,
    "html" TEXT,
    "helpUrl" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScanIncomplete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplianceSnapshot" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "violations" INTEGER NOT NULL,
    "passes" INTEGER NOT NULL,
    "scanId" TEXT,

    CONSTRAINT "ComplianceSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScanSchedule" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "frequency" TEXT NOT NULL DEFAULT 'weekly',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "lastRunAt" TIMESTAMP(3),
    "nextRunAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScanSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_polarCustomerId_key" ON "User"("polarCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_accountId_key" ON "Account"("providerId", "accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_identifier_value_key" ON "Verification"("identifier", "value");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_polarSubscriptionId_key" ON "Subscription"("polarSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Site_domain_key" ON "Site"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "WidgetConfig_siteId_key" ON "WidgetConfig"("siteId");

-- CreateIndex
CREATE INDEX "WidgetEvent_siteId_idx" ON "WidgetEvent"("siteId");

-- CreateIndex
CREATE INDEX "WidgetEvent_siteId_createdAt_idx" ON "WidgetEvent"("siteId", "createdAt");

-- CreateIndex
CREATE INDEX "WidgetLoad_siteId_date_idx" ON "WidgetLoad"("siteId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "WidgetLoad_siteId_domain_date_key" ON "WidgetLoad"("siteId", "domain", "date");

-- CreateIndex
CREATE INDEX "Notification_userId_createdAt_idx" ON "Notification"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Notification_userId_readAt_idx" ON "Notification"("userId", "readAt");

-- CreateIndex
CREATE INDEX "Scan_siteId_createdAt_idx" ON "Scan"("siteId", "createdAt");

-- CreateIndex
CREATE INDEX "Scan_siteId_status_idx" ON "Scan"("siteId", "status");

-- CreateIndex
CREATE INDEX "ScanPage_scanId_idx" ON "ScanPage"("scanId");

-- CreateIndex
CREATE UNIQUE INDEX "ScanPage_scanId_url_key" ON "ScanPage"("scanId", "url");

-- CreateIndex
CREATE INDEX "ScanIssue_siteId_ruleId_selector_idx" ON "ScanIssue"("siteId", "ruleId", "selector");

-- CreateIndex
CREATE INDEX "ScanIssue_scanId_idx" ON "ScanIssue"("scanId");

-- CreateIndex
CREATE INDEX "ScanIssue_pageId_idx" ON "ScanIssue"("pageId");

-- CreateIndex
CREATE INDEX "ScanIssue_siteId_status_idx" ON "ScanIssue"("siteId", "status");

-- CreateIndex
CREATE INDEX "ScanPassedRule_scanId_idx" ON "ScanPassedRule"("scanId");

-- CreateIndex
CREATE INDEX "ScanPassedRule_pageId_idx" ON "ScanPassedRule"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "ScanPassedRule_scanId_pageId_ruleId_key" ON "ScanPassedRule"("scanId", "pageId", "ruleId");

-- CreateIndex
CREATE INDEX "ScanIncomplete_scanId_idx" ON "ScanIncomplete"("scanId");

-- CreateIndex
CREATE INDEX "ScanIncomplete_pageId_idx" ON "ScanIncomplete"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "ScanIncomplete_scanId_pageId_ruleId_selector_key" ON "ScanIncomplete"("scanId", "pageId", "ruleId", "selector");

-- CreateIndex
CREATE INDEX "ComplianceSnapshot_siteId_date_idx" ON "ComplianceSnapshot"("siteId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "ComplianceSnapshot_siteId_date_key" ON "ComplianceSnapshot"("siteId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "ScanSchedule_siteId_key" ON "ScanSchedule"("siteId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WidgetConfig" ADD CONSTRAINT "WidgetConfig_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WidgetEvent" ADD CONSTRAINT "WidgetEvent_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WidgetLoad" ADD CONSTRAINT "WidgetLoad_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scan" ADD CONSTRAINT "Scan_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanPage" ADD CONSTRAINT "ScanPage_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "Scan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanIssue" ADD CONSTRAINT "ScanIssue_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "Scan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanIssue" ADD CONSTRAINT "ScanIssue_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "ScanPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanIssue" ADD CONSTRAINT "ScanIssue_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanPassedRule" ADD CONSTRAINT "ScanPassedRule_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "Scan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanPassedRule" ADD CONSTRAINT "ScanPassedRule_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "ScanPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanIncomplete" ADD CONSTRAINT "ScanIncomplete_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "Scan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanIncomplete" ADD CONSTRAINT "ScanIncomplete_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "ScanPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceSnapshot" ADD CONSTRAINT "ComplianceSnapshot_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanSchedule" ADD CONSTRAINT "ScanSchedule_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
