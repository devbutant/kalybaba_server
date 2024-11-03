/*
  Warnings:

  - You are about to drop the column `city` on the `Ad` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Ad` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ad" DROP COLUMN "city",
DROP COLUMN "price";
