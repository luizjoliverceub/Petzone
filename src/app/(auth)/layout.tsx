import NavBarClient from "@/components/NavBarClient"


export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <section className="flex">
             <NavBarClient/>
            {children}
            </section>
    )
  }