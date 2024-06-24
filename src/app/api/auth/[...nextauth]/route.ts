import { prisma } from "@/utils/db/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { User } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        
        if (!credentials || !credentials.email || !credentials.password) return null;

        const dbUser = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        // Verify Password here
        // In production, passwords should be encrypted using something like bcrypt...

        if (dbUser && credentials.password === dbUser.password) {
          const { emailVerified,  ...dbUserWithoutPassword } = dbUser;
          
          return dbUserWithoutPassword as User;
        }

        return null;
      },
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // First sign in
      if (user) {
        token.id = user.id; // Include user ID in token
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass role and user ID through session
      session.user.role = token.role;
      session.user.id = token.id; // Include user ID in session
      return session;
    },
  },
});