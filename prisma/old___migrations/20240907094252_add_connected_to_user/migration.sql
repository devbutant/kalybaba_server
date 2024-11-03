/*
  Warnings:

  - Made the column `address` on table `Ad` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `Ad` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Ad` required. This step will fail if there are existing NULL values in that column.
  - Made the column `typeId` on table `Ad` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Ad" DROP CONSTRAINT "Ad_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Ad" DROP CONSTRAINT "Ad_typeId_fkey";

-- AlterTable
ALTER TABLE "Ad" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "categoryId" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "typeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "connected" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "address" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
