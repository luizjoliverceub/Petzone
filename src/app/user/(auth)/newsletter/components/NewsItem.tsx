import { CarouselItem } from "@/components/ui/carousel";
import { NewsType } from "@/models/Types";
import Image from 'next/image';
import Link from "next/link";

export function NewsItem({ item }: { item: NewsType }) {
    return (
        <CarouselItem className="basis-1/3">
            <Link href={`#${item.title}`}>
                <div className="bg-black rounded-xl relative shadow-custom3">

                    <Image
                        alt={item.title}
                        src={item.imgUrl}
                        height={300}
                        width={515}
                        className="rounded-xl opacity-60 hidden lg:flex"
                    />

                    <h2 className="absolute text-white font-medium top-6 left-6">{item.webSite}</h2>

                    <div className="absolute bottom-5 px-12 py-4 flex flex-col justify-start items-center gap-2">
                        <h2 className="text-white font-bold text-xl">{item.title}</h2>
                        <p className="text-white font-light text-xs">{item.description}</p>
                    </div>
                </div>
            </Link>
        </CarouselItem>
    )
}