-- AlterTable
ALTER TABLE "Scan" ADD COLUMN     "totalIncomplete" INTEGER;

-- AlterTable
ALTER TABLE "ScanPage" ADD COLUMN     "incomplete" INTEGER;

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

-- CreateIndex
CREATE INDEX "ScanIncomplete_scanId_idx" ON "ScanIncomplete"("scanId");

-- CreateIndex
CREATE INDEX "ScanIncomplete_pageId_idx" ON "ScanIncomplete"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "ScanIncomplete_scanId_pageId_ruleId_selector_key" ON "ScanIncomplete"("scanId", "pageId", "ruleId", "selector");

-- AddForeignKey
ALTER TABLE "ScanIncomplete" ADD CONSTRAINT "ScanIncomplete_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "Scan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanIncomplete" ADD CONSTRAINT "ScanIncomplete_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "ScanPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
