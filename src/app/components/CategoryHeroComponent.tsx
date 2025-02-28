import { Box, Button, Typography } from "@mui/material";
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
  return (
    <Box
      sx={{
        p: 8,
        display: "flex",
        gap: 12,
        justifyContent: "space-between",
        alignItems: "center",
        height: "600px",
        bgcolor: dark ? "primary.main" : "",
        color: dark ? "white" : "",
      }}
    >
      <Box
        sx={{
          order: imageSide === "left" ? 1 : 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1,
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
      </Box>
      <Box
        sx={{
          height: "100%",
          width: "400px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          //   border: 1,
          //   position: "relative",
          //   borderRadius: "50%",
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
      </Box>
    </Box>
  );
};
