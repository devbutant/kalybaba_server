/*
  Warnings:

  - You are about to drop the column `address` on the `Ad` table. All the data in the column will be lost.
  - Added the required column `city` to the `Ad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ad" DROP COLUMN "address",
ADD COLUMN     "city" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
ADD COLUMN     "city" TEXT NOT NULL;
