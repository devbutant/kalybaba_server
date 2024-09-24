/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Ad` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Ad` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ad" DROP CONSTRAINT "Ad_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Ad" DROP CONSTRAINT "Ad_typeId_fkey";

-- AlterTable
ALTER TABLE "Ad" DROP COLUMN "categoryId",
DROP COLUMN "typeId";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Type";
