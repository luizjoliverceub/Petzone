import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { NewsType } from "@/models/Types";
import Image from 'next/image';
import Link from "next/link";

export function BlockNews({ news }: { news: NewsType[] }) {

    return (
        <Carousel className="w-[500px] 3xl:w-[610px] rounded-xl shadow-custom2 hover:shadow-custom3 duration-300 animate-fade-in" opts={{ loop: true }}>
            <CarouselContent>
                {news.map(newItem => (
                    <CarouselItem key={newItem.title}>
                        <div className="bg-black rounded-xl relative shadow-custom3">

                            <Link href={`/user/newsletter#${newItem.title}`}>
                                <Image
                                    alt={newItem.title}
                                    src={newItem.imgUrl}
                                    height={300}
                                    width={610}
                                    className="rounded-xl opacity-60 hidden lg:flex"
                                />

                                <h2 className="absolute text-white font-medium top-6 left-6">{newItem.webSite}</h2>

                                <div className="absolute bottom-5 px-12 py-4 flex flex-col justify-start items-center gap-2">
                                    <h2 className="text-white font-bold text-xl">{newItem.title}</h2>
                                    <p className="text-white font-light text-xs">{newItem.description}</p>
                                </div>
                            </Link>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext className="absolute right-2 bg-transparent text-white border-0 hover:bg-white hover:bg-opacity-50 duration-300" />
            <CarouselPrevious className="absolute left-2 bg-transparent text-white border-0 hover:bg-white hover:bg-opacity-50 duration-300" />
        </Carousel>
    )
}
