import { MessageNavBar } from "./components/MessageNavBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="h-screen w-full flex ml-64 relative overflow-x-hidden">
            <MessageNavBar />
            {children}
        </main>
    )
}