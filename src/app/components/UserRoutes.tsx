import { Navigate, Outlet } from "react-router";
import { selectIsAdmin } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks";

export const UserRoutes = () => {
  const isAdmin = useAppSelector(selectIsAdmin);
  if (isAdmin) return <Navigate to="admin/login" />;
  else return <Outlet />;
};
