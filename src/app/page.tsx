import NavBar from "@/components/NavBar";
import { auth } from "./api/auth/[...nextauth]/route";


export default async function Home() {
  const session = await auth()
  
  return (
    <main>
      <NavBar/>
    </main>
    );
}
