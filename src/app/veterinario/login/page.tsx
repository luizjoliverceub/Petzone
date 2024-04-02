import NoAuthContentVet from "@/components/noAuth/vet/NoAuthContentVet";
import NoAuthHeaderVet from "@/components/noAuth/vet/NoAuthHeaderVet";


export default function VeterinarioLoginPage() {
    return (
      <>
    <NoAuthHeaderVet authTitle='register' homePage={false}/>
    <NoAuthContentVet formTitle='Login (Veterinário)'/>
    </>
    )
  }
  