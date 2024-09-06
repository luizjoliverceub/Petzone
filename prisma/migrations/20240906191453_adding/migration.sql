-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_userEmail_fkey";

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
