-- AlterTable: add new widget features (P1) and scan result persistence
ALTER TABLE "WidgetConfig"
  ADD COLUMN "readingMask"        BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "textAlign"          BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "saturation"         BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "lastScanViolations" INTEGER,
  ADD COLUMN "lastScanAt"         TIMESTAMP(3);
