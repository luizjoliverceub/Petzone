import { getAppointmentsVet } from "@/utils/actions/GetAppointmentsVet"

export default async function Home() {

    const consults = await getAppointmentsVet()
    
    return (
        <main className="ml-64">
            {JSON.stringify(consults,null,2)}
        </main>
    )
}