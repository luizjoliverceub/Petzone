
import PetCard from "@/components/petCard";
import { getAllPets } from "@/utils/actions/GetAllPets";
import { dehydrate,HydrationBoundary,QueryClient } from "@tanstack/react-query";




export default async function PetsPage() {

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
      queryKey:['pets'],
      queryFn: getAllPets
    })
   
    
  return (
    <main className="h-screen w-full flex justify-center items-center ">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PetCard/>
      </HydrationBoundary>
    </main>
    );
}
