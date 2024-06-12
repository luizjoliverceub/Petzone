/*
  Warnings:

  - Added the required column `cep` to the `VeterinarianProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VeterinarianProfile" ADD COLUMN     "cep" TEXT NOT NULL;
