'use client';

import { createContext, useState, ReactNode, useContext, useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";

// Importações de Ações
import { CreatePetSchema } from "@/utils/actions/AddPet";
import { getAllPets } from "@/utils/actions/GetAllPets";
import { getAllVets } from "@/utils/actions/GetAllVets";
import { getAppointments } from "@/utils/actions/GetAppointments";
import { getAllNews } from "@/utils/actions/GetAllNews";

// Importações de Tipos
import { AppointmentType, NewsType, VeterinarianType } from "@/models/Types";
import { Session } from "next-auth";

// Definição do tipo Pet
export interface PetType extends CreatePetSchema {
  user: {
    name: string;
  };
  vaccinations: {
    id: string;
    name: string;
    petId: string;
  }[];
}

// Interface do Contexto
interface UserContextType {
  isLoggingOut: boolean;
  refresh: boolean;
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
  pets: PetType[];
  vets: VeterinarianType[];
  news: NewsType[];
  appointments: AppointmentType[];
  handleLogout: () => void;
  handleAddPet: () => void;
  amountValue: number
  handleAmount: (value: number) => void
}

// Criação do contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provedor do Contexto
export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [pets, setPets] = useState<PetType[]>([]);
  const [vets, setVets] = useState<VeterinarianType[]>([]);
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [news, setNews] = useState<NewsType[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [amountValue, setAmountValue] = useState(0);

  const { data: session, status } = useSession();

  const handleAmount = (value: number) => {
    setAmountValue(value)
  }

  // Função para buscar todos os pets
  const handleFetchPets = useCallback(async () => {
    if (status === "authenticated") {
      const data = await getAllPets();
      setPets(data);
    }
  }, [status]);

  // Função para buscar todos os veterinários
  const handleFetchVets = useCallback(async () => {
    if (status === "authenticated") {
      const data = await getAllVets();
      setVets(data);
    }
  }, [status]);

  // Função para buscar todos os agendamentos
  const handleFetchAppointments = useCallback(async () => {
    if (status === "authenticated") {
      const data = await getAppointments();
      setAppointments(data);
    }
  }, [status]);

  // Função para buscar todas as notícias
  const handleFetchNews = useCallback(async () => {
    if (status === "authenticated") {
      const data = await getAllNews();
      setNews(data);
    }
  }, [status]);

  // Efeitos para carregar dados
  useEffect(() => {
    handleFetchPets();
    handleFetchVets();
    handleFetchAppointments();
    handleFetchNews();
  }, [refresh, handleFetchPets, handleFetchVets, handleFetchAppointments, handleFetchNews]);

  // Função para adicionar um pet
  const handleAddPet = useCallback(() => {
    setRefresh((prev) => !prev);
  }, []);

  // Função para logout
  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: '/welcome' });
  }, []);

  if (isLoggingOut) {
    return <LoadingScreen />;
  }

  return (
    <UserContext.Provider
      value={{
        isLoggingOut,
        handleLogout,
        handleAddPet,
        pets,
        refresh,
        status,
        session,
        vets,
        news,
        appointments,
        handleAmount,
        amountValue
      }}>
      {children}
    </UserContext.Provider>
  );
}

// Componente de Loading
function LoadingScreen() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4 animate-fade-in">
      <h2 className="font-semibold text-lg">Saindo...</h2>
      <span className="animate-spin h-12 w-12 mr-3 rounded-full border-4 border-l-brand-primary" />
    </div>
  );
}

// Hook para usar o contexto
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
