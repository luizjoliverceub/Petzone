import Image from "next/image";
import FormNoAuthVet from "./FormNoAuthVet";

<<<<<<< HEAD
export default function NoAuthContentVet({ formTitle }: { formTitle: 'Login (Veterinário)' | 'Register Veterinário' }) {
  return (
    <section className='w-full h-[calc(100vh-7rem)] flex '>
      { /*FormContainer*/}
      <div className="w-full h-[calc(100vh-4rem)] lg:h-[calc(100vh-7rem)] flex items-center justify-center lg:w-1/2">
        <FormNoAuthVet formTitle={formTitle} />
      </div>
      { /* IntroContainer*/}
      <div className="hidden h-full relative flex-col items-center lg:w-1/2 lg:flex">

        <div className="z-20 absolute flex flex-col items-center justify-start w-[70%] h-full py-10 gap-5">
          <h1 className="text-white text-5xl  font-semibold  text-center">Welcome to Petzone</h1>
          <p className="text-sm font-thin text-white text-center ">Your friendly zone dedicated to all things pets and companionship! Explore, connect, and celebrate the joy of pet ownership with us.</p>
        </div>

        <Image src="/vetpic.png" alt="vet"
          className="object-cover z-0 brightness-50 object-right-bottom"
          fill />

      </div>
=======



export default function NoAuthContentVet({formTitle}:{formTitle:'Login (Veterinário)'| 'Register Veterinário'}) {
  return (
    <section className='w-full h-[calc(100vh-7rem)] flex '>
          { /*FormContainer*/ }
        <div className="w-full h-[calc(100vh-4rem)] lg:h-[calc(100vh-7rem)] flex items-center justify-center lg:w-1/2">
            <FormNoAuthVet  formTitle={formTitle}/>
        </div>
        { /* IntroContainer*/ }
        <div className= "hidden h-full relative flex-col items-center lg:w-1/2 lg:flex"> 

            <div className="z-20 absolute flex flex-col items-center justify-start w-[70%] h-full py-10 gap-5">
              <h1 className="text-white text-5xl  font-semibold  text-center">Welcome to Petzone</h1>
              <p className="text-sm font-thin text-white text-center ">Your friendly zone dedicated to all things pets and companionship! Explore, connect, and celebrate the joy of pet ownership with us.</p>
            </div>

            <Image src="/vetpic.png" alt="vet" 
            className="object-cover z-0 brightness-50 object-right-bottom"
            fill />
          
        </div>
>>>>>>> luiz
    </section>
  )
}
