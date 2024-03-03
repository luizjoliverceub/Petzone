import NavBar from "@/components/NavBar";
import Link from "next/link";
import { auth } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export type Pet = {
  age:number,
  name:string,
  id:string,
  useEmail:string
  
}

export default async function DashboardPage() {

 const session = await auth()

 if(!session){
  redirect("/login")
 }

 
 const resp = await fetch("http://localhost:3000/api/pets",{
  cache:"no-store",
  headers:{
       'session': JSON.stringify(session)
  }
 })
  const data = await resp.json()
  

  const filteredData = data.filter((pet:Pet,i:number) =>{
    return i === 0
  })

  

  

  return (
    <main className="flex w-full h-full">
 
      <div className="h-screen w-full">
        {/* NavBar page */}
        <div className="w-full h-20 flex items-center justify-between px-4 
    border-b border-b-slate-300">
          <h3 className="text-brand-secondary text-2xl">Dashboard</h3>
           <Link href={"/dashboard/create"} className='text-brand-secondary font-semibold px-3 py-1 bg-blue-100 opacity-80'>+ Add pet
           </Link>
        </div>
        
        {/* NavBar page */}
        <div className="h-[calc(100%-5rem)] w-full flex justify-center  items-center gap-8">
            <div className="bg-slate-400 w-1/2 h-[90%] flex items-center justify-center">
                <p>News Container</p>
            </div>
            <div className=" w-1/3 h-[90%]">
              <div className="bg-slate-400  w-full h-1/2 flex items-center justify-center">
                 {filteredData?.map((pet:Pet) =>(
                  <div key={pet.id} className="w-full h-full flex flex-col" >
                    <span className="my-4 mx-auto">Your Pet</span>
                    <div className="w-full h-full flex items-center justify-between px-4">
                      <p>Name:{pet.name}</p>
                      <p>Age:{pet.age}</p>
                    </div>
                  </div>
                )) || <p>teste</p>} 
              </div>
              <div className="bg-slate-200  w-full h-1/2 flex items-center justify-center">
                  <p>Message container</p>
              </div>
            </div>
        </div>
      </div>
    </main>
    );
}
