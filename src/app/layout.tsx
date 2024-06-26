import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "../components/providers/NextAuthProvider"
import "./globals.css";
import { auth } from "./api/auth/[...nextauth]/route";
import { Toaster } from 'sonner';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await auth()

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        
          <SessionProvider session={session}>
            {children}
            <Toaster
            toastOptions={{
              classNames: {
                error: 'bg-red-400',
                success: 'text-green-400',
                warning: 'text-yellow-400',
                info: 'bg-blue-400',
              },
            }}/>
          </SessionProvider>

      </body>
    </html>
  );
}
