/*
  Warnings:

  - You are about to drop the column `allowedDomains` on the `WidgetConfig` table. All the data in the column will be lost.
  - You are about to drop the column `borderRadius` on the `WidgetConfig` table. All the data in the column will be lost.
  - You are about to drop the column `fontFamily` on the `WidgetConfig` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WidgetConfig" DROP COLUMN "allowedDomains",
DROP COLUMN "borderRadius",
DROP COLUMN "fontFamily";
