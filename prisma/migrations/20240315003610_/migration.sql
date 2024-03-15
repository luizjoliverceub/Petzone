/*
  Warnings:

  - Added the required column `birthDate` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vaccination` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('M', 'H');

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT NOT NULL,
ADD COLUMN     "sex" "Sex" NOT NULL,
ADD COLUMN     "vaccination" TEXT NOT NULL;
