import { Navigate, Outlet } from "react-router";
import { selectUser } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks";
import toast from "react-hot-toast";

const ProtectedRoutes = () => {
  const user = useAppSelector(selectUser);
  if (!user) {
    toast("Please log in");
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};
export default ProtectedRoutes;
