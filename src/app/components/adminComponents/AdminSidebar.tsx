import { selectUser } from "@/app/features/auth/authSlice";
import { useAppSelector } from "@/app/hooks";
import { SafeAdminType } from "@/app/types/admin";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Category, Dashboard, Inventory } from "@mui/icons-material";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BadgePercent, Box, ChevronUp, DollarSign, Users } from "lucide-react";
import { Link, useLocation } from "react-router";
import { LogoutButton } from "../logoutButton";

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
    icon: Inventory,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Category,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: Box,
  },
  {
    title: "Offers",
    url: "/admin/offers",
    icon: DollarSign,
    items: [
      {
        title: "Product Offers",
        url: "/admin/offers/products",
      },
      {
        title: "Category Offers",
        url: "/admin/offers/categories",
      },
    ],
  },
  {
    title: "Coupons",
    url: "/admin/coupons",
    icon: BadgePercent,
  },
];

export const AdminSidebar = () => {
  const admin = useAppSelector(selectUser) as SafeAdminType;
  const location = useLocation();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.url === location.pathname}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItem.url === location.pathname}
                          >
                            <Link to={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <span>@{admin.username}</span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
