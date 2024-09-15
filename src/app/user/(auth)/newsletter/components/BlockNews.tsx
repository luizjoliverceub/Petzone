import { Carousel, CarouselContent } from "@/components/ui/carousel"
import { NewsItem } from "./NewsItem"
import { NewsType } from "@/models/Types"

export function BlockNews({ news }: { news: NewsType[] }) {
    return (
        <div>
            <div className="py-14 relative animate-fade-in">
                <Carousel>
                    <CarouselContent className="gap-10 px-12">
                        {news.map(item => (
                            <NewsItem item={item} key={item.id} />
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    )
}