import { SxProps, Typography } from "@mui/material";

export const SiteLogo = ({ sx }: { sx?: SxProps }) => {
  return (
    <Typography
      variant="h4"
      sx={{
        fontWeight: 500,
        fontVariantCaps: "petite-caps",
        display: "inline-block",
        transition: "all 1s",
        fontFamily: "Oregano",
        ...sx,
      }}
    >
      K
    </Typography>
  );
};
