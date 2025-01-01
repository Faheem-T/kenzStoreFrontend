import { useEffect } from "react";
import { useAppSelector } from "../../hooks";
import { selectUser } from "../auth/authSlice";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";

export const Homepage = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  // redirecting if user does not exist
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <Box>Hello there</Box>
    </>
  );
};