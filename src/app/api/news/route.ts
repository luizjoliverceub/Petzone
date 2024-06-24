import { NextResponse,NextRequest } from "next/server"
import { auth } from "../auth/[...nextauth]/route"

const data = [
  {
    imgUrl: "/kissingdog.png",
    webSite: "portal g1",
    title: "Donos de animais que gastam dinheiro com comida 'de gente' para seus pets",
    description: "A Associação Norte-Americana de Produtos para Animais estima que os americanos gastaram US$ 58,1 bilhões (cerca de R$ 289 bilhões) em alimentos e petiscos para animais de estimação em 2022."
  },
  {
    imgUrl: "/catwalking.png",
    webSite: "portal g1",
    title: "Por que os gatos levaram à extinção mais espécies do que qualquer outro predador",
    description: "De acordo com um estudo, 2.084 diferentes espécies já foram devoradas por felinos domesticados por humanos."
  },
  {
    imgUrl: "/dogsitting.png",
    webSite: "portal g1",
    title: "Quase metade dos imóveis para aluguel no Rio têm pets, diz pesquisa",
    description: "Uma pesquisa do QuintoAndar mostra que esse percentual cresceu durante a pandemia."
  }
]


export async function GET(request:Request) {

  const session = request.headers.get("session")
  const newSessionValue = JSON.parse(session) 

  
  if(session && newSessionValue){
try {
	
  return new NextResponse(JSON.stringify(data),{status:200})

} catch (error) {
	return NextResponse.json({error:error},{status:500})
}
}else{
  return new NextResponse(JSON.stringify({message:"you are not authenticated"}),
  {status:401})
}
 

  }