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
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ChevronUp,
  Heart,
  MapPin,
  Package,
  ShoppingCart,
  User,
  Wallet,
} from "lucide-react";
import { Link as RouterLink, useLocation } from "react-router";
import { LogoutButton } from "./logoutButton";
import { SafeUserType } from "../types/user";
import { SiteLogo } from "./SiteLogo";
import { Box, Link } from "@mui/material";

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
  {
    title: "Wishlist",
    url: "/user/wishlist",
    icon: Heart,
  },
  {
    title: "Wallet",
    url: "/user/wallet",
    icon: Wallet,
  },
];

export const UserSidebar = () => {
  const user = useAppSelector(selectUser) as SafeUserType;
  const location = useLocation();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SiteLogo sx={{ color: "white" }} />
          </Link>
        </Box>
      </SidebarHeader>
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
                    <RouterLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </RouterLink>
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
