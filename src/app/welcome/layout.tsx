import { NavbarHeader } from "./components/NavbarHeader"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <body className="h-screen flex flex-col antialiased">
            <NavbarHeader />
            {children}
        </body>
    )
  }