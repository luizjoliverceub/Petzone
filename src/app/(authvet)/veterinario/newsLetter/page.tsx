import AuthHeader from "@/components/Auth/AuthHeader";
import MainNewsLetterCarousel from "@/components/MainNewsLetterCarousel";
import { getAllNews } from "@/utils/actions/GetAllNews";



export default async function VeterinarioNewsLetterPage() {

  const AllNews = await getAllNews()

  return (
    <main className="h-screen w-full">
      <AuthHeader titleText="NewsLetter" link="/dashboard/create" linkText="+ Adicionar Pet" />

      <section className="w-full h-[calc(100vh-5rem)] flex justify-center items-start gap-8">

        <div className="w-1/2 h-full py-2 ">
          <MainNewsLetterCarousel newsData={AllNews} />
        </div>

        <div className="w-1/3 h-full py-4 flex flex-col   justify-between items-center">
          <div className="embla__slide h-1/2 relative z-10">
            <img src="/catwalking.png" alt="cat" className="w-full h-full brightness-75" />
            <div className="slide-content">
              <div className="text-center mx-4">
                <h2 className="text-md font-semibold text-white mb-2">Por que os gatos levaram à extinção mais espécies do que qualquer outro predador
</h2>
                <p className="text-sm font-thin text-white">
                De acordo com um estudo, 2.084 diferentes espécies já foram devoradas por felinos domesticados por humanos.

</p>
              </div>
            </div>
          </div>

          <div className="embla__slide h-1/2 relative z-10 mt-4 pb-4">
            <img src="/dogsitting.png" alt="cat" className="w-full h-full brightness-75" />
            <div className="slide-content">
              <div className="text-center mx-4">
                <h2 className="text-md font-semibold text-white mb-2">
                Quase metade dos imóveis para aluguel no Rio têm pets, diz pesquisa
</h2>
                <p className="text-sm font-thin text-white">
                Uma pesquisa do QuintoAndar mostra que esse percentual cresceu durante a pandemia.

</p>
              </div>
            </div>
          </div>
        </div>
        
      </section>
    </main>
  );
}
