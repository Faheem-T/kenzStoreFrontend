import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";

interface ImageViewComponentProps {
  images: string[];
}

export const ImageViewComponent = ({ images }: ImageViewComponentProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [zoomInfo, setZoomInfo] = useState({
    visible: false,
    src: "",
    x: 0,
    y: 0,
  });

  const handleMouseHover = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const imgRect: DOMRect = (e.target as any).getBoundingClientRect();
    const [x, y] = [e.clientX - imgRect.left, e.clientY - imgRect.top];
    setZoomInfo((prev) => ({ ...prev, x, y }));
  };

  const productImages = images.map((link, i) => (
    <Box
      component="img"
      src={link}
      key={i}
      width="80%"
      onMouseMove={(e) => {
        handleMouseHover(e);
      }}
      onMouseEnter={() =>
        setZoomInfo((prev) => ({ ...prev, visible: true, src: link }))
      }
      onMouseLeave={() => setZoomInfo((prev) => ({ ...prev, visible: false }))}
    />
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
        <Box
          sx={{
            width: "300px",
            position: "absolute",
            display: zoomInfo.visible ? "" : "none",
            right: { xs: "25%", md: "-100%" },
            bottom: { xs: "-50%", md: "0" },
            border: 1,
            height: "300px",
            backgroundImage: `url(${zoomInfo.src})`,
            backgroundPosition: `-${zoomInfo.x}px -${zoomInfo.y}px`,
          }}
        />
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
