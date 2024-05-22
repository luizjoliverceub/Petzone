"use client"

import NoAuthHeader from "@/components/noAuth/NoAuthHeader";
import { useSearchParams } from 'next/navigation'

const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  default: "Garanta que esteja Registrado em nosso sistema ou Verifique suas credenciais",
}

export default function ErrorLoginPage() {

  const searchParams = useSearchParams()
 
  const error = searchParams.get('error')

  const errorMessage = error && (errors[error as keyof typeof errors] ?? errors.default)
    
  return (
    <main>
      <NoAuthHeader authTitle="register" homePage/>
      <section className="h-[calc(100vh-7rem)] flex items-center justify-center text-3xl font-bold">
          <p>{errorMessage|| "Something went wrong"}</p>
      </section>
    </main>
  )
}
