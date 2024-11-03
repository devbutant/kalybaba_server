/*
  Warnings:

  - The values [VEHICLE,REAL_ESTATE,MULTIMEDIA,HOME,LEISURE,FASHION,CHILDREN,ANIMALS,SERVICES,EMPLOYMENT] on the enum `CategoryEnum` will be removed. If these variants are still used in the database, this will fail.
  - The values [OFFER,DEMAND] on the enum `TypeEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CategoryEnum_new" AS ENUM ('TECH_AND_GADGETS', 'PRODUCTIVITY', 'GAMING', 'CREATIVE_WORKSPACE', 'STUDY_SPACE', 'HOME_OFFICE', 'DIY_AND_CUSTOM_SETUPS', 'MINIMALIST', 'COZY_SPACES', 'COLLABORATIVE_WORKSPACES', 'OTHERS');
ALTER TABLE "Ad" ALTER COLUMN "categoryEnum" DROP DEFAULT;
ALTER TABLE "Ad" ALTER COLUMN "categoryEnum" TYPE "CategoryEnum_new" USING ("categoryEnum"::text::"CategoryEnum_new");
ALTER TYPE "CategoryEnum" RENAME TO "CategoryEnum_old";
ALTER TYPE "CategoryEnum_new" RENAME TO "CategoryEnum";
DROP TYPE "CategoryEnum_old";
ALTER TABLE "Ad" ALTER COLUMN "categoryEnum" SET DEFAULT 'OTHERS';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TypeEnum_new" AS ENUM ('SHARED_SETUP', 'NEED_ADVICE');
ALTER TABLE "Ad" ALTER COLUMN "typeEnum" DROP DEFAULT;
ALTER TABLE "Ad" ALTER COLUMN "typeEnum" TYPE "TypeEnum_new" USING ("typeEnum"::text::"TypeEnum_new");
ALTER TYPE "TypeEnum" RENAME TO "TypeEnum_old";
ALTER TYPE "TypeEnum_new" RENAME TO "TypeEnum";
DROP TYPE "TypeEnum_old";
ALTER TABLE "Ad" ALTER COLUMN "typeEnum" SET DEFAULT 'SHARED_SETUP';
COMMIT;

-- AlterTable
ALTER TABLE "Ad" ALTER COLUMN "typeEnum" SET DEFAULT 'SHARED_SETUP';
