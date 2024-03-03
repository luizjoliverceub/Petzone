/*
  Warnings:

  - You are about to drop the column `userId` on the `Pet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_userId_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
