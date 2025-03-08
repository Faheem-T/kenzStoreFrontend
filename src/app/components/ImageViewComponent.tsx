import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight, ZoomIn } from "@mui/icons-material";

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
    magnification: 2.5, // Configurable zoom level
  });

  const imgRef = useRef<HTMLImageElement>(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [zoomMode, setZoomMode] = useState<"hover" | "click">("hover");

  // Update image dimensions when image loads or changes
  useEffect(() => {
    setIsImageLoaded(false);
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
      setIsImageLoaded(true);
    };
    img.src = images[imageIndex];
  }, [imageIndex, images]);

  const handleMouseHover = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    if (!imgRef.current) return;

    const imgRect = imgRef.current.getBoundingClientRect();

    // Calculate relative position (0 to 1)
    const relativeX = (e.clientX - imgRect.left) / imgRect.width;
    const relativeY = (e.clientY - imgRect.top) / imgRect.height;

    // Calculate zoom position with boundaries
    const zoomX = Math.max(0, Math.min(1, relativeX));
    const zoomY = Math.max(0, Math.min(1, relativeY));

    setZoomInfo((prev) => ({ ...prev, x: zoomX, y: zoomY }));
  };

  const toggleZoom = () => {
    setZoomInfo((prev) => ({
      ...prev,
      visible: !prev.visible,
      src: images[imageIndex],
    }));
  };

  const handleNextClick = () => {
    if (imageIndex < images.length - 1) {
      setImageIndex((current) => current + 1);
      setZoomInfo((prev) => ({ ...prev, visible: false }));
    }
  };

  const handlePrevClick = () => {
    if (imageIndex > 0) {
      setImageIndex((current) => current - 1);
      setZoomInfo((prev) => ({ ...prev, visible: false }));
    }
  };

  const calculateZoomBackground = () => {
    // Calculate position as percentage to handle different image sizes
    const posX = zoomInfo.x * 100;
    const posY = zoomInfo.y * 100;

    // Apply the magnification factor to background size
    return {
      backgroundImage: `url(${zoomInfo.src})`,
      backgroundPosition: `${posX}% ${posY}%`,
      backgroundSize: `${zoomInfo.magnification * 100}%`,
      backgroundRepeat: "no-repeat",
      transition: "background-position 0.1s ease-out",
    };
  };

  const prevDisabled = imageIndex === 0;
  const nextDisabled = imageIndex === images.length - 1;

  const handleImageLoad = (_e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsImageLoaded(true);
  };

  const handleZoomModeToggle = () => {
    setZoomMode((prev) => (prev === "hover" ? "click" : "hover"));
    setZoomInfo((prev) => ({ ...prev, visible: false }));
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      {/* Main image view */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio:
              imageDimensions.width / imageDimensions.height || "1/1",
            overflow: "hidden",
            cursor:
              zoomMode === "hover"
                ? "zoom-in"
                : zoomInfo.visible
                ? "zoom-out"
                : "zoom-in",
          }}
        >
          <Box
            component="img"
            ref={imgRef}
            src={images[imageIndex]}
            alt={`Product image ${imageIndex + 1}`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: isImageLoaded ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
            onLoad={handleImageLoad}
            onMouseMove={zoomMode === "hover" ? handleMouseHover : undefined}
            onMouseEnter={
              zoomMode === "hover"
                ? () =>
                    setZoomInfo((prev) => ({
                      ...prev,
                      visible: true,
                      src: images[imageIndex],
                    }))
                : undefined
            }
            onMouseLeave={
              zoomMode === "hover"
                ? () => setZoomInfo((prev) => ({ ...prev, visible: false }))
                : undefined
            }
            onClick={zoomMode === "click" ? toggleZoom : undefined}
          />

          {/* Loading indicator */}
          {!isImageLoaded && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.paper",
              }}
            >
              Loading...
            </Box>
          )}
        </Box>

        {/* Navigation buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            mt: 1,
          }}
        >
          <IconButton
            onClick={handlePrevClick}
            disabled={prevDisabled}
            size="small"
          >
            <ChevronLeft />
          </IconButton>

          <IconButton
            onClick={handleZoomModeToggle}
            size="small"
            color={zoomMode === "click" ? "primary" : "default"}
            title={
              zoomMode === "hover"
                ? "Switch to click-to-zoom"
                : "Switch to hover-to-zoom"
            }
          >
            <ZoomIn />
          </IconButton>

          <IconButton
            onClick={handleNextClick}
            disabled={nextDisabled}
            size="small"
          >
            <ChevronRight />
          </IconButton>
        </Box>

        {/* Image thumbnails */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 1,
            mt: 2,
          }}
        >
          {images.map((img, i) => (
            <Box
              key={i}
              onClick={() => setImageIndex(i)}
              sx={(theme) => ({
                width: 60,
                height: 60,
                border:
                  imageIndex === i
                    ? `2px solid ${theme.palette.primary.main}`
                    : "1px solid #ddd",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: 1,
                overflow: "hidden",
                "&:hover": {
                  borderColor: theme.palette.primary.light,
                },
              })}
            >
              <Box
                component="img"
                src={img}
                alt={`Thumbnail ${i + 1}`}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Zoom view - Absolutely positioned */}
      {zoomInfo.visible && (
        <Box
          sx={{
            position: "absolute",
            top: { xs: "100%", md: 0 },
            right: { xs: 0, md: "-320px" },
            width: 300,
            height: 300,
            border: "1px solid #ddd",
            borderRadius: 1,
            overflow: "hidden",
            boxShadow: 2,
            zIndex: 10,
            ...calculateZoomBackground(),
          }}
        />
      )}

      {/* Zoom level controls */}
      {zoomInfo.visible && (
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            right: { xs: 10, md: "-310px" },
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "rgba(255,255,255,0.8)",
            p: 1,
            borderRadius: 1,
            boxShadow: 1,
            zIndex: 11,
          }}
        >
          <IconButton
            size="small"
            onClick={() =>
              setZoomInfo((prev) => ({
                ...prev,
                magnification: Math.max(1.5, prev.magnification - 0.5),
              }))
            }
            disabled={zoomInfo.magnification <= 1.5}
          >
            -
          </IconButton>
          <Box sx={{ fontSize: "0.8rem" }}>
            {zoomInfo.magnification.toFixed(1)}x
          </Box>
          <IconButton
            size="small"
            onClick={() =>
              setZoomInfo((prev) => ({
                ...prev,
                magnification: Math.min(5, prev.magnification + 0.5),
              }))
            }
            disabled={zoomInfo.magnification >= 5}
          >
            +
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
