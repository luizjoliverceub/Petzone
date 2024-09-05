import { ConsultDashboard } from "./components/ConsultDashboard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="h-screen w-full flex ml-64">
            <ConsultDashboard />
            {children}
        </main>
    )
}