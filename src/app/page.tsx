import { Session } from "next-auth";
import { auth } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth() as Session | null;

  if (session) {
    return redirect('/user/home');
  }

  return redirect("/welcome");
}
