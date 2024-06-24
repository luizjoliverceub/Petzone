import React from 'react'
import VetByRegionPagination from './VetByRegionPagination'

type Regions = {
    region: string
}

export default  function AllRegionsDashboard({ regions }: { regions: Regions[] }) {
    
    //const allVetsByRegion = await getAllVetsByRegion()
    
    

    return (
        regions.length > 0 ? (<div className='w-full h-[calc(100vh-5rem)] '>
            {/* Header with regions*/}
            <VetByRegionPagination/>

        </div>)
            : (<div className='w-full h-[calc(100vh-5rem)] flex items-center justify-center'>
                <p>Nenhum veterinário cadastrado por enquanto ....</p>
            </div>)
    )
}
