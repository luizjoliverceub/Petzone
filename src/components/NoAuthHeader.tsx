import Link from "next/link";


export default function NoAuthHeader({authTitle}:{authTitle:string}) {
  return (
    <header className="bg-brand-primary lg:h-28 flex items-center justify-center">
        <div className="w-[97%] flex items-center justify-between">
            <div>
              <ul className="flex gap-10 items-center">
                 <li><Link href={"/"} className="font-bold text-2xl text-white ">PetZone</Link></li>
                 <li><Link href={"/"} className="text-white text-sm">Overview</Link></li>
                 <li><Link href={"/"} className="text-white text-sm">About us</Link></li>
                 <li><Link href={"/"} className="text-white text-sm">Project</Link></li>
              </ul>
            </div>
            <div>
              <ul>
                  <Link href={`/${authTitle}`} className="bg-brand-secondary  text-white px-3 text-sm py-2 rounded-md">
                    {authTitle}
                  </Link>
              </ul>
          </div>
        </div>
  
    </header>
  )
}
