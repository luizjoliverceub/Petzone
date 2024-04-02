import PetCard from "@/components/PetCards";
import PetsPagination from "@/components/PetsPagination";
import { getFirstPet } from "@/utils/actions/GetFirstPet";



export default async function PetsPage() {
  const firstPet = await getFirstPet()
  
  
 
  
  return (
    <main className="h-screen w-full flex flex-col">
       <PetsPagination/>
       <div className="w-full h-full  flex items-center justify-center">
          <div className="w-1/2 h-1/2">
            <PetCard petData={firstPet} remove/>
          </div>
        </div>
    </main>
    );
}
