import { selectUser } from "@/app/features/auth/authSlice";
import { useAppSelector } from "@/app/hooks";
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
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronUp, MapPin, Package, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router";
import { LogoutButton } from "./logoutButton";
import { SafeUserType } from "../types/user";

// Menu items
const items = [
  {
    title: "Profile",
    url: "/user/profile",
    icon: User,
  },
  {
    title: "Addresses",
    url: "/user/addresses",
    icon: MapPin,
  },
  {
    title: "Cart",
    url: "/user/cart",
    icon: ShoppingCart,
  },
  {
    title: "Orders",
    url: "/user/orders",
    icon: Package,
  },
];

export const UserSidebar = () => {
  const user = useAppSelector(selectUser) as SafeUserType;
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
                  <span>@{user.firstName}</span>
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
