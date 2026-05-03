/*
  Warnings:

  - You are about to drop the column `businessName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "businessName",
ADD COLUMN     "business_name" TEXT;
