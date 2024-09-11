import { NextResponse } from "next/server"

const data = [
  {
    imgUrl: "https://img.freepik.com/free-photo/side-view-young-woman-with-her-dog-park_23-2147877752.jpg?t=st=1726068116~exp=1726071716~hmac=0008ac12061b176bed6806255d97bf9c706596d19004400da6061f8764b58dc3&w=1380",
    webSite: "portal g1",
    title: "Proprietários de pets gastam fortunas em alimentos 'humanos' para seus animais",
    description: "A Associação Norte-Americana de Produtos para Animais estima que os americanos gastaram US$58,1 bilhões (cerca de R$289 bilhões) em alimentos e petiscos para pets em 2022."
  },
  {
    imgUrl: "https://img.freepik.com/free-photo/influencer-their-pet-creating-content-online-spaces-social-media_23-2151420205.jpg?t=st=1726068140~exp=1726071740~hmac=fdbbc8df2daf60a401334978d6e18413b81fca84cabc674cb98e37216a7f5c69&w=1380",
    webSite: "portal g1",
    title: "Por que os gatos extinguiram mais espécies do que qualquer outro predador",
    description: "Segundo um estudo, 2.084 espécies diferentes já foram dizimadas por felinos domesticados por humanos."
  },
  {
    imgUrl: "https://img.freepik.com/free-photo/excited-couple-posing-with-fluffy-cat-indoor-portrait-smiling-adorable-woman-holding-her-pet-kitchen_197531-12217.jpg?t=st=1726068265~exp=1726071865~hmac=a3db95a2ff7c18fd1e8838fe6ed6ce42ad694659e9c5c3d11e779c4b450d7143&w=1380",
    webSite: "Revista Pet Saúde",
    title: "Veterinários alertam sobre o aumento de obesidade em cães e gatos",
    description: "Com o aumento da oferta de petiscos industrializados, o sobrepeso entre os pets se tornou uma preocupação para especialistas."
  },
  {
    imgUrl: "https://img.freepik.com/free-photo/front-view-woman-couch-with-her-dog_23-2148567037.jpg?t=st=1726068253~exp=1726071853~hmac=e55ef209078b1913a5373e2ef62d7b30de3074691f9655f80bb4ae3821ac8b6c&w=1380",
    webSite: "Vet News",
    title: "Vacinação antirrábica em cães e gatos cresce em todo o Brasil",
    description: "Campanhas de vacinação contra a raiva em pets têm sido reforçadas para prevenir surtos da doença."
  },
  {
    imgUrl: "https://img.freepik.com/free-photo/dog-lifestyle-care-with-owner_23-2149150748.jpg?t=st=1726068239~exp=1726071839~hmac=75acea967d14736332bc10cf9700bd6f7b95cb582d278298615ce93dae9b1c04&w=1380",
    webSite: "Animal Planet",
    title: "Brinquedos interativos ajudam no desenvolvimento cognitivo dos gatos",
    description: "Especialistas recomendam o uso de brinquedos que estimulem o instinto caçador dos felinos, promovendo bem-estar e saúde."
  },
  {
    imgUrl: "https://img.freepik.com/free-photo/adorable-chihuahua-dog-with-female-owner_23-2149880102.jpg?t=st=1726068221~exp=1726071821~hmac=4821fc2da2002c3f89e0e3bfc5950dbe8607f9d3c1fe67d081ce72e1d9e46695&w=1380",
    webSite: "Portal UOL",
    title: "Terapia com cães ajuda pacientes em hospitais e lares de idosos",
    description: "Cães treinados estão sendo utilizados em terapias para reduzir o estresse e melhorar o humor de pacientes."
  },
  {
    imgUrl: "https://img.freepik.com/free-photo/romantic-couple-good-mood-plays-hugs-white-dog-man-kisses-his-labrador-against-window_197531-13722.jpg?t=st=1726068176~exp=1726071776~hmac=916919b1ab8e59198b71f64adb3537079bc1ea1420fd9c7bb3394a059c0408e6&w=1380",
    webSite: "Diário dos Pets",
    title: "Treinamento de cães: dicas de especialistas para melhorar o comportamento do seu pet",
    description: "Adestradores profissionais compartilham métodos para ensinar obediência e melhorar a socialização dos cães."
  },
  {
    imgUrl: "https://img.freepik.com/free-photo/medium-shot-women-dog-watching-movies_23-2149266770.jpg?t=st=1726068200~exp=1726071800~hmac=20de598dc6441d0d36a1a7d749d7964828fd20cb93a53870e7ecd8dac53b29cb&w=1380",
    webSite: "Portal Terra",
    title: "Popularidade de animais exóticos como pets cresce no Brasil",
    description: "De cobras a iguanas, cada vez mais brasileiros estão optando por adotar pets exóticos em suas casas."
  },
  {
    imgUrl: "https://img.freepik.com/free-photo/happy-young-woman-looking-her-dog-park_23-2147877773.jpg?t=st=1726068154~exp=1726071754~hmac=bb3bf841ba677fdbff4a2573e0b8bad50dcb6a1f984389d56c02a18e92ea1020&w=1380",
    webSite: "Clínica Vet Care",
    title: "A importância das visitas regulares ao veterinário para a saúde do seu pet",
    description: "Veterinários recomendam exames anuais para identificar precocemente doenças em cães e gatos."
  }
];

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