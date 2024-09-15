import { BlockAllNews } from "./components/BlockAllNews";
import { HeaderHome } from "./components/HeaderHome";

export default function Home() {
    
    return (
        <main className="ml-64 w-full">
            <HeaderHome />
            <BlockAllNews />
        </main>
    )
}