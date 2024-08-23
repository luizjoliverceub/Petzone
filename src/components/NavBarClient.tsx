
import Link from "next/link"
import NavBarLinks from "./NavBarLinks";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import SignOutBtn from "./SignOutBtn";
import Image from "next/image";
import { redirect } from "next/navigation";


export default async function NavBarClient() {



    const session = await auth()
    console.log("user session" + session?.user?.role);

    if (!session || session?.user?.role !== "normal") {
        redirect("/")

    }

    return (
        <nav className="w-44 h-[100vh] bg-brand-primary flex flex-col gap-3 text-white lg:w-64">

            <div className="lg:w-60 w-40  h-[90vh] flex flex-col  items-center gap-2">
                {/* Petzone and image container*/}
                <div className="my-10">
                    <div className="flex flex-col gap-4">
                        <Link href={"/pets"} className="font-bold text-2xl">PetZone</Link>
                        <span className="p-2 bg-brand-third w-48 flex gap-2 rounded-md">
                            {session?.user?.image ? <Image src={`${session?.user?.image}`} width={20} height={20} alt="user image" /> : ""}
                            {session?.user?.name.slice(0, 12) || "Desconectado"}
                        </span>
                    </div>
                </div>
                {/* Navigation Container*/}
                <div>
                    <ul className="flex gap-2 flex-col justify-center">
                        <NavBarLinks />
                    </ul>
                </div>
                <div className=" flex flex-col my-10">
                    <SignOutBtn />
                </div>
            </div>
        </nav>
    )
}