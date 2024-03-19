import NoAuthHeader from "@/components/NoAuthHeader";
import Link from "next/link";
import { auth } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth()

  if(session || session?.user.name){
    redirect("/pets")
  
  }

  return (
    <main>
       <NoAuthHeader authTitle="register" homePage/>

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
                      <img src="/petHome.png" alt="pet img" className="w-full h-full"/>
                  </div>

              </div>
          </div>
       </section>

       <section className="h-screen bg-brand-primary flex items-center justify-center" id="about">

        <div className="w-[90%] h-[80%]  flex   items-center justify-center gap-10">

          <div className="w-1/2 h-full  flex items-center justify-end">

          <img src="/retangle.png" alt="pet img" className="w-[65%] h-[65%]"/>

          </div>

          <div className="w-1/2 h-full  flex items-center justify-start">

              <div className="w-[90%] h-[60%]">

                  <h4 className="text-2xl mb-4 text-white">Sobre o projeto</h4>

                  <p className="text-white font-thin">Nossa proposta de solução é um software completo para donos de pets que simplifica todas as dimensões do cuidado com seus adorados companheiros peludos. Com nosso software, você pode realizar um cadastro detalhado de seus pets, receber lembretes automáticos para vacinações essenciais, manter-se informado sobre campanhas de saúde, acessar suporte veterinário por meio de um chat online e até mesmo aproveitar uma plataforma que permite aos petshops locais competirem com as grandes redes. Em resumo, é a chave para tornar o cuidado com seus pets mais simples, eficaz e recompensador.</p>

              </div>

          </div>

        </div>

       </section>

       <section className="h-screen " id="project">

      </section>
    </main>
    );
}
