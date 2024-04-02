import SignInButton from '@/components/SignInButton'
import Link from 'next/link'
import React from 'react'


export default function FormNoAuthVet({formTitle} :{formTitle:'Login (Veterinário)' | 'Register Veterinário'}) {

    const opositeTitle = formTitle === "Login (Veterinário)" ? "register" :"login"

    const question = formTitle === "Login (Veterinário)" ? "Forgot password ?" :"login"

  return (
    formTitle === "Login (Veterinário)" ? ( <div className='h-[70%] w-[60%]'>
        <h2 className='text-3xl font-semibold text-brand-primary text-center mb-6'>{formTitle}</h2>
        <p className='text-center'>Don`t have a vet account? <Link className='text-brand-secondary' href={`${opositeTitle}`}>{opositeTitle}</Link></p>
        <div>
            <div className='flex items-center justify-center my-4'>
                <SignInButton/>
            </div>

           <div className="flex items-center">
                <hr className="flex-grow border-slate-300" />
                <p className="text-black">Or</p>
                <hr className="flex-grow border-slate-300" />
           </div>

            <form className='flex flex-col gap-3 mt-4'>

                <label htmlFor="email" className='text-brand-primary font-medium'>Email adress</label>
                <input type="email" name='email' placeholder={`✉️ Example@gmail.com`} className='ring-1 ring-slate-300 py-1 px-3 text-brand-third '/>

                <label htmlFor="password" className='text-brand-primary font-medium'>Password</label>
                <input type="password"  name='password' placeholder={`🔑 your password`} className=' w-full ring-1 ring-slate-300 py-1 px-3 text-brand-third '/>
                
            </form>
            <div className='flex justify-center items-center flex-col hover:brightness-90'>
                <button className='bg-brand-secondary text-white py-1 w-full mt-4'>{formTitle}</button>
                <Link href={""} className='hover:text-brand-secondary'>{question}</Link>
            </div>
        </div>
    </div>) : (
        <div className='h-[90%] w-[60%]'>
            <h2 className='text-3xl font-semibold text-brand-primary text-center mb-4'>{formTitle}</h2>
              <p className='text-center'>have an vet account?   <Link href={`/veterinario/${opositeTitle}`} className='text-brand-secondary'>{question}</Link></p> 
             <form className='flex flex-col gap-3 mt-4'>

                <label htmlFor="username" className='text-brand-primary font-medium'>UserName</label>
                <input type="text" name='username' id='username' placeholder={`Ex : Jhon984`} className='ring-1 ring-slate-300 py-1 px-3 text-brand-third '/>

                <label htmlFor="email" className='text-brand-primary font-medium'>Email adress</label>
                <input type="email" name='email' id='email' placeholder={`✉️ Example@gmail.com`} className='ring-1 ring-slate-300 py-1 px-3 text-brand-third '/>

                <label htmlFor="password" className='text-brand-primary font-medium'>Password</label>
                <input type="password"  name='password' id='password' placeholder={`🔑 your password`} className=' w-full ring-1 ring-slate-300 py-1 px-3 text-brand-third '/>
                
            </form>

            <div className="flex items-center gap-4 mt-4">
                <hr className="flex-grow border-slate-300" />
                <p className="text-black">Or</p>
                <hr className="flex-grow border-slate-300" />
           </div>

           <div className='flex items-center justify-center my-4'>
                <SignInButton/>
            </div>

            <div className='flex justify-center items-center flex-col hover:brightness-90'>
                <button className='bg-brand-secondary text-white py-1 w-full mt-2'>{formTitle}</button>
              
            </div>

        </div>

    )
  )
}
