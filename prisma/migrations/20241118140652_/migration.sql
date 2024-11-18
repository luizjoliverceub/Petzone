/*
  Warnings:

  - The `modality` column on the `VeterinarianProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "VeterinarianProfile" DROP COLUMN "modality",
ADD COLUMN     "modality" TEXT[];
