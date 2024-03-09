import * as z from "zod";

const createPetSchema = z.object({
    name: z.string(),
    age: z.coerce.number(),
    userEmail:z.string().email()
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