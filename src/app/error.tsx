"use client"

import NoAuthHeader from "@/components/noAuth/NoAuthHeader";


export default function error({error,reset} :{error:Error, reset:() => void}) {
    console.log(error,reset);
    
  return (
    <main>
      <NoAuthHeader authTitle="register" homePage/>
      <section className="h-[calc(100vh-7rem)] flex items-center justify-center text-3xl font-bold">
          <p>{error.message || "Something went wrong"}</p>
      </section>
    </main>
  )
}
