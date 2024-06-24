-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_vetId_fkey";

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_vetId_fkey" FOREIGN KEY ("vetId") REFERENCES "VeterinarianProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
