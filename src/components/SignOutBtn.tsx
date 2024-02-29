"use client"

import { signOut} from "next-auth/react";
export default function SignOutBtn() {
  return (
    <button className="p-2 bg-brand-third rounded-full" onClick={() => signOut()}>
                                Sign Out
            </button>
  )
}
