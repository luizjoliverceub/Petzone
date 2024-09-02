"use client"

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";


export default function SignOutBtn({ styles }: { styles?: string }) {

  return (
    <button className={styles ? styles : "p-2 bg-brand-third rounded-full"} onClick={() => signOut()}>
      <LogOut className="size-5" />Desconectar
    </button>
  )
}
