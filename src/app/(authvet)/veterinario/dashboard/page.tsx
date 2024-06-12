import AuthHeader from "@/components/Auth/AuthHeader";


export default function VeterinarioDashboard() {
    return (
      <div className="h-screen w-full">
      <AuthHeader link="/veterinario/dashboard/create" linkText="+Add Pet" titleText="Vet DashBoard"/>
     
    </div>
    )
  }
  