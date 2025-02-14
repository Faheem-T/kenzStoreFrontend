import { Box, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";

export const ErrorPage = () => {
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
        <Typography variant="h3">Something went wrong</Typography>
        <Typography variant="h4">Go back home</Typography>
      </Box>
    </>
  );
};
