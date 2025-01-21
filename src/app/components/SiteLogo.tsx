import { Typography } from "@mui/material";

export const SiteLogo = ({ sx }: { sx?: any }) => {
  return (
    <Typography
      variant="h4"
      sx={{
        fontVariantCaps: "petite-caps",
        display: "inline-block",
        ...sx,
      }}
    >
      K
    </Typography>
  );
};
