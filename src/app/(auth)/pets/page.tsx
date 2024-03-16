
import AuthHeader from "@/components/AuthHeader";
import PetCard from "@/components/PetCards";
import { getAllPets } from "@/utils/actions/GetAllPets";
import { getFirstPet } from "@/utils/actions/GetFirstPet";


export default async function PetsPage() {

  const firstPet = await getFirstPet()

    
  return (
    <main className="h-[calc(100vh-5rem)] w-full ">
        <AuthHeader titleText="My Pets" link="/dashboard/create" linkText="+ Add Pet"/>
        <PetCard petData={firstPet}/>
    </main>
    );
}
