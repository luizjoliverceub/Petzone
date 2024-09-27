'use client';

import { useUser } from "@/contexts/UserContext";
import { CreateUserSchema } from "@/utils/actions/RegisterUser";
import { Bird, Bone, Cat, Dog, Fish, Rabbit, Rat, Turtle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { pets, session } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pets.length > 0) {
      router.push(`/user/pets/${pets[0].id}`);
    } else {
      setIsLoading(false);
    }
  }, [pets, router]);

  if (isLoading) {
    return (
      <main className="h-full w-full flex items-center justify-center">
        <p className="text-zinc-500">Carregando...</p>
      </main>
    );
  }

  console.log(pets)

  if (pets.length == 0) {
    return (
      <main className="h-full w-full flex items-center justify-center flex-col">
        <div className="h-72 w-[480px] flex flex-col justify-center items-center relative z-0">
          <Bone className="size-14 bg-brand-primary rounded-2xl text-white p-2 absolute z-0 top-32" />
          <Cat className="size-10 text-zinc-400 absolute z-0 top-6 left-40" />
          <Dog className="size-8 text-zinc-300 absolute z-0 top-16 left-6" />
          <Fish className="size-6 text-zinc-300 absolute z-0 bottom-2 left-8" />
          <Rabbit className="size-10 text-zinc-500 absolute z-0 bottom-16 left-28" />
          <Rat className="size-8 text-zinc-400 absolute z-0 bottom-36 right-2" />
          <Bird className="size-10 text-zinc-500 absolute z-0 top-20 right-32" />
          <Turtle className="size-8 text-zinc-300 absolute z-0 bottom-0 right-7" />
        </div>
        <div className="text-center">
          <h2 className="font-bold text-2xl text-brand-primary">Sem Pets por aqui</h2>
          <p className="font-medium text-sm text-zinc-500">
            Para registrar seu amiguinho, clique em <span className="text-brand-secondary">Adicionar pet</span>
          </p>
        </div>
      </main>
    );
  }

  return null
}
