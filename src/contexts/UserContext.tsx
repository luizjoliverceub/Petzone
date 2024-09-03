'use client'

import { CreatePetSchema } from "@/utils/actions/AddPet";
import { getAllPets } from "@/utils/actions/GetAllPets";
import { signOut, useSession } from "next-auth/react";
import { createContext, useState, ReactNode, useContext, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

interface UserContextType {
  isLoggingOut: boolean;
  refresh: boolean;
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
  pets: CreatePetSchema[];
  handleLogout: () => void;
  handleAddPet: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [pets, setPets] = useState<CreatePetSchema[]>([]);
  const [refresh, setRefresh] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/user/login");
  //   }
  // }, [status, router]); 

  const handleFetchPets = useCallback(async () => {
    if (status === "authenticated") {
      const data = await getAllPets();
      setPets(data);
    }
  }, [status]);

  useEffect(() => {
    handleFetchPets();
  }, [refresh, status, handleFetchPets]);

  const handleAddPet = useCallback(() => {
    setRefresh((prev) => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: '/welcome'});
  }, []);

  if (isLoggingOut) {
    return <LoadingScreen />;
  }

  return (
    <UserContext.Provider value={{ isLoggingOut, handleLogout, handleAddPet, pets, refresh, status, session }}>
      {children}
    </UserContext.Provider>
  );
}

function LoadingScreen() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4 animate-fade-in">
      <h2 className="font-semibold text-lg">Saindo...</h2>
      <span className="animate-spin h-12 w-12 mr-3 rounded-full border-4 border-l-brand-primary" />
    </div>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}