import { Blocks } from "@/app/user/(auth)/home/components/Blocks";
import { HeaderHome } from "@/app/user/(auth)/home/components/HeaderHome";

export default function Home() {
    return (
        <main className="ml-64 w-full h-full bg-gray-100 overflow-x-hidden">
            <HeaderHome />
            <Blocks />
        </main>
    )
}