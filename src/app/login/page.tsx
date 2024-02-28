

import SignInButton from '@/components/SignInButton'
import { auth } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';




export default  async function LoginPage() {

  const session = await auth()
 
  if(session || session?.user.name){
    redirect("/")
  
  }

  return (
    <header className='flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow'>

        <SignInButton/>

    </header>
  )
}
