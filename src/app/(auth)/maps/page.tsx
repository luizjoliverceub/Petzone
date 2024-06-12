import AllRegionsDashboard from "@/components/AllRegionsDashboard";
import AuthHeader from "@/components/Auth/AuthHeader";
import { getAllRegions } from "@/utils/actions/GetAllRegions";



export default async function MapsPage() {
 

  const allRegions = await getAllRegions()
 
  console.log(allRegions);
  
  return (
    <main className="h-screen w-full ">
      <AuthHeader titleText="Vets" linkText="+ Add Pet" link="/dashboard/create"/>
      <AllRegionsDashboard regions={allRegions}/>
    </main>
    );
}
