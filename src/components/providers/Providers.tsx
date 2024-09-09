import { auth } from "@/app/api/auth/[...nextauth]/route";
import { UserProvider } from "@/contexts/UserContext";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from "@/hooks/useQuery";

export async function Providers({ children }: { children: React.ReactNode; }) {
    const session = await auth()

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    {children}
                </UserProvider>
            </QueryClientProvider>
        </SessionProvider>


    )
}