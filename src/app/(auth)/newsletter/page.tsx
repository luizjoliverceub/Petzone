import AuthHeader from "@/components/AuthHeader";



export default async function NewsLetterPage() {

  
  return (
    <main className="h-screen w-full">
      <AuthHeader titleText="NewsLetter" link="/dashboard/create" linkText="+Add Pet" />
    </main>
    );
}
