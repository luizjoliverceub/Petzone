import NavBar from "@/components/NavBar"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <section className="flex">
             <NavBar/>
            {children}
            </section>
    )
  }