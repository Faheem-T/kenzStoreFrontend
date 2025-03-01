import { Box, Button, Typography, Grid2 as Grid } from "@mui/material";
import { useNavigate } from "react-router";

export const CategoryHeroComponent = ({
  categorySlug,
  categoryName,
  imageURL,
  heroText,
  subText,
  imageSide = "right",
  dark = false,
}: {
  categorySlug: string;
  categoryName?: string;
  imageURL: string;
  heroText: string;
  subText?: string;
  imageSide?: "left" | "right";
  dark?: boolean;
}) => {
  const categoryLink = `/categories/${categorySlug}`;
  if (!categoryName) {
    categoryName =
      categorySlug.at(-1) === "s" ? categorySlug : categorySlug + "s";
  }
  const navigate = useNavigate();
  const gridSize = { xs: 11, sm: 12, md: 6 };
  return (
    <Grid
      container
      spacing={12}
      sx={{
        p: 8,
        // display: "flex",
        // gap: 12,
        justifyContent: "space-between",
        alignItems: "center",
        height: "600px",
        bgcolor: dark ? "primary.main" : "",
        color: dark ? "white" : "",
      }}
    >
      <Grid
        size={gridSize}
        sx={{
          order: imageSide === "left" ? 1 : 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4">{heroText}</Typography>
        {subText && <Typography variant="body1">{subText}</Typography>}
        <Button
          variant="contained"
          //   color={dark ? "text" : "primary"}
          sx={{
            bgcolor: dark ? "white" : "",
            color: dark ? "primary.main" : "",
            "&:hover": dark ? { bgcolor: "#a9a9a9" } : {},
          }}
          onClick={() => navigate(categoryLink)}
        >
          Browse {categoryName}
        </Button>
      </Grid>
      <Grid
        size={gridSize}
        sx={{
          height: { xs: "50%", md: "100%" },
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={imageURL}
          sx={{
            // display: "inline",
            // margin: "0 auto",
            objectFit: "cover",

            height: "100%",
            width: "auto",
            // overflow: "hidden",
          }}
        />
      </Grid>
    </Grid>
  );
};
