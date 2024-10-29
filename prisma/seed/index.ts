import { prisma } from "../../src/utils/db/prisma"

async function seed() {
    
await prisma.user.create({
    data: {
        email: "teste1@gmail.com",
        password: "teste1",
        name: "teste1",
        role: "normal"
      }
})

await prisma.pet.create({
    data: {
      name: "Hunter",
      age: 7,
      city: "Taguatinga sul",
      birthDate: new Date("jun 09 2021 00:00:00"),
      race: "Pinscher",
      notes: "Alérgico ao medicamento XY",
      sex: "M",
      user: {
        connect: { email: "teste1@gmail.com" }, 
      },
    },
      
    
  })

  await prisma.pet.create({
    data: {
      name: "Rex",
      age: 7,
      city: "Taguatinga sul",
      birthDate: new Date("jul 22 2022 00:00:00"),
      race: "Gato",
      notes: "",
      sex: "F",
      user: {
        connect: { email: "teste1@gmail.com" }, 
      },
    },
      
    
  })

  await prisma.user.create({
    data: {
        email: "joao@gmail.com",
        password: "joao123",
        name: "joao",
        role: "normal"
      }
})

await prisma.pet.create({
    data: {
      name: "Molly",
      age: 7,
      city: "Taguatinga",
      birthDate: new Date("mar 02 2017 00:00:00"),
      race: "Gato",
      notes: "",
      sex: "F",
      user: {
        connect: { email: "joao@gmail.com" }, 
      },
    },
      
    
  })

const veterinariaUser = await prisma.user.create({
    data: {
        email: "vet1@gmail.com",
        password: "vet123",
        name: "vet1",
        role: "veterinarian"
      }
})

await prisma.veterinarianProfile.create({
    data: {
      crmv:"crmv-99999",
      cep:"71980360",
      userId: veterinariaUser.id,
      region: "Sobradinho"
    }
  });


  const userWithProfile = await prisma.user.findUnique({
    where: {
       email: "vet1@gmail.com"
    },
    include: {
       VeterinarianProfile: {
          select: {
             id: true
          }
       }
    },
 });

 const VeterinarianProfileId = userWithProfile?.VeterinarianProfile?.id as string

await prisma.service.create({
    data: {
       name: "vacinação",
       price: 15.90,
       veterinarianProfileId: VeterinarianProfileId
    }
 })

 await prisma.service.create({
    data: {
       name: "Cirurgia médica",
       price: 230,
       veterinarianProfileId: VeterinarianProfileId
    }
 })

///

const veterinariaUser2 = await prisma.user.create({
    data: {
        email: "LuizVet@gmail.com",
        password: "vet123",
        name: "Luiz",
        role: "veterinarian"
      }
})

await prisma.veterinarianProfile.create({
    data: {
      crmv:"crmv-878786",
      cep:"782903019",
      userId: veterinariaUser2.id,
      region: "Gama"
    }
  });


  const userWithProfile2 = await prisma.user.findUnique({
    where: {
       email: "LuizVet@gmail.com"
    },
    include: {
       VeterinarianProfile: {
          select: {
             id: true
          }
       }
    },
 });

 const VeterinarianProfileId2 = userWithProfile2?.VeterinarianProfile?.id as string

await prisma.service.create({
    data: {
       name: "Castração",
       price: 89.25,
       veterinarianProfileId: VeterinarianProfileId2
    }
 })

 await prisma.service.create({
    data: {
       name: "Tratamento odontológico",
       price: 150,
       veterinarianProfileId: VeterinarianProfileId2
    }
 })


}

seed().then(() => {
    console.log("Database seeded!")
    prisma.$disconnect()
})