'use client'

import { useUser } from "@/contexts/UserContext";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AddPet } from "./AddPet";
import { Session } from "next-auth";
import { useQuery } from "@tanstack/react-query";
import { CreatePetSchema } from "@/utils/actions/AddPet";

export function NavPet() {
    const { session, handleAddPet } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const { id: currentPetId } = useParams<{ id: string }>();

    const { data, isLoading, error } = useQuery<CreatePetSchema[]>({
        queryKey: ['pets-data'],
        queryFn: () =>
            fetch("/api/pets").then((res) =>
                res.json()
            )
    });

    const toggleOpen = () => setIsOpen(prev => !prev);

    return (
        <>
            <div className={`w-full flex items-start animate-fade-in`}>
                <div className="w-full flex justify-start items-center px-8 py-4 gap-8">
                    <div className="flex flex-1 gap-6">
                        {data?.map(pet => (
                            <Link
                                href={`/user/pets/${pet.id}`}
                                key={pet.id}
                                className={`px-4 py-2 font-medium rounded-md ${currentPetId === pet.id ? 'bg-brand-primary text-white' : 'hover:bg-brand-primary hover:text-white duration-300'}`}
                            >
                                {pet.name}
                            </Link>
                        )) 
                        }
                    </div>
                    <button
                        onClick={toggleOpen}
                        className="w-[166px] h-11 border-2 border-transparent bg-brand-secondary font-medium px-4 py-2 rounded-md text-white hover:bg-transparent hover:text-brand-secondary hover:border-brand-secondary duration-300 flex gap-2 justify-center items-center"
                    >
                        Adicionar pet
                        <Plus className="size-5" />
                    </button>
                </div>
            </div>

            {isOpen && <AddPet user={session as Session} onPetAdded={handleAddPet} setOpen={toggleOpen} />}
        </>
    );
}
