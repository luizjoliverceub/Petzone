import Image from "next/image";
import { auth } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dogImg from '../../../public/HomePage.svg'
import dogOwner from '../../../public/hugging.svg'
import { ToggleButton } from "./components/ToggleButton";

export default async function Home() {

    const session = await auth()

    if (session) {

        if (session?.user.role === "normal") {
            redirect("/pets")
        } else if (session?.user.role === "veterinarian") {
            redirect("/veterinario/allPets")
        }

    }

    return (
        <main className="flex flex-col flex-1 p-4 justify-center items-center gap-80 animate-fade-in mt-20">
            <div className="h-full flex items-center justify-center">
                <div className="p-4 max-w-3xl flex justify-center items-center">
                    <div className="text-start flex flex-col gap-8 justify-center items-start">
                        <h2 className="text-7xl font-bold text-brand-primary">
                            Seu amiguinho merece o <span className="text-brand-secondary">melhor</span>
                        </h2>
                        <p className="font-semibold text-xl">
                            Sua zona pet dedicada a facilitar os cuidados de seu amiguinho! Explore, conecte-se e celebre a alegria de ter um animal de estimação conosco.
                        </p>
                        <button className="border-2 border-transparent bg-brand-primary text-white font-semibold py-2 px-8 rounded-lg text-lg hover:bg-transparent hover:border-brand-primary hover:text-brand-primary duration-300">
                            Saiba mais
                        </button>
                    </div>
                </div>
                <div>
                    <Image src={dogImg} alt="dog" height={600} className="hidden xl:flex" />
                </div>
            </div>
            <div className="flex flex-col gap-14 items-center" id="services">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-brand-secondary">Oferecemos diversas <br />maneiras de ajudar a você e seu pet</h2>
                </div>
                <ToggleButton />
            </div>
            <div className="flex justify-center items-center gap-10">
                <div className="hidden xl:flex relative h-[500px] w-[500px]">
                    <Image src={dogOwner} alt="dog" height={500} className="rounded-3xl absolute top-0 left-0 z-10" />
                    <div className="w-[500px] h-[500px] border-8 rounded-3xl border-brand-secondary absolute -top-10 -left-10" />
                </div>
                <div className="flex flex-col w-[65%] xl:w-1/3 h-full p-4 gap-16">
                    <h2 className="text-4xl font-bold text-brand-primary">Descubra novas formas de cuidar do seu pet!</h2>
                    <p className="font-semibold text-xl text-wrap">Nossa proposta de solução é um software completo para donos de pets que simplifica todas as dimensões do cuidado com seus adorados companheiros peludos. Com nosso software, você pode realizar um cadastro detalhado de seus pets, receber lembretes automáticos para vacinações essenciais, manter-se informado sobre campanhas de saúde, acessar suporte veterinário por meio de um chat online e até mesmo aproveitar uma plataforma que permite aos petshops locais competirem com as grandes redes. Em resumo, é a chave para tornar o cuidado com seus pets mais simples, eficaz e recompensador.</p>
                </div>
            </div>
        </main>
    );
}
