import AuthHeader from '@/components/Auth/AuthHeader'
import React from 'react'

export default function VeterinarioMessage() {
  return (
    <div className="h-screen w-full">
    <AuthHeader link="/veterinario/dashboard/create" linkText="+Add Pet" titleText="Vet Message"/>
  </div>
  )
}
