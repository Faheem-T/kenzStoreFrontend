import { Navigate, Outlet } from "react-router";
import { selectUser } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks";

const UnprotectedRoutes = () => {
  const user = useAppSelector(selectUser);
  if (user) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};
export default UnprotectedRoutes;
