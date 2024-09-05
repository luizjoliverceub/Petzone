import { redirect } from "next/navigation";
import { auth } from "./api/auth/[...nextauth]/route";
import { Session } from "next-auth";

export default async function Home() {
  const session = await auth() as Session | null;

    if (session?.user?.role === 'normal') {
        return redirect('/user/home')
    }

    if (session?.user?.role === 'veterinarian') {
        return redirect('/vet/home')
    }

    if (!session) {
      return redirect('/welcome')
    }

}
