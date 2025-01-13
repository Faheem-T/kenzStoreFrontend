import { Button } from "@mui/material";
import { useLogoutMutation } from "../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { loggedOut } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks";

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
    toast.success("Logged out successfully");
    navigate("/home");
  };

  return (
    <Button onClick={clickHandler}>
      {isLoading ? "Logging out..." : "LogOut"}
    </Button>
  );
};
