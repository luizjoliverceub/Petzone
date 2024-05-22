
import Link from "next/link"
import NavBarLinks from "./NavBarLinks";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import SignOutBtn from "./SignOutBtn";
import Image from "next/image";




export default async function NavBarVeterinarian() {

    

   const session = await auth()
   console.log("user session" + session?.user?.role);
   
   if(!session){
    throw new Error("You don't have acess to this page without logging in")
  
  }else if( session?.user?.role !== "veterinarian"){
    throw new Error("You just have acces to this page being a veterinarian user")
  }
  

  return (
        <nav className="w-44 h-[100vh] bg-brand-primary flex flex-col gap-3 text-white lg:w-64">
                
            {/* <div className="lg:w-60 w-40  h-[90vh] flex flex-col  items-center gap-2">
            
                <div className="my-10">
                    <div className="flex flex-col gap-4">
                        <Link href={"/pets"} className="font-bold text-2xl">PetZone</Link>
                        <span className="p-2 bg-brand-third w-48 flex gap-2">
                             { session?.user?.image? <Image src={`${session?.user?.image}`} width={20} height={20} alt="user image" /> : "Default img"}
                             { session?.user?.name.slice(0,12) || "Desconectado"}
                         </span>
                    </div>
                </div>
                
                <div>
                    <ul className="flex gap-2 flex-col justify-center">
                        <NavBarLinks/>
                    </ul>
                </div>
                <div className=" flex flex-col my-10">
                    <SignOutBtn/>
                </div>
            </div> */}

                <div className=" flex flex-col my-10">
                    <SignOutBtn/>
                </div>
            
            <h1>NavBar veterinaria</h1>
        </nav>
  )
}