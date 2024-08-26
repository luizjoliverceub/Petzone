import { NavbarHeader } from "./components/NavbarHeader"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <main className="h-screen flex flex-col antialiased">
            <NavbarHeader />
            {children}
        </main>
    )
  }