import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export const BrowseHeroComponent = () => {
  const navigate = useNavigate();
  const backgroundImage =
    "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7)),url(https://res.cloudinary.com/dlicxnblg/image/upload/v1740758414/pexels-bohed-117729_ksicnu.webp)";
  return (
    <Box
      sx={{
        height: "300px",
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 20,
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 2,
      }}
    >
      <Typography variant="h4">Browse our products</Typography>
      <Button variant="contained" onClick={() => navigate("/search")}>
        browse
      </Button>
    </Box>
  );
};
