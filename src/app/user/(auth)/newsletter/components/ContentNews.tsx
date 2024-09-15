import { NewsType } from "@/models/Types";
import Image from "next/image";

export function ContentNews({ news }: { news: NewsType[] }) {
    return (
        <div className="w-full p-12 grid grid-cols-1 gap-x-10 gap-y-16 2xl:grid-cols-2">
            {
                news.map(item => (
                    <div className="w-full px-8 py-6 rounded-xl shadow-custom2 border-2 hover:shadow-custom3 duration-300 group animate-fade-in" key={item.id} id={item.title}>
                        <div className="flex flex-col gap-10">
                            <div className="flex items-end gap-10">
                                <Image alt={item.title} src={item.imgUrl} width={300} height={150} className="rounded-xl" />
                                <div className="flex flex-col gap-5">
                                    <h2 className="font-semibold text-lg">{item.title}</h2>
                                    <p className="text-sm font-light">{item.description}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm">{item.content}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}