"use client"

import { signOut, useSession } from "next-auth/react";
import Link from "next/link"
import { redirect } from "next/navigation";
import {  ReactElement, useEffect, useState } from "react"
import { IconType } from "react-icons";
import { BiMessageAltDetail } from "react-icons/bi";
import { PiNewspaperClipping } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { TbMap } from "react-icons/tb";

type NavListsType = {
    text:string
    id:number 
    icon?:ReactElement<IconType>
   
}

const NavLists: NavListsType[] = [
    {id:1,text:"Dashboard",icon:<RxDashboard className="text-xl"/>},
    {id:2,text:"Message",icon:<BiMessageAltDetail className="text-xl"/>},
    {id:3,text:"NewsLetter",icon:<PiNewspaperClipping className="text-xl"/>},
    {id:4,text:"Maps",icon:<TbMap className="text-xl"/>}
]


export default function NavBar() {

    const [activeLink,setActiveLink] = useState<number | null>()

    const {data:session} = useSession()

    
    function handleSetActiveLink(id?:number | null){
            setActiveLink(id)
        
    }

    useEffect(() =>{
        if(!session||!session?.user ){
            redirect("/login")
        }
    })
  

  return (
        <nav className="w-44 h-[100vh] bg-brand-primary flex flex-col gap-3 text-white lg:w-64">

            <div className="lg:w-60 w-40  h-[90vh] flex flex-col  items-center gap-2">
            {/* Petzone and image container*/}
                <div className="my-10">
                    <div className="flex flex-col gap-4">
                        <Link href={"/"} className="font-bold text-2xl" onClick={() =>handleSetActiveLink(null)}>PetZone</Link>
                        <span className="p-2 bg-brand-third w-48 flex gap-2">
                             <img src={session?.user?.image} width={20} height={20} alt="" /> 
                             { session?.user?.name || "Desconectado"}
                         </span>
                    </div>
                </div>
                 {/* Navigation Container*/}
                <div>
                    <ul className="flex gap-2 flex-col justify-center">

                        {NavLists.map((item) => (
                        <Link  
                            className={`w-48 ${activeLink === item.id ? "bg-brand-secondary":""} p-2`} onClick={() => handleSetActiveLink(item.id)} 
                            key={item.id} 
                            href={`/`}>
                                <button className="flex gap-2 items-center">
                                    {item.icon}{item.text}
                                </button>
                        </Link>
                        ))}
                    </ul>
                </div>
                <div className=" flex flex-col my-10">
                    <button className="p-2 bg-brand-third rounded-full" onClick={() => signOut()}>
                                Sign Out
                    </button>
                </div>
            </div>
        </nav>
  )
}