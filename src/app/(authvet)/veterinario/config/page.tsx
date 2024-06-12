import AuthHeader from "@/components/Auth/AuthHeader";


export default function VeterinarioConfig() {
  return (
    <div className="h-screen w-full">
    <AuthHeader link="/veterinario/config/create" linkText="+Add Address" titleText="Vet Config"/>
  </div>
  )
}
