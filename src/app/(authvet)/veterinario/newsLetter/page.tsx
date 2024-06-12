import AuthHeader from '@/components/Auth/AuthHeader'
import React from 'react'

export default function VeterinarioNewsLetter() {
  return (
    <div className="h-screen w-full">
    <AuthHeader link="/veterinario/dashboard/create" linkText="+Add Pet" titleText="Vet NewsLetter"/>
  </div>
  )
}
