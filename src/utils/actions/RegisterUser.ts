"use server"

import * as z from "zod";

const createUser = z.object({
    email:z.string().email(),
    password:z.string(),
    name:z.string().nullish(),
    role:z.string()
  });
  
type CreateUserSchema = z.infer<typeof createUser>;

export async function registerUser(dataForm:CreateUserSchema){
      

   console.log("Register user" + JSON.stringify(dataForm));
  
    const resp = await fetch("http://localhost:3000/api/user/create",{
      method:"POST",
       body: JSON.stringify(dataForm)
     })
  
   
    
    
  
  }