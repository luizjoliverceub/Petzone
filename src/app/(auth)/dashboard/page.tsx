import { auth } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getFirstPet } from "@/utils/actions/GetFirstPet";

import PetCard from "@/components/PetCards";
import AuthHeader from "@/components/Auth/AuthHeader";
import Link from "next/link";
import { getAllNews } from "@/utils/actions/GetAllNews";
import MainNewsLetterCarousel from "@/components/MainNewsLetterCarousel";


export default async function DashboardPage() {

   const firstPet = await getFirstPet()
    const allNews = await getAllNews()
  
 const session = await auth()

 if(!session){
  redirect("/login")
 }



  return (
    <main className="flex w-full h-full">
 
      <div className="h-screen w-full">
        {/* NavBar page */}
        <AuthHeader titleText="Dashboard" link="/dashboard/create" linkText="+ Add Pet"/>
        
        {/* NavBar page */}
        <div className="h-[calc(100%-5rem)] w-full flex justify-center  items-center gap-8">

            <div className=" w-1/2 h-full py-2 flex items-center justify-center">
                <MainNewsLetterCarousel newsData={allNews}/>
            </div>
            
            <div className=" w-1/3 h-[90%] flex flex-col gap-8">
              <div className="w-full h-1/2 bg-slate-300">
                 <div className="w-full h-full ">
                   <Link href={"/pets"} className="hover:brightness-90 w-full h-full" >
                     <PetCard petData={firstPet} remove={false}/>
                   </Link>
                 </div>
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
