import Link from "next/link";

export function NavbarHeader() {
    return (
        <nav className="py-6 px-12 flex items-center justify-between">
            <Link href={'/welcome'} className="text-2xl font-bold text-brand-secondary">Petzone</Link>
            <div className="hidden gap-12 xl:flex animate-fade-in">
                <Link
                    href={'#servicesSection'}
                    className="py-1 px-2 font-semibold border-b-2 border-b-transparent hover:border-b-2 hover:border-b-brand-secondary duration-300"
                >
                    Serviços
                </Link>
                <Link
                    href={'#aboutSection'}
                    className="py-1 px-2 font-semibold border-b-2 border-b-transparent hover:border-b-2 hover:border-b-brand-secondary duration-300"
                >
                    Sobre
                </Link>
                <Link
                    href={'#veterinarianSection'}
                    className="py-1 px-2 font-semibold border-b-2 border-b-transparent hover:border-b-2 hover:border-b-brand-secondary duration-300"
                >
                    Veterinários
                </Link>
                <Link
                    href={''}
                    className="py-1 px-2 font-semibold border-b-2 border-b-transparent hover:border-b-2 hover:border-b-brand-secondary duration-300"
                >
                    Contato
                </Link>

            </div>
            <div className="flex gap-2">
                <Link 
                    href={'/user/login'}
                    className="flex items-center justify-center border-2 border-transparent px-4 py-1 rounded-md text-brand-secondary font-semibold hover:border-brand-secondary duration-300"
                >
                    Entrar
                </Link>
                <Link 
                    href={'/user/register'}
                    className="flex items-center justify-center border-2 border-transparent px-4 py-1 rounded-md bg-brand-secondary text-white font-semibold hover:bg-transparent hover:text-brand-secondary hover:border-brand-secondary duration-300"
                >
                    Cadastre-se
                </Link>
            </div>
        </nav>
    )
}