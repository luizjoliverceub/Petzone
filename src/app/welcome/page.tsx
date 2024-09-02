import Image from "next/image";
import { auth } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dogImg from '../../../public/HomePage.svg';
import dogOwner from '../../../public/hugging.svg';
import vetWithCat from '../../../public/vetWithCat.jpg';
import { ToggleButton } from "./components/ToggleButton";
import Link from "next/link";
import { Session } from "next-auth";

export default async function Home() {
    const session = await auth() as Session | null;

    if (session) {
        const redirectUrl = session.user?.role === "normal" ? "/user/home" : "/veterinario/allPets";
        return redirect(redirectUrl);
    }

    return (
        <div className="flex flex-col flex-1 px-4 justify-center items-center animate-fade-in">
            <div className="h-[80vh] flex items-center justify-center">
                <div className="p-4 max-w-3xl flex justify-center items-center">
                    <div className="text-start flex flex-col gap-8 justify-center items-start">
                        <h2 className="text-7xl font-bold text-brand-primary">
                            Seu amiguinho merece o <span className="text-brand-secondary">melhor</span>
                        </h2>
                        <p className="font-semibold text-xl">
                            Sua zona pet dedicada a facilitar os cuidados de seu amiguinho! Explore, conecte-se e celebre a alegria de ter um animal de estimação conosco.
                        </p>
                        <Link href={'#aboutSection'} className="border-2 border-transparent bg-brand-primary text-white font-semibold py-2 px-8 rounded-lg text-lg hover:bg-transparent hover:border-brand-primary hover:text-brand-primary duration-300">
                            Saiba mais
                        </Link>
                    </div>
                </div>
                <div>
                    <Image src={dogImg} alt="dog" width={500} height={600} className="hidden xl:flex" />
                </div>
            </div>
            <div className="flex flex-col h-screen gap-14 items-center justify-center" id="servicesSection">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-brand-secondary">Oferecemos diversas <br />maneiras de ajudar a você e seu pet</h2>
                </div>
                <ToggleButton />
            </div>
            <div className="flex items-center justify-center gap-10 h-screen" id="aboutSection">
                <div className="hidden xl:flex relative h-[500px] w-[500px]">
                    <Image src={dogOwner} alt="dog" width={500} height={500} className="rounded-3xl absolute top-0 left-0 z-10" />
                    <div className="w-[500px] h-[500px] border-8 rounded-3xl border-brand-secondary absolute -top-10 -left-10" />
                </div>
                <div className="flex flex-col w-[65%] xl:w-1/3 p-4 gap-16">
                    <h2 className="text-4xl font-bold text-brand-primary">Descubra novas formas de cuidar do seu pet!</h2>
                    <p className="font-semibold text-xl text-wrap">Nossa proposta de solução é um software completo para donos de pets que simplifica todas as dimensões do cuidado com seus adorados companheiros peludos. Com nosso software, você pode realizar um cadastro detalhado de seus pets, receber lembretes automáticos para vacinações essenciais, manter-se informado sobre campanhas de saúde, acessar suporte veterinário por meio de um chat online e até mesmo aproveitar uma plataforma que permite aos petshops locais competirem com as grandes redes. Em resumo, é a chave para tornar o cuidado com seus pets mais simples, eficaz e recompensador.</p>
                </div>
            </div>
            <div className="bg-brand-primary rounded-tl-3xl rounded-tr-3xl w-full py-32 px-52 flex gap-24 items-center justify-center h-screen" id="veterinarianSection">
                <div className="flex flex-col gap-12 max-h-[500px] max-w-[600px]">
                    <h2 className="text-white text-4xl">Petzone para veterinários</h2>
                    <p className="text-white text-xl">Se você é um veterinário comprometido com o bem-estar dos animais, o Petzone é a plataforma ideal para você. Com nossa tecnologia inovadora, você pode oferecer consultas e agendamentos diretamente aos seus clientes através de nosso aplicativo, proporcionando conveniência e eficiência para todos. Não perca a oportunidade de expandir sua prática e se conectar com uma nova base de clientes. Junte-se a nós no Petzone e leve o cuidado animal para o próximo nível!</p>
                    <Link href={'/registerVeterinarian'} className="bg-brand-secondary text-white font-semibold py-2 px-4 rounded-lg text-lg max-w-56 border-2 border-brand-secondary hover:bg-transparent hover:text-brand-secondary duration-300 text-center">Inscreva-se</Link>
                </div>
                <Image src={vetWithCat} alt="Veterinário" width={600} height={500} className="rounded-3xl" />
            </div>
        </div>
    );
}
