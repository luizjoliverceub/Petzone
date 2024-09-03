import { auth } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import NoAuthHeader from '@/components/noAuth/NoAuthHeader';
import NoAuthContent from '@/components/noAuth/NoAuthContent';

export default  async function LoginPage() {

  const session = await auth()
 
  if(session || session?.user.name){
    redirect("/pets")
  
  }

  return (
    <>
    <NoAuthHeader authTitle='register' homePage={false}/>
    <NoAuthContent formTitle='Login'/>
    </>
  )
}
