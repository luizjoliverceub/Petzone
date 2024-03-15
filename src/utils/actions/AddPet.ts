import * as z from "zod";

const createPetSchema = z.object({
  name: z.string(),
  age: z.coerce.number(),
  city:z.string(),
  birthDate:z.date(),
  userEmail:z.string().email(),
  sex:z.enum(["M","H"]),
  notes:z.string(),
  race:z.string(),
  vaccination:z.string()
  });
  
type CreatePetSchema = z.infer<typeof createPetSchema>;

export async function addPet(dataForm:CreatePetSchema){
      
    
    await fetch("http://localhost:3000/api/pets/create",{
      method:"POST",
     headers:{
        "Content-Type":"application/json"
     },
     body: JSON.stringify(dataForm)
    })
  
  
  }