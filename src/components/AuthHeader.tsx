import Link from 'next/link'
import React from 'react'

export default function AuthHeader({titleText,linkText,link} :{titleText:string,linkText:string,link:string}) {
  return (
    <header className='w-full h-20 flex items-center justify-between px-4 
    border-b border-b-slate-300'>
        <h3 className='text-brand-secondary text-2xl'>{titleText}</h3>
        <Link href={link} className='text-brand-secondary font-semibold px-3 py-1 bg-blue-100 opacity-80'>{linkText}
           </Link>
    </header>
  )
}
