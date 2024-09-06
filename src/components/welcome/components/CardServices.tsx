import { MessageCircle, IdCard, ClipboardPlus, FileStack, BadgeDollarSign, PartyPopper } from "lucide-react";

interface CardServicesProps {
    chat?: boolean
    petcard?: boolean
    consult?: boolean
    fileStack?: boolean
    badgeDollarSign?: boolean
    partyPopper?: boolean
    description: string
    title: string
}

export function CardServices({ chat, petcard, consult, fileStack, badgeDollarSign, partyPopper, description, title }: CardServicesProps) {
    return (
        <div className="relative group animate-fade-in">
            <div className="flex flex-col gap-6 px-10 py-14 w-[340px] h-96 rounded-3xl border-[3px] border-zinc-300 items-center justify-center">
                <div className="flex-1 flex items-center justify-center">
                    {chat && <MessageCircle className="size-24 text-brand-secondary" />}
                    {petcard && <IdCard className="size-24 text-brand-secondary" />}
                    {consult && <ClipboardPlus className="size-24 text-brand-secondary" />}
                    {fileStack && <FileStack className="size-24 text-brand-secondary" />}
                    {badgeDollarSign && <BadgeDollarSign className="size-24 text-brand-secondary" />}
                    {partyPopper && <PartyPopper className="size-24 text-brand-secondary" />}
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-semibold text-brand-primary">{title}</h3>
                </div>
            </div>
            <div className="hidden group-hover:flex group-hover:flex-col gap-6 px-10 py-14 w-[340px] h-96 rounded-3xl border-[3px] border-brand-primary items-center justify-center bg-brand-primary absolute top-0 animate-fade-in">
                <div className="flex flex-col gap-10">
                    <h3 className="text-2xl font-semibold text-white text-center">{title}</h3>
                    <p className="text-white">{description}</p>
                </div>
            </div>
        </div>
    )
}