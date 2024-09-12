import { VeterinarianType } from "@/models/Types";
import Link from "next/link";

export function NavVets({ data }: { data?: VeterinarianType[] | undefined }) {
    return (
        data ? data?.length === 0 ?
            <div className="flex justify-center">
                <h2 className="font-medium">Nenhum veterinario encontrado</h2>
            </div> :
            data?.map(vet => (
                <Link href={`/user/consults/${vet.id}`} key={vet.id}>
                    <div className="h-28 w-72 rounded-xl py-2 px-4 flex gap-3 items-center justify-center animate-fade-in border-2 hover:shadow-lg duration-300">
                        <div className="h-20 w-20 rounded-full bg-zinc-700" />
                        <div className="py-2 flex-1 flex flex-col justify-center">
                            <h3 className="font-medium text-lg">Dr. {vet.user.name}</h3>
                            <h3 className="font-medium text-sm text-zinc-500">Clinica: {vet.region}</h3>
                            <h3 className="font-medium text-sm text-zinc-500">CRMV: {vet.crmv}</h3>
                        </div>
                    </div>
                </Link>
            )) :
            <div className="flex justify-center">
                <h2 className="font-medium">Nenhum veterinario encontrado</h2>
            </div>
    )
}