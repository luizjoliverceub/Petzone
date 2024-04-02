import { NextResponse,NextRequest } from "next/server"
import { auth } from "../auth/[...nextauth]/route"

const data = [
  {
    imgUrl:"/kissingdog.png",
    webSite:"portal g1",
    title:"Pet owners who spend money on 'people' food for their pets",
    description:"The North American Pet Products Association estimates that Americans spent US$58.1 billion (about R$289 billion) on pet food and treats in 2022."

  },
  {
    imgUrl:"/catwalking.png",
    webSite:"portal g1",
    title:"Why Cats Have Gone Extinct More Species Than Any Other Predator",
    description:"According to a study, 2,084 different species have already been devoured by felines domesticated by humans."

  },
  {
    imgUrl:"/dogsitting.png",
    webSite:"portal g1",
    title:"Almost half of Rio's rental properties have pets, says survey",
    description:"A survey by QuintoAndar shows that this percentage grew during the pandemic."
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