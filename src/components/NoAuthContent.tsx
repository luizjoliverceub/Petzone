import Image from "next/image";
import FormNoAuth from "./FormNoAuth";


export default function NoAuthContent({formTitle}:{formTitle:'Login'| 'Register'}) {
  return (
    <section className='w-full h-[calc(100vh-7rem)] flex '>
          { /*FormContainer*/ }
        <div className="w-1/2 h-full flex items-center justify-center ">
            <FormNoAuth formTitle={formTitle}/>
        </div>
        { /* IntroContainer*/ }
        <div className= "w-1/2 h-full relative"> 
            <Image src="/friends.png" alt="friends" 
            className="object-cover"
            fill />
        </div>
    </section>
  )
}
