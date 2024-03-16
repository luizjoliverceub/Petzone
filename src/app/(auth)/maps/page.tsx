import PetCard from "@/components/PetCards";
import PetsPagination from "@/components/PetsPagination";
import { getFirstPet } from "@/utils/actions/GetFirstPet";



export default async function MapsPage() {
  const firstPet = await getFirstPet()

  
 
  
  return (
    <main className="h-screen w-full">
       <PetsPagination/>
       <PetCard petData={firstPet}/>
    </main>
    );
}
