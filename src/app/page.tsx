import NoAuthHeader from "@/components/noAuth/NoAuthHeader";
import Link from "next/link";
import { auth } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NoAuthSection from "@/components/noAuth/NoAuthSection";

export default async function Home() {

  const session = await auth()

  redirect("/welcome")

  return (
    <main>
      <NoAuthHeader authTitle="register" homePage />

      <section className="h-[calc(100vh-7rem)] flex items-center justify-center " id="overview">
        <div className="w-[90%] h-[90%]  flex">
          <div className="h-full w-1/2  flex items-center justify-center">
            <div className=" w-[80%] h-[50%] ">
              <span className="text-3xl font-semibold">Welcome To</span>

              <h1 className="text-7xl font-semibold text-brand-secondary">PetZone</h1>

              <p className="py-4">Your friendly zone dedicated to all things pets and companionship! Explore, connect, and celebrate the joy of pet ownership with us.</p>

              <Link href={""} className="px-4  text-white py-1 bg-brand-primary">Subscribe now</Link>
            </div>


          </div>

          <div className="h-full w-1/2 flex items-center justify-center">

            <div className="rounded-full h-[80%] w-[60%] ">
              <img src="/petHome.png" alt="pet img" className="w-full h-full" />
            </div>

          </div>
        </div>
      </section>

      <section className="h-screen bg-brand-primary flex items-center justify-center" id="about">



        <NoAuthSection description="Nossa proposta de solução é um software completo para donos de pets que simplifica todas as dimensões do cuidado com seus adorados companheiros peludos. Com nosso software, você pode realizar um cadastro detalhado de seus pets, receber lembretes automáticos para vacinações essenciais, manter-se informado sobre campanhas de saúde, acessar suporte veterinário por meio de um chat online e até mesmo aproveitar uma plataforma que permite aos petshops locais competirem com as grandes redes. Em resumo, é a chave para tornar o cuidado com seus pets mais simples, eficaz e recompensador." title="Sobre o projeto" img="/retangle.png"
          side="left" colorPrimary />



      </section>

      <section className="h-screen flex items-center justify-center" id="project">

        <div className="h-[80%] w-[85%] ">

          <div className="w-full h-[20%] flex items-center justify-center ">
            <h3 className="text-2xl text-brand-secondary font-bold">Funcionalidades</h3>
          </div>

          <div className=" h-[70%] w-full flex items-center justify-center gap-6">

            <div className=" h-full w-full ring-brand-secondary flex flex-col gap-6 items-center justify-center ring-2 flex-1 basis-full">
              <h2 className="text-center text-brand-secondary font-semibold">PetCard Digital</h2>
              <p className="px-4">A carteirinha digital do pet é uma forma prática de armazenar informações importantes sobre seu animal de estimação, como vacinas, consultas veterinárias e tratamentos, tudo em um aplicativo ou plataforma online.</p>
            </div>

            <div className=" h-full w-full ring-brand-secondary flex flex-col gap-8 items-center justify-center ring-2 flex-1 basis-full">
              <h2 className="text-center text-brand-secondary font-semibold">Chat</h2>
              <p className="px-4">A função de chat no Petzone permite que você entre em contato rapidamente com outros donos de animais, veterinários e pet shops, facilitando a troca de informações e agendamento de consultas</p>
            </div>

            <div className=" h-full w-full ring-brand-secondary flex flex-col gap-8 items-center justify-center ring-2 flex-1 basis-full">
              <h2 className="text-center text-brand-secondary font-semibold">Consultas</h2>
              <p className="px-4">Dentro do Petzone você poderá realizar consultas onlines com os veterinários cadastrados dentro no sistema, sem sair de casa, para o seu conforto e de seu pet.</p>
            </div>

          </div>
        </div>

      </section>

      <section className="h-screen  flex items-center justify-center" id="about">

        <NoAuthSection description="Nossa proposta de solução é um software completo para donos de pets que simplifica todas as dimensões do cuidado com seus adorados companheiros peludos. Com nosso software, você pode realizar um cadastro detalhado de seus pets, receber lembretes automáticos para vacinações essenciais, manter-se informado sobre campanhas de saúde, acessar suporte veterinário por meio de um chat online e até mesmo aproveitar uma plataforma que permite aos petshops locais competirem com as grandes redes. Em resumo, é a chave para tornar o cuidado com seus pets mais simples, eficaz e recompensador." title="Descubra novas formas 
      de cuidar do seu pet!" img="/retangle48.png" side="right" colorPrimary={false} />

      </section>

      <section className="h-screen bg-brand-primary flex items-center justify-center" id="veterinario">

        <NoAuthSection description="Se você é um veterinário comprometido com o bem-estar dos animais, o Petzone é a plataforma ideal para você. Com nossa tecnologia inovadora, você pode oferecer consultas e agendamentos diretamente aos seus clientes através de nosso aplicativo, proporcionando conveniência e eficiência para todos. Não perca a oportunidade de expandir sua prática e se conectar com uma nova base de clientes. Junte-se a nós no Petzone e leve o cuidado animal para o próximo nível!" title="Veterinários" img="/retangle52.png" side="left" colorPrimary>

          <Link href={"/loginVeterinarian"} className="bg-brand-secondary  text-white px-2 py-1">
            Subscribe now
          </Link>

        </NoAuthSection>

      </section>
    </main>
  );
}
