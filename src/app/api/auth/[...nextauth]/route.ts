
import { prisma } from "@/utils/db/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"



export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
  } = NextAuth({
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },

  })