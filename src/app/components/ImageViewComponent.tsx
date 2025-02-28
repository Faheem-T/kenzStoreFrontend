import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";

interface ImageViewComponentProps {
  images: string[];
}

export const ImageViewComponent = ({ images }: ImageViewComponentProps) => {
  const [imageIndex, setImageIndex] = useState(0);

  const productImages = images.map((link, i) => (
    <img src={link} key={i} width="80%" />
  ));

  const handleNextClick = () => {
    if (imageIndex < images.length - 1) {
      setImageIndex((current) => current + 1);
    }
  };
  const handlePrevClick = () => {
    if (imageIndex > 0) {
      setImageIndex((current) => current - 1);
    }
  };

  const prevDisabled = imageIndex === 0;
  const nextDisabled = imageIndex === images.length - 1;

  const imagePreview = productImages.map((img, i) => (
    <Box
      key={i}
      onClick={() => setImageIndex(i)}
      sx={(theme) => ({
        border: imageIndex === i ? 1 : "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 1,
        "&:hover": { background: theme.palette.background.paper },
      })}
    >
      {img}
    </Box>
  ));
  return (
    <>
      <Box
        sx={{
          // width: 1 / 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {productImages[imageIndex]}
        <Box sx={{ width: "20%", display: "flex" }}>{imagePreview}</Box>
        {/* Previous and next buttons */}
        <IconButton
          onClick={handlePrevClick}
          sx={{ position: "absolute", left: 0, top: "1/2" }}
          disabled={prevDisabled}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          onClick={handleNextClick}
          sx={{ position: "absolute", right: 0, top: "1/2" }}
          disabled={nextDisabled}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </>
  );
};
