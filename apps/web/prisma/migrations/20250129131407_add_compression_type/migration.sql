/*
  Warnings:

  - Added the required column `compressionType` to the `CompressionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompressionHistory" ADD COLUMN     "compressionType" TEXT NOT NULL;
