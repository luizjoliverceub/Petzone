"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";

export default function SignInButton() {

    const {data:session} = useSession()
//remover
    if(session && session.user) {
         return (
            <div className="flex gap-4 ml-auto">
                <p className="text-sky-600">{session.user.name}</p>
                <img src={`${session.user.image}`} alt="user Img" />
                <button onClick={() => signOut()} className="text-red-600">
                    Sign Out
                </button>
            </div>
         )
    }
  return (
    <button onClick={() => signIn("google")} className="w-full text-black bg-white ring-1 ring-slate-300 px-5 py-1">
        <div className="flex items-center justify-center gap-2"> 
        <FcGoogle className="text-sm"/> <p>Google</p> 
        </div>
    </button>
  )
}
