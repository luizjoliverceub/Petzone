import AllRegionsDashboard from "@/components/AllRegionsDashboard";
import AuthHeader from "@/components/Auth/AuthHeader";
import { getAllRegions } from "@/utils/actions/GetAllRegions";



export default async function AllVetsPage() {
 

  const allRegions = await getAllRegions()
 

  
  return (
    <main className="h-screen w-full ">
      <AuthHeader titleText="Vets" linkText="+ Adicionar Pet" link="/dashboard/create"/>
      <AllRegionsDashboard regions={allRegions}/>
    </main>
    );
}
