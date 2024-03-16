import AuthHeader from "@/components/AuthHeader";


export default async function MessagePage() {


  return (
    <main className="h-screen w-full ">
      <AuthHeader titleText="Message" linkText="+ Add Pet" link="/dashboard/create"/>
    </main>
    );
}
