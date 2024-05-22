import NoAuthContentVet from "@/components/noAuth/vet/NoAuthContentVet";
import NoAuthHeaderVet from "@/components/noAuth/vet/NoAuthHeaderVet";


export default function VeterinarioRegisterPage() {
    return (
      <>
    <NoAuthHeaderVet authTitle='login' homePage={false}/>
    <NoAuthContentVet formTitle='Register Veterinário'/>
    </>
    )
  }
  