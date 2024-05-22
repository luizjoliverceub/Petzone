import NavBarVeterinarian from "@/components/NavBarVeterinarian"


export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <section className="flex">
             <NavBarVeterinarian/>
            {children}
            </section>
    )
  }