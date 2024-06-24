import Link from "next/link";


export default function NoAuthHeader({authTitle, homePage}:{authTitle:string, homePage:boolean}) {
  return (
    <header className="bg-brand-primary  h-16 lg:h-28 flex items-center justify-center">
        <div className="w-[97%] flex items-center justify-between">
            <div>
              <ul className="flex gap-10 items-center">
                 <li><Link href="/"  className="font-bold text-2xl text-white ">PetZone</Link></li>
                 <li><Link href="/" className="text-white text-sm">Geral</Link></li>
                 <li><a href="#about" className="text-white text-sm">Sobre</a></li>
                 <li><a href="#project"  className="text-white text-sm">Projeto</a></li>
                 <li><a href="#veterinario"  className="text-white text-sm">Veterinário</a></li>
              </ul>
            </div>
            <div>
              <ul>
                 {
                  homePage === false ? (<Link href={`/${authTitle}`} className="bg-brand-secondary  text-white px-3 text-sm py-2 rounded-md">
                   {authTitle}
                 </Link>)
                  : (<div className="flex  gap-4">
                    <Link href={`/register`} className="bg-brand-secondary  text-white px-3 text-sm py-2 rounded-md">
                   {authTitle}
                 </Link>

                 <Link href={`/login`} className="border border-brand-secondary text-brand-secondary px-3 text-sm py-2 rounded-md">
                   login
                 </Link>
                  </div>
                    )
                 }
              </ul>
          </div>
        </div>
  
    </header>
  )
}
