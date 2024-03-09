import FormAuthCreatePet from "@/components/FormAuthCreatePet";


export default async function CreatePetPage() {

 

  return (
    <main className="flex w-full h-full">

    <div className="h-screen w-full">
   
      <div className="w-full h-20 flex items-center  px-4 
  border-b border-b-slate-300">
        <h3 className="text-brand-secondary text-2xl">New Pet</h3>
         
      </div>
      <div className="w-full h-[calc(100%-5rem)] flex items-center justify-center">
          <FormAuthCreatePet/>
      </div>
    </div>
  </main>
  )
}
