import z from "zod"

export const createPetSchema = z.object({
    name: z.string(),
    age: z.number().min(0).max(100),
  });

  export type Pet = z.infer<typeof createPetSchema>;