import Link from 'next/link'
import React from 'react'
import SignInButton from './SignInButton'


export default function FormNoAuth({formTitle} :{formTitle:'Login' |'Register'}) {

    const opositeTitle = formTitle === "Login" ? "register" :"login"
    const question = formTitle === "Login" ? "Forgot password ?" :"Already have an account ?"

  return (
    <div className='h-[70%] w-[60%]'>
        <h2 className='text-3xl font-semibold text-brand-primary text-center mb-8'>{formTitle}</h2>
        <p className='text-center'>Don`t have account? <Link className='text-brand-secondary' href={`/${opositeTitle}`}>{opositeTitle}</Link></p>
        <div>
            <div className='flex items-center justify-center my-4'>
                <SignInButton/>
            </div>
            <p className='text-center'>----Or----</p>
            <form className='flex flex-col gap-3 mt-4'>

                <label htmlFor="email" className='text-brand-primary font-medium'>Email adress</label>
                <input type="email" name='email' placeholder={`✉️ Example@gmail.com`} className='ring-1 ring-slate-300 py-1 px-3 text-brand-third '/>

                <label htmlFor="password" className='text-brand-primary font-medium'>Password</label>
                <input type="password"  name='password' placeholder={`🔑 your password`} className=' w-full ring-1 ring-slate-300 py-1 px-3 text-brand-third '/>
                
            </form>
            <div className='flex justify-center items-center flex-col'>
                <button className='bg-brand-secondary text-white py-1 w-full mt-4'>{formTitle}</button>
                <Link href={""} className='hover:text-brand-secondary'>{question}</Link>
            </div>
        </div>
    </div>
  )
}
