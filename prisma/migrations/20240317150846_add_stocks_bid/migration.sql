/*
  Warnings:

  - Added the required column `stocks` to the `Bid` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bid" ADD COLUMN     "stocks" INTEGER NOT NULL;
