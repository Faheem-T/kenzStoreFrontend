import { Link } from "@mui/material";
import { useLogoutMutation } from "../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { loggedOut } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks";
import { api } from "../api";

export const LogoutButton = () => {
  const [createLogoutMutation, { isLoading, isError }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const clickHandler = async () => {
    await createLogoutMutation();

    if (isError) {
      toast.error("Failed to log out");
      return;
    }
    dispatch(loggedOut());
    dispatch(api.util.resetApiState());
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <Link
      onClick={clickHandler}
      sx={{ width: 1, height: 1, cursor: "pointer" }}
      color="#ffff"
    >
      {isLoading ? "Logging out..." : "Log Out"}
    </Link>
  );
};
