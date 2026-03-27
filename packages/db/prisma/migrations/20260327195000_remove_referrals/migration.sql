DROP TABLE IF EXISTS "Referral";
DROP INDEX IF EXISTS "User_referralCode_key";
ALTER TABLE "User" DROP COLUMN IF EXISTS "referralCode";
-- Drop referral relations and data model
DROP TABLE IF EXISTS "Referral";

-- Drop user referral code
DROP INDEX IF EXISTS "User_referralCode_key";
ALTER TABLE "User" DROP COLUMN IF EXISTS "referralCode";
