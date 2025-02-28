import { Box, SxProps, Typography } from "@mui/material";

export const Footer = ({ sx }: { sx?: SxProps }) => {
  return (
    <Box
      bgcolor="primary.main"
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      <Typography color="white" variant="caption">
        © 2025 Kenz Store
      </Typography>
    </Box>
  );
};
