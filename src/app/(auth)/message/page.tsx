import AuthHeader from "@/components/Auth/AuthHeader";
import MainNewsLetterCarousel from "@/components/mainNewsLetterCarousel";


export default async function MessagePage() {


  return (
    <main className="h-screen w-full ">
      <AuthHeader titleText="Message" linkText="+ Add Pet" link="/dashboard/create"/>
    </main>
    );
}
