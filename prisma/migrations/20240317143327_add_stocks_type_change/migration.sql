/*
  Warnings:

  - Changed the type of `stocks` on the `Collection` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "stocks",
ADD COLUMN     "stocks" INTEGER NOT NULL;
