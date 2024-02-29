import Image from "next/image";
import FormNoAuth from "./FormNoAuth";


export default function NoAuthContent({formTitle}:{formTitle:'Login'| 'Register'}) {
  return (
    <section className='w-full  h-[82.6vh] flex'>
          { /*FormContainer*/ }
        <div className="w-1/2 h-full flex items-center justify-center ">
            <FormNoAuth formTitle={formTitle}/>
        </div>
        { /* IntroContainer*/ }
        <div className= "w-1/2 h-full bg-cover bg-center"> 
            <Image src="/friends.png" alt="friends" sizes="100vw"
            width={0}
            height={0}
             style={{
              width:"100%",
              height:'100%'
            }}/>
        </div>
    </section>
  )
}
