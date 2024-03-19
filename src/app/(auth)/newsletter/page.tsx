import AuthHeader from "@/components/AuthHeader";



export default async function NewsLetterPage() {

  
  return (
    <main className="h-screen w-full">
      <AuthHeader titleText="NewsLetter" link="/dashboard/create" linkText="+Add Pet" />

      <section className="w-full h-[calc(100vh-5rem)] bg-red-600 flex items-center justify-center">

          <div className="w-[90%] h-[90%] bg-green-300 flex gap-10">

              <div className="bg-blue-300 h-full w-1/2">

              </div>
              
              <div className="bg-pink-300 h-full w-1/2 flex flex-col gap-6">

                   <div className="h-1/2 w-full bg-yellow-300">
                    
                    </div>

                  <div className="h-1/2 w-full bg-purple-300">

                  </div>
              </div>
          </div>

      </section>

    </main>
    );
}
