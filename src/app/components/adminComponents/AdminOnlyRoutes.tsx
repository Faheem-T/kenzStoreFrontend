import { Navigate, Outlet } from "react-router";
import { selectIsAdmin } from "../../features/auth/authSlice";
import { useAppSelector } from "../../hooks";
import toast from "react-hot-toast";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";

export const AdminOnlyRoutes = () => {
  const isAdmin = useAppSelector(selectIsAdmin);
  if (!isAdmin) {
    toast("Admins only!");
    return <Navigate to="/home" />;
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarTrigger />
      <Outlet />
    </SidebarProvider>
  );
};
