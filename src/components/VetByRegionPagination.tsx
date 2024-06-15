import { getAllRegions } from '@/utils/actions/GetAllRegions'
import Link from 'next/link'
import React from 'react'


export default async function VetByRegionPagination() {

    const allRegions = await getAllRegions()
 
    console.log(allRegions);

    console.log(allRegions);
    
  return (
    <header className='w-full h-20 border-b border-b-slate-300 flex justify-between px-4 items-center'>
      <nav className='w-[90%] h-full flex items-center justify-around '>
        {
         allRegions.map((region) =>(
            <Link href={`maps/${region.region}`} key={region.region} className=' text-white bg-brand-primary p-2 hover:text-brand-secondary'>
              {region.region}
            </Link>
          ))
        }
      </nav>
      
    </header>
  )
}
