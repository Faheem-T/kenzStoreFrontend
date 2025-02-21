import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      bgcolor="primary.main"
      sx={{
        mt: 16,
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography color="white" variant="caption">
        © 2025 Kenz Store
      </Typography>
    </Box>
  );
};
