-- CreateTable
CREATE TABLE "VeterinarianProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clinicName" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,

    CONSTRAINT "VeterinarianProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VeterinarianProfile_userId_key" ON "VeterinarianProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VeterinarianProfile_addressId_key" ON "VeterinarianProfile"("addressId");

-- AddForeignKey
ALTER TABLE "VeterinarianProfile" ADD CONSTRAINT "VeterinarianProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VeterinarianProfile" ADD CONSTRAINT "VeterinarianProfile_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
