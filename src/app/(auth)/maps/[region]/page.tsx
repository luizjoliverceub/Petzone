
import AuthHeader from '@/components/Auth/AuthHeader';
import { getAllVetsByRegion } from '@/utils/actions/GetAllVetsByRegion'
import React from 'react'
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { createConversation } from '@/utils/actions/CreateConversation';
import StartConversationBtn from '@/components/StartConversationBtn';
import { redirect } from 'next/navigation';

export default async function vetPage({params} :{params:{region:string}}) {
  const VetsFrom = params.region
  const allVetsByRegion = await getAllVetsByRegion(VetsFrom)


 const session = await auth()
 const userId = session?.user?.id
 console.log(allVetsByRegion);
 
  async function startConversation(vetId:string){
    "use server"
    console.log("vet id start convers > "+ vetId);
    
    const userId = session?.user?.id as string // Obtenha o ID do usuário atual (autenticado)
    const conversation = await createConversation({userId,vetId})
    const conversationData = await conversation.json();
    redirect(`/message/${conversationData.id}`)
  }
  
  const region = params.region

  return (
    <main className="h-screen w-full ">
    <AuthHeader titleText="Vets" linkText="Voltar" link="/maps"/>
     {/* vet info / vet container*/}
     <div className='w-full h-[calc(100vh-10rem)] flex flex-wrap items-center justify-center'>
                

             {allVetsByRegion.length > 0 ? (
              allVetsByRegion.map((vet) =>(
                <article className="w-[80%] max-w bg-slate-100 shadow-lg rounded-lg overflow-hidden my-4 hover:bg-slate-200" key={vet.id}>
                    <div className="p-6 relative">
                        <h2 className="text-2xl font-bold mb-2">{vet.user.name}</h2>
                        <ul className="text-gray-700 mb-4">
                            <div className='flex gap-8'>
                                <li><strong>Nome vet</strong> {vet.user.name}</li>
                                <li><strong>crmv:</strong>{vet.crmv} </li>
                            </div>
                            <div className='flex gap-8'>
                                <li><strong>região:</strong>{vet.region} </li>
                                <li><strong>cep:</strong>{vet.cep} </li>
                            </div>
                        </ul>
                        <StartConversationBtn startConversation={startConversation} vetId={vet.userId}/>
                    </div>
                </article>
              ))
             )
             
             : (
              <div>
                <p>teste</p>
                </div>
             )}

            </div>
  </main>
  )
}
