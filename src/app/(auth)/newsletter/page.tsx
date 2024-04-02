import AuthHeader from "@/components/Auth/AuthHeader";
import MainNewsLetterCarousel from "@/components/MainNewsLetterCarousel";
import { getAllNews } from "@/utils/actions/GetAllNews";



export default async function NewsLetterPage() {

  const AllNews = await getAllNews()

  return (
    <main className="h-screen w-full">
      <AuthHeader titleText="NewsLetter" link="/dashboard/create" linkText="+Add Pet" />

      <section className="w-full h-[calc(100vh-5rem)] flex justify-center items-start gap-8">

        <div className="w-1/2 h-full py-2 ">
          <MainNewsLetterCarousel newsData={AllNews} />
        </div>

        <div className="w-1/3 h-full py-4 flex flex-col   justify-between items-center">
          <div className="embla__slide h-1/2 relative z-10">
            <img src="/catwalking.png" alt="cat" className="w-full h-full brightness-75" />
            <div className="slide-content">
              <div className="text-center mx-4">
                <h2 className="text-md font-semibold text-white mb-2">Why Cats Have Gone Extinct More Species Than Any Other Predator
</h2>
                <p className="text-sm font-thin text-white">According to a study, 2,084 different species have already been devoured by felines domesticated by humans.

</p>
              </div>
            </div>
          </div>

          <div className="embla__slide h-1/2 relative z-10 mt-4 pb-4">
            <img src="/dogsitting.png" alt="cat" className="w-full h-full brightness-75" />
            <div className="slide-content">
              <div className="text-center mx-4">
                <h2 className="text-md font-semibold text-white mb-2">Almost half of Rio´s rental properties have pets, says survey
</h2>
                <p className="text-sm font-thin text-white">A survey by QuintoAndar shows that this percentage grew during the pandemic.

</p>
              </div>
            </div>
          </div>
        </div>
        
      </section>
    </main>
  );
}
