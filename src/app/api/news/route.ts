import { NextResponse } from "next/server"

const data = [
  {
    "uuid": "dcb7a1e3-f2f8-45d0-b4e7-8e8e918b3f6f",
    "imgUrl": "https://img.freepik.com/free-photo/side-view-young-woman-with-her-dog-park_23-2147877752.jpg?t=st=1726068116~exp=1726071716~hmac=0008ac12061b176bed6806255d97bf9c706596d19004400da6061f8764b58dc3&w=1380",
    "webSite": "portal g1",
    "title": "Proprietários de pets gastam fortunas em alimentos 'humanos' para seus animais",
    "description": "A Associação Norte-Americana de Produtos para Animais estima que os americanos gastaram US$58,1 bilhões (cerca de R$289 bilhões) em alimentos e petiscos para pets em 2022.",
    "content": "A Associação Norte-Americana de Produtos para Animais revelou que, em 2022, os americanos gastaram impressionantes US$58,1 bilhões (aproximadamente R$289 bilhões) em alimentos e petiscos para seus animais de estimação. Esse aumento no gasto reflete uma tendência crescente entre os donos de pets que estão dispostos a investir significativamente para oferecer uma dieta mais variada e nutritiva para seus animais. Alimentos que imitam a dieta humana, como carnes premium, snacks especiais e refeições gourmet, têm se tornado cada vez mais populares. Especialistas apontam que esse fenômeno é impulsionado por uma maior conscientização sobre a saúde e o bem-estar dos pets, com muitos donos buscando opções que prometem melhorar a qualidade de vida e prolongar a longevidade de seus animais de estimação. Além disso, a indústria de alimentos para pets continua a se expandir, com uma oferta diversificada que atende a diferentes necessidades nutricionais e preferências dos animais."
  },
  {
    "uuid": "1d3c7601-9c3e-4b20-8c75-4f42c0c1a05a",
    "imgUrl": "https://img.freepik.com/free-photo/influencer-their-pet-creating-content-online-spaces-social-media_23-2151420205.jpg?t=st=1726068140~exp=1726071740~hmac=fdbbc8df2daf60a401334978d6e18413b81fca84cabc674cb98e37216a7f5c69&w=1380",
    "webSite": "portal g1",
    "title": "Por que os gatos extinguiram mais espécies do que qualquer outro predador",
    "description": "Segundo um estudo, 2.084 espécies diferentes já foram dizimadas por felinos domesticados por humanos.",
    "content": "Um estudo recente revela que os gatos, felinos domesticados, são responsáveis pela extinção de pelo menos 2.084 espécies diferentes ao longo dos últimos séculos. Esse impacto devastador é atribuído ao instinto de caça dos gatos, que se reflete na captura e eliminação de inúmeras espécies de aves, mamíferos e insetos. A pesquisa destaca que, embora os gatos sejam animais de estimação populares e adorados por muitos, sua presença tem efeitos significativos sobre a biodiversidade. O estudo também sugere que a introdução de felinos em novos ambientes pode desestabilizar ecossistemas locais, contribuindo para o declínio de espécies nativas. As conclusões reforçam a necessidade de medidas de controle e conscientização sobre a responsabilidade de manter gatos domesticados e a importância de adotar práticas que minimizem seu impacto ambiental."
  },
  {
    "uuid": "e3f64f91-9db4-4b56-ae5e-58b9a8d5f9c6",
    "imgUrl": "https://img.freepik.com/free-photo/excited-couple-posing-with-fluffy-cat-indoor-portrait-smiling-adorable-woman-holding-her-pet-kitchen_197531-12217.jpg?t=st=1726068265~exp=1726071865~hmac=a3db95a2ff7c18fd1e8838fe6ed6ce42ad694659e9c5c3d11e779c4b450d7143&w=1380",
    "webSite": "Revista Pet Saúde",
    "title": "Veterinários alertam sobre o aumento de obesidade em cães e gatos",
    "description": "Com o aumento da oferta de petiscos industrializados, o sobrepeso entre os pets se tornou uma preocupação para especialistas.",
    "content": "Especialistas veterinários estão cada vez mais preocupados com o aumento significativo da obesidade entre cães e gatos, uma condição que tem se agravado com o aumento da oferta de petiscos industrializados e alimentos de alto teor calórico. Estudos mostram que a obesidade é uma das principais causas de problemas de saúde em animais de estimação, contribuindo para doenças como diabetes, problemas articulares e doenças cardíacas. A disponibilidade crescente de petiscos e alimentos gourmet para animais tem levado muitos donos a oferecerem porções excessivas, muitas vezes sem considerar a dieta balanceada necessária para a saúde dos pets. Veterinários recomendam a adoção de práticas de alimentação mais rigorosas e a escolha de petiscos e alimentos de alta qualidade que promovam um equilíbrio nutricional adequado. Além disso, a realização de exercícios regulares e visitas veterinárias periódicas são essenciais para a manutenção da saúde ideal dos animais de estimação."
  },
  {
    "uuid": "a8d01fc5-c4c4-4a2b-9c2d-07e5b32a53d4",
    "imgUrl": "https://img.freepik.com/free-photo/front-view-woman-couch-with-her-dog_23-2148567037.jpg?t=st=1726068253~exp=1726071853~hmac=e55ef209078b1913a5373e2ef62d7b30de3074691f9655f80bb4ae3821ac8b6c&w=1380",
    "webSite": "Vet News",
    "title": "Vacinação antirrábica em cães e gatos cresce em todo o Brasil",
    "description": "Campanhas de vacinação contra a raiva em pets têm sido reforçadas para prevenir surtos da doença.",
    "content": "O Brasil tem observado um aumento significativo nas campanhas de vacinação antirrábica para cães e gatos, com o objetivo de prevenir surtos de raiva, uma doença viral altamente contagiosa e potencialmente fatal. A raiva é transmitida principalmente através da mordida de um animal infectado e pode afetar qualquer mamífero, incluindo humanos. As campanhas de vacinação têm se intensificado para garantir que um maior número de animais de estimação receba a proteção necessária. Além das campanhas de vacinação, autoridades de saúde pública também estão promovendo a educação sobre a importância da vacinação e o controle de populações de animais selvagens e errantes que podem atuar como reservatórios do vírus. A vacinação regular é fundamental para a prevenção da raiva e para garantir a segurança de animais de estimação e da população em geral."
  },
  {
    "uuid": "d7b5e6f3-1d6b-45b1-a4e8-5b9b3d208e3d",
    "imgUrl": "https://img.freepik.com/free-photo/dog-lifestyle-care-with-owner_23-2149150748.jpg?t=st=1726068239~exp=1726071839~hmac=75acea967d14736332bc10cf9700bd6f7b95cb582d278298615ce93dae9b1c04&w=1380",
    "webSite": "Animal Planet",
    "title": "Brinquedos interativos ajudam no desenvolvimento cognitivo dos gatos",
    "description": "Especialistas recomendam o uso de brinquedos que estimulem o instinto caçador dos felinos, promovendo bem-estar e saúde.",
    "content": "O uso de brinquedos interativos tem se mostrado uma estratégia eficaz para promover o desenvolvimento cognitivo e o bem-estar dos gatos. Esses brinquedos são projetados para estimular o instinto natural de caça dos felinos, oferecendo desafios que incentivam a resolução de problemas e o exercício mental. Brinquedos que simulem presas ou ofereçam estímulos visuais e auditivos são especialmente benéficos, pois ajudam a manter os gatos mentalmente ativos e engajados. Especialistas recomendam que os donos de gatos integrem esses brinquedos em suas rotinas diárias para evitar o tédio e o estresse, que podem levar a comportamentos indesejados e problemas de saúde. Além disso, a interação com brinquedos estimulantes pode ajudar a prevenir a obesidade e promover um estilo de vida mais saudável para os felinos."
  },
  {
    "uuid": "b10e6b29-1bde-4f56-9a5d-9f45a705c69d",
    "imgUrl": "https://img.freepik.com/free-photo/adorable-chihuahua-dog-with-female-owner_23-2149880102.jpg?t=st=1726068221~exp=1726071821~hmac=4821fc2da2002c3f89e0e3bfc5950dbe8607f9d3c1fe67d081ce72e1d9e46695&w=1380",
    "webSite": "Portal UOL",
    "title": "Terapia com cães ajuda pacientes em hospitais e lares de idosos",
    "description": "Cães treinados estão sendo utilizados em terapias para reduzir o estresse e melhorar o humor de pacientes.",
    "content": "A utilização de cães treinados em terapias tem se mostrado uma abordagem eficaz para reduzir o estresse e melhorar o humor de pacientes em hospitais e lares de idosos. Estes cães, muitas vezes treinados especificamente para interações terapêuticas, proporcionam conforto e companhia para os pacientes, ajudando a aliviar sentimentos de solidão e ansiedade. Estudos demonstram que a presença de animais de estimação pode ter um impacto positivo na saúde mental e física dos pacientes, promovendo um ambiente mais relaxante e acolhedor. A terapia com cães tem se expandido em várias instituições de saúde, com evidências mostrando que esses animais desempenham um papel crucial na recuperação emocional e no bem-estar geral dos pacientes."
  },
  {
    "uuid": "c9e5d0ab-68e8-4f0e-8212-bd6386a4cfcb",
    "imgUrl": "https://img.freepik.com/free-photo/romantic-couple-good-mood-plays-hugs-white-dog-man-kisses-his-labrador-against-window_197531-13722.jpg?t=st=1726068176~exp=1726071776~hmac=916919b1ab8e59198b71f64adb3537079bc1ea1420fd9c7bb3394a059c0408e6&w=1380",
    "webSite": "Diário dos Pets",
    "title": "Treinamento de cães: dicas de especialistas para melhorar o comportamento do seu pet",
    "description": "Adestradores profissionais compartilham métodos para ensinar obediência e melhorar a socialização dos cães.",
    "content": "Especialistas em adestramento de cães compartilham diversas dicas e métodos para melhorar o comportamento dos pets e promover uma melhor socialização. O treinamento é essencial para ensinar obediência e resolver comportamentos indesejados, além de ajudar os cães a se adaptarem a diferentes situações e ambientes. Técnicas como o reforço positivo, que recompensa comportamentos desejados, e a socialização gradual com outros cães e pessoas são amplamente recomendadas. Adestradores sugerem que os donos estabeleçam regras claras e consistentes, utilizem comandos simples e ofereçam recompensas para encorajar a obediência. A prática regular e o treinamento contínuo são fundamentais para garantir que o cão se comporte de maneira adequada e desenvolva um relacionamento harmonioso com seus donos e com o ambiente ao seu redor."
  },
  {
    "uuid": "7d749e8f-f0a7-4a24-b747-86c5d0e4ef4e",
    "imgUrl": "https://img.freepik.com/free-photo/medium-shot-women-dog-watching-movies_23-2149266770.jpg?t=st=1726068200~exp=1726071800~hmac=20de598dc6441d0d36a1a7d749d7964828fd20cb93a53870e7ecd8dac53b29cb&w=1380",
    "webSite": "Portal Terra",
    "title": "Popularidade de animais exóticos como pets cresce no Brasil",
    "description": "De cobras a iguanas, cada vez mais brasileiros estão optando por adotar pets exóticos em suas casas.",
    "content": "A popularidade dos animais exóticos como pets está crescendo no Brasil, com muitos brasileiros optando por adotar animais não convencionais, como cobras, iguanas e outros répteis. Essa tendência reflete uma mudança no perfil dos donos de animais de estimação, que buscam experiências novas e diferentes além dos tradicionais cães e gatos. A adoção de pets exóticos exige cuidados específicos, incluindo a criação de ambientes adequados e a compreensão das necessidades nutricionais e de saúde de cada espécie. Especialistas alertam para a importância de se informar sobre as necessidades e regulamentações relacionadas à posse de animais exóticos, a fim de garantir que esses pets recebam o cuidado adequado e que suas necessidades sejam atendidas de forma apropriada. Além disso, é fundamental considerar o impacto potencial desses animais no ambiente e a necessidade de promover a conservação das espécies."
  },
  {
    "uuid": "b1d3e5f1-65f6-45da-8d48-dae4a5b5a987",
    "imgUrl": "https://img.freepik.com/free-photo/happy-young-woman-looking-her-dog-park_23-2147877773.jpg?t=st=1726068154~exp=1726071754~hmac=bb3bf841ba677fdbff4a2573e0b8bad50dcb6a1f984389d56c02a18e92ea1020&w=1380",
    "webSite": "Clínica Vet Care",
    "title": "A importância das visitas regulares ao veterinário para a saúde do seu pet",
    "description": "Veterinários recomendam exames anuais para identificar precocemente doenças em cães e gatos.",
    "content": "Visitas regulares ao veterinário são fundamentais para garantir a saúde e o bem-estar dos animais de estimação. Veterinários recomendam que cães e gatos façam exames anuais para identificar precocemente doenças e condições de saúde, permitindo um tratamento mais eficaz e prevenindo complicações graves. Durante essas consultas, são realizados exames físicos, avaliações de saúde gerais e, se necessário, testes laboratoriais para monitorar a saúde dos animais. Além disso, essas visitas são uma oportunidade para atualizar vacinas, discutir nutrição e cuidados preventivos, e receber orientações sobre o manejo de doenças crônicas. A detecção precoce de problemas de saúde pode aumentar significativamente a qualidade de vida dos pets e prolongar sua longevidade. Portanto, manter um cronograma regular de visitas ao veterinário é essencial para assegurar que os animais de estimação recebam o melhor cuidado possível."
  }
];

export async function GET(request: Request) {

  const session = request.headers.get("session")
  const newSessionValue = JSON.parse(session)


  if (session && newSessionValue) {
    try {

      return new NextResponse(JSON.stringify(data), { status: 200 })

    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 })
    }
  } else {
    return new NextResponse(JSON.stringify({ message: "you are not authenticated" }),
      { status: 401 })
  }


}