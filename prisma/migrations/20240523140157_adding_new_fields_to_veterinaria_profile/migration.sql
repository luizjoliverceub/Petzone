/*
  Warnings:

  - You are about to drop the column `clinicName` on the `VeterinarianProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[crmv]` on the table `VeterinarianProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `crmv` to the `VeterinarianProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VeterinarianProfile" DROP COLUMN "clinicName",
ADD COLUMN     "crmv" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VeterinarianProfile_crmv_key" ON "VeterinarianProfile"("crmv");
