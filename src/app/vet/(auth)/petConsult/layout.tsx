export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className="h-screen w-full flex flex-col ml-64">
            {children}
        </main>
    )
}