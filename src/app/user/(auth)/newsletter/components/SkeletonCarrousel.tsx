import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export function SkeletonCarrousel() {
    return (
        <div className="py-14 animate-fade-in">
            <Carousel>
                <CarouselContent className="gap-10 px-12">
                    <CarouselItem className="basis-1/3">
                        <div className="bg-zinc-300 animate-pulse h-[340px] rounded-xl" />
                    </CarouselItem>
                    <CarouselItem className="basis-1/3">
                        <div className="bg-zinc-300 animate-pulse h-[340px] rounded-xl" />
                    </CarouselItem>
                    <CarouselItem className="basis-1/3">
                        <div className="bg-zinc-300 animate-pulse h-[340px] rounded-xl" />
                    </CarouselItem>
                    <CarouselItem className="basis-1/3">
                        <div className="bg-zinc-300 animate-pulse h-[340px] rounded-xl" />
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>
    )
}