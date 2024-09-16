export function Service({ name }: { name: string }) {
    return (
        <div className="border-2 px-3 py-1 rounded-xl text-zinc-500 flex shadow-sm hover:text-black hover:shadow-xl duration-300 animate-fade-in">
            <h3 className="font-medium">{name}</h3>
        </div>
    )
}