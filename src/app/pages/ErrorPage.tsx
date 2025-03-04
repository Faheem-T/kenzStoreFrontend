import { Box, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3">404 Page Not Found</Typography>
        <Typography variant="h4">
          <Link to="/">Go back home</Link>
        </Typography>
      </Box>
    </>
  );
};
export default ErrorPage;
