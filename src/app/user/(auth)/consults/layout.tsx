import { ConsultNavbar } from "./components/ConsultNavbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="h-screen w-full flex ml-64">
            <ConsultNavbar />
            {children}
        </main>
    )
}