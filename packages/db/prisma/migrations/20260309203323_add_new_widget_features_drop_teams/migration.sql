/*
  Warnings:

  - You are about to drop the column `teamId` on the `Site` table. All the data in the column will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamInvite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Site" DROP CONSTRAINT "Site_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "TeamInvite" DROP CONSTRAINT "TeamInvite_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_userId_fkey";

-- AlterTable
ALTER TABLE "Site" DROP COLUMN "teamId";

-- AlterTable
ALTER TABLE "WidgetConfig" ADD COLUMN     "blueLightFilter" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "contentMagnifier" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "darkMode" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "dictionary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hideImages" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "highlightTitles" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lineHeight" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profileAdhd" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profileBlind" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profileCognitive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profileColorBlind" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profileDyslexia" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profileLowVision" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profileMotorImpaired" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profileParkinson" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "profileSeizure" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "slowCursor" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sustainabilityMode" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "toolTips" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "TeamInvite";

-- DropTable
DROP TABLE "TeamMember";
