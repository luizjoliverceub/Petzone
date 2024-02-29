"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactElement, useState } from "react";
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


export default function NavBarLinks() {

  const [activeLink,setActiveLink] = useState<number | null>()

//fazer lógica de ativo ou desativado atráves do pathname
    
    function handleSetActiveLink(id?:number | null){
            setActiveLink(id)
        
    }

  return (
    <>
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
        </>
  )
}
