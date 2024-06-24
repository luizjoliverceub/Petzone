"use client"
;
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement} from "react";
import { IconType } from "react-icons";
import { BiMessageAltDetail } from "react-icons/bi";
import { PiNewspaperClipping } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import { MdOutlinePets } from "react-icons/md";

type NavListsType = {
    text:string
    id:number 
    icon?:ReactElement<IconType>
    link:string
   
}

const NavLists: NavListsType[] = [
    {id:1,text:"Pets",icon:<MdOutlinePets  className="text-xl"/>,link:"veterinario/allPets"},
    {id:2,text:"Dashboard",icon:<RxDashboard className="text-xl"/>,link:"veterinario/dashboard"},
    {id:3,text:"Mensagens",icon:<BiMessageAltDetail className="text-xl"/>,link:"veterinario/message"},
    {id:4,text:"Notícias",icon:<PiNewspaperClipping className="text-xl"/>,link:"veterinario/newsLetter"},
    {id:5,text:"Configuração",icon:<HiMiniWrenchScrewdriver className="text-xl"/>,link:"veterinario/config"}
]


export default function NavBarVeterinarianLinks() {

  const pathname = usePathname()
 
    
//fazer lógica de ativo ou desativado atráves do pathname
  
  return (
    <>
    {NavLists.map((item) => (
        <Link  
            className={`w-48 ${pathname === `/${item.link}`? "bg-brand-secondary":""} p-2`} 
            key={item.id} 
            href={`/${item.link}`}>
                <button className="flex gap-2 items-center">
                    {item.icon}{item.text}
                </button>
        </Link>
        ))}
        </>
  )
}
