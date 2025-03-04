import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { UserSidebar } from "../components/UserSidebar";

const UserProfileRoot = () => {
  return (
    <>
      <SidebarProvider>
        <UserSidebar />
        <SidebarTrigger />
        <Outlet />
      </SidebarProvider>
    </>
  );
};
export default UserProfileRoot;
