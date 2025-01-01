import { Navigate, Outlet } from "react-router";
import { selectUser } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks";

export const ProtectedRoutes = () => {
  const user = useAppSelector(selectUser);
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};
