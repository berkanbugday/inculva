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

-- CreateIndex
CREATE INDEX "ScanPassedRule_scanId_idx" ON "ScanPassedRule"("scanId");

-- CreateIndex
CREATE INDEX "ScanPassedRule_pageId_idx" ON "ScanPassedRule"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "ScanPassedRule_scanId_pageId_ruleId_key" ON "ScanPassedRule"("scanId", "pageId", "ruleId");

-- AddForeignKey
ALTER TABLE "ScanPassedRule" ADD CONSTRAINT "ScanPassedRule_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "Scan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanPassedRule" ADD CONSTRAINT "ScanPassedRule_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "ScanPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
