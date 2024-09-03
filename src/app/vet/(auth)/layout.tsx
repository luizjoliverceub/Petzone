import { NavBarApp } from "./components/NavbarApp";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="h-screen flex">
            <NavBarApp />
            {children}
        </main>
    )
}