
import { auth } from "@/app/api/auth/[...nextauth]/route";
import PetCard from "@/components/petCard";

export default async function NewsLetterPage() {

  const session = await auth()

  const resp = await fetch("http://localhost:3000/api/pets",{
    cache:"no-store",
    headers:{
         'session': JSON.stringify(session)
    }
   })
    const data = await resp.json()


    
  return (
    <main className="h-screen w-full flex justify-center items-center ">
        <PetCard petData={data}/>
    </main>
    );
}
