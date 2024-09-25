"use client";

import { Search } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from 'sonner';
import { useState, useEffect } from "react";
import { getPetByidByVet } from "@/utils/actions/GetPetByIdByVet";
import PetsBoard from "@/components/Auth/vet/PetsBoard";
import { PetType } from "@/contexts/UserContext";

const AddPetSchema = z.object({
  id: z.string().nonempty("O ID do pet é obrigatório.")
});

type typeAddPetSchema = z.infer<typeof AddPetSchema>;

export default function VeterinarioAllpets() {
  const [pets, setPets] = useState<PetType[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors }
  } = useForm<typeAddPetSchema>({
    resolver: zodResolver(AddPetSchema),
    defaultValues: { id: '' }
  });

  useEffect(() => {
    setValue('id', inputValue);
  }, [inputValue, setValue]);

  async function OnSubmit(data: typeAddPetSchema) {
    const { id } = data;
    const formatedData = { id };

    try {
      const resp = await getPetByidByVet(formatedData);
      setPets([]);
      setPets((prev) => [...prev, resp]);
      toast.success('Pet Adicionado com sucesso!');
    } catch (error) {
      toast.error('Erro ao adicionar o pet.');
    }

    setInputValue('');
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const pasteInput = async () => {
    try {
      const data = await navigator.clipboard.readText();
      setInputValue(data);
    } catch (error) {
      // toast.error('Erro ao colar o texto.');
    }
  };

  return (
    <div className="h-full w-full py-8 flex flex-col gap-4">
      <div className="w-full flex justify-center">
        <form
          className="relative flex justify-center items-center w-[396px]"
          noValidate
          onSubmit={handleSubmit(OnSubmit)}
        >
          <input
            type="text"
            className="border-2 rounded-xl outline-none pl-10 pr-4 py-3 font-medium w-[396px] text-sm shadow-lg"
            placeholder='Pet Id'
            {...register("id")}
            onChange={handleInput}
          />
          <Search
            className={`absolute size-4 left-4 top-4 ${inputValue ? 'text-vet-secondary' : 'text-zinc-400'} duration-300`}
            strokeWidth={3}
          />
          {inputValue ?
            <button
              type="submit"
              className="absolute right-4 top-3 text-vet-primary text-sm font-medium animate-fade-in hover:underline duration-300"
              disabled={isSubmitting}
            >
              Pesquisar
            </button> :
            <button
              type="button"
              className="absolute right-4 top-3 text-vet-primary text-sm font-medium animate-fade-in hover:underline duration-300"
              onClick={pasteInput}
            >
              Colar
            </button>
          }
        </form>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <PetsBoard pets={pets} />
      </div>
    </div>
  );
}
