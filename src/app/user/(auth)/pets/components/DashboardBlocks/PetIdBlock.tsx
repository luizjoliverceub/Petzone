import { Check, Copy, Settings } from "lucide-react";
import { Options } from "../Options";
import { useState } from "react";
import { CreatePetSchema } from "@/utils/actions/AddPet";

export function PetIdBlock({ pet, handleOpenRemove }: { pet: CreatePetSchema, handleOpenRemove: () => void }) {
    const [isOpenOptions, setIsOpenOptions] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    const handleOpenOptions = () => {
        setIsOpenOptions(!isOpenOptions)
    }

    const clipboardBtn = () => {
        setIsClicked(true);
        navigator.clipboard.writeText(pet.id)
        setTimeout(() => {
            setIsClicked(false);
        }, 3000);
    }
    
    return (
        <div className="border-2 rounded-xl px-4 py-4 flex flex-col gap-4 items-center justify-center h-[352px]">
                        <div className="flex w-full justify-end">
                            <button
                                type="button"
                                className="p-0.5 rounded-full text-zinc-400 hover:text-zinc-800 duration-300"
                                onClick={handleOpenOptions}
                            >
                                <Settings className="size-5" />
                            </button>
                            {isOpenOptions && <Options handleRemove={handleOpenRemove} handleOpen={handleOpenOptions} />}
                        </div>
                        <div>
                            <div className="w-48 h-48 rounded-full bg-zinc-300"></div>
                        </div>
                        <div className="flex flex-col text-center">
                            <h2 className="w-auto font-semibold text-2xl flex gap-1 items-center justify-center relative">{pet.name}
                                <button
                                    title='Copiar ID'
                                    className={`group p-0.5 h-5 w-5 flex items-center justify-center rounded-md ${isClicked ? 'bg-green-600' : 'hover:bg-zinc-300'} duration-300 absolute top-2 -right-5`}
                                    onClick={clipboardBtn}
                                >
                                    {isClicked ? <Check strokeWidth={3} className="animate-fade-in text-white" /> : <Copy className="animate-fade-in" />}
                                </button></h2>
                            <h3 className="font-medium text-lg text-zinc-400">{pet.race}</h3>
                        </div>
                    </div>
    )
}