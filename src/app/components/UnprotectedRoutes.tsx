import { Navigate, Outlet } from "react-router";
import { selectUser } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks";

export const UnprotectedRoutes = () => {
  const user = useAppSelector(selectUser);
  if (user) {
    return <Navigate to="/home" />;
  } else {
    return <Outlet />;
  }
};
