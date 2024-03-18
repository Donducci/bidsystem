/*
  Warnings:

  - Added the required column `userId` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Made the column `stocks` on table `Collection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "stocks" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
