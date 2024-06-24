import AuthHeader from "@/components/Auth/AuthHeader";
import { auth } from "@/app/api/auth/[...nextauth]/route";

export default async function VeterinarioDashboard() {

  const session = await auth()
  console.log(session);
  
    return (
      <div className="h-screen w-full">
      <AuthHeader link="/veterinario/dashboard/create" linkText="+Add Pet" titleText="Vet DashBoard"/>
     
    </div>
    )
  }
  