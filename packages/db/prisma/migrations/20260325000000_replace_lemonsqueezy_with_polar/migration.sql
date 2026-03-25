-- AlterTable: rename lsCustomerId to polarCustomerId on User
ALTER TABLE "User" RENAME COLUMN "lsCustomerId" TO "polarCustomerId";

-- DropIndex
DROP INDEX "User_lsCustomerId_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_polarCustomerId_key" ON "User"("polarCustomerId");

-- AlterTable: replace Subscription columns
ALTER TABLE "Subscription"
  RENAME COLUMN "lsSubscriptionId" TO "polarSubscriptionId";

ALTER TABLE "Subscription"
  RENAME COLUMN "lsVariantId" TO "polarProductId";

ALTER TABLE "Subscription"
  ADD COLUMN "interval" TEXT;

ALTER TABLE "Subscription"
  DROP COLUMN "lsCustomerPortalUrl";

-- Backfill interval with a placeholder (no existing rows in dev)
UPDATE "Subscription" SET "interval" = 'month' WHERE "interval" IS NULL;

-- Make interval NOT NULL
ALTER TABLE "Subscription"
  ALTER COLUMN "interval" SET NOT NULL;

-- DropIndex
DROP INDEX "Subscription_lsSubscriptionId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_polarSubscriptionId_key" ON "Subscription"("polarSubscriptionId");
