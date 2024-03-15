"use client"

import { Pet } from "@prisma/client"
import { useQueryClient } from "@tanstack/react-query"
import Link from "next/link"

export default function SinglePetComponent() {

    const queryClient = useQueryClient()

    const allPets = queryClient.getQueryData(["pets"]) as Pet[]

    const firstPet = allPets.length >= 0 ?  allPets.filter((pet,index) => index === 0) : null
    
  
    

  return (
    <div className="w-full h-full  flex">
        
       

        <Link href={"/pets"} className="group hover:brightness-90 w-full h-full">
            <div className="h-full w-full bg-brand-secondary">
                {
                   allPets.length > 0  ? (firstPet?.map((pet) =>(
                    <div key={pet.id} className="w-full h-full flex ">
                         <div className=" -full w-1/3 bg-blue-100 flex items-start justify-center ">
                            <img src="/gato2.jpg" className=" group-hover:scale-110 h-20 w-20 bg-yellow-600 my-4"/>
                        </div>
                        <div key={pet.id} className="h-full w-2/3 flex flex-col justify-center items-center bg-brand-secondary px-4 py-2">
                            <div className="text-white text-xl w-full h-1/4 ">
                                {pet.name}
                            </div>
                            <div className="text-white w-full h-3/4">
                                <div className="w-full">
                                    <span>Race</span>
                                    <p className="w-full bg-blue-300 rounded-md px-2">
                                        {pet.race}
                                    </p>
                                </div>
                                <div className="w-full flex gap-4">
                                    <div className="w-1/2">
                                        <span>sex</span>
                                        <p className="w-full bg-blue-300 rounded-md px-2">
                                            {pet.sex}
                                        </p>
                                    </div>
                                    <div className="w-1/2">
                                        <span>age</span>
                                        <p className="w-full bg-blue-300 rounded-md px-2">
                                            {pet.age}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full h-full">
                                    <span>city</span>
                                    <p className="w-full bg-blue-300 rounded-md px-2">
                                        {pet.city}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                    ))) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <p>Nenhum pet cadastrado</p>
                      </div>
                    )
                }
            </div>
        </Link>
    </div>
  )
}
