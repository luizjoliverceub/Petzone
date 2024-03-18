
import { auth } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import NoAuthHeader from '@/components/NoAuthHeader';
import NoAuthContent from '@/components/NoAuthContent';




export default  async function LoginPage() {

  const session = await auth()
 
  if(session || session?.user.name){
    redirect("/pets")
  
  }

  return (
    <>
    <NoAuthHeader authTitle='login' homePage={false}/>
    <NoAuthContent formTitle='Register'/>
    </>
  )
}
