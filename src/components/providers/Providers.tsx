import { auth } from "@/app/api/auth/[...nextauth]/route";
import { UserProvider } from "@/contexts/UserContext";
import { SessionProvider } from "next-auth/react";

export async function Providers({ children }: { children: React.ReactNode; }) {
    const session = await auth()

    return (
        <SessionProvider session={session}>
            <UserProvider>
                {children}
            </UserProvider>
        </SessionProvider>
    )
}