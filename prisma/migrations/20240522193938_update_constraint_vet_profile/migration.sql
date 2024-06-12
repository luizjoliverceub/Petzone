-- DropForeignKey
ALTER TABLE "VeterinarianProfile" DROP CONSTRAINT "VeterinarianProfile_addressId_fkey";

-- AlterTable
ALTER TABLE "VeterinarianProfile" ALTER COLUMN "addressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "VeterinarianProfile" ADD CONSTRAINT "VeterinarianProfile_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
