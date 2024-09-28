import { getAllService } from "@/utils/actions/GetAllVetServices";


export default async function HomeMessage() {

    const allServices = await getAllService()

    console.log("allServices " + JSON.stringify(allServices));

    

    return (
        <main className="ml-64">
            Mensagens
        </main>
    )
}