/*
  Warnings:

  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_userId_fkey";

-- AlterTable
ALTER TABLE "WidgetConfig" ADD COLUMN     "lastComplianceScore" DOUBLE PRECISION;

-- DropTable
DROP TABLE "AuditLog";

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
CREATE INDEX "ComplianceSnapshot_siteId_date_idx" ON "ComplianceSnapshot"("siteId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "ComplianceSnapshot_siteId_date_key" ON "ComplianceSnapshot"("siteId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "ScanSchedule_siteId_key" ON "ScanSchedule"("siteId");

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
ALTER TABLE "ComplianceSnapshot" ADD CONSTRAINT "ComplianceSnapshot_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanSchedule" ADD CONSTRAINT "ScanSchedule_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE CASCADE ON UPDATE CASCADE;
