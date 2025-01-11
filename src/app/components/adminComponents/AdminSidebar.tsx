import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { Dashboard, Inventory } from "@mui/icons-material"
import { Link } from "react-router"

// Menu items
const items = [
    {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: Dashboard,
    },
    {
        title: "Products",
        url: "/admin/products",
        icon: Inventory
    }
]

export const AdminSidebar = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent >
                <SidebarGroup>
                    <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
