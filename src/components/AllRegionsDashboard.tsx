import React from 'react'

type Regions = {
    region: string
}

export default function AllRegionsDashboard({ regions }: { regions: Regions[] }) {
    return (
        regions.length > 0 ? (<div className='w-full h-[calc(100vh-5rem)] '>
            {/* Header with regions*/}
            <ul className='w-full h-20 flex items-center gap-5 flex-wrap justify-center border-b border-black'>

                {regions.map((region) => (
                    <li key={region.region} className='p-1 bg-brand-primary text-white ring-1 ring-white cursor-pointer hover:text-wh odd:text-slate-300'>{region.region}</li>
                ))}

            </ul>

            {/* vet info / vet container*/}
            <div className='w-full h-[calc(100vh-10rem)] flex flex-wrap items-center justify-center'>
                <article className="w-[80%] max-w bg-slate-100 shadow-lg rounded-lg overflow-hidden my-4 hover:bg-slate-200" >
                    <div className="p-6 relative">
                        <h2 className="text-2xl font-bold mb-2">VetName1</h2>
                        <ul className="text-gray-700 mb-4">
                            <div className='flex gap-8'>
                                <li><strong>Idade:</strong>  39 anos</li>
                                <li><strong>Nome Clinica :</strong> clinica1</li>
                                <li><strong>Cidade:</strong>Vicente pires </li>
                            </div>
                            <div className='flex gap-8'>
                                <li><strong>cep:</strong>99999-9999 </li>
                                <li><strong>crmv:</strong>CRMV-DF 55555 </li>
                            </div>
                        </ul>
                        <button
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 absolute top-0 right-0 mr-4 mt-4"

                        >
                            X
                        </button>
                    </div>
                </article>

                <article className="w-[80%] max-w bg-slate-100 shadow-lg rounded-lg overflow-hidden my-4 hover:bg-slate-200" >
            <div className="p-6 relative">
            <h2 className="text-2xl font-bold mb-2">VetName1</h2>
            <ul className="text-gray-700 mb-4">
              <div className='flex gap-8'>
                <li><strong>Idade:</strong>  29 anos</li>
                <li><strong>Nome Clinica :</strong> clinica2</li>
                <li><strong>Cidade:</strong>Vicente pires </li>
              </div>
              <div className='flex gap-8'>
                <li><strong>cep:</strong>99999-9999 </li>
                <li><strong>crmv:</strong>CRMV-DF 66666 </li>
              </div>
            </ul>
            <button 
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 absolute top-0 right-0 mr-4 mt-4" 
              
            >
              X
            </button>
          </div>
            </article>

            </div>
        </div>)
            : (<div className='w-full h-[calc(100vh-5rem)] flex items-center justify-center'>
                <p>Nenhum veterinário cadastrado por enquanto ....</p>
            </div>)
    )
}
