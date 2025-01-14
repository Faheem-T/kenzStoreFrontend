import { Box, Typography, IconButton } from "@mui/material";
import { useGetHeroProductsQuery } from "../../api/productsApi";
import { useState } from "react";
import { HeroProductComponent } from "../../components/HeroProductComponent";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { LoadingComponent } from "../../components/LoadingComponent";

export const HeroSection = () => {
  const { data, isLoading } = useGetHeroProductsQuery();
  const [index, setIndex] = useState(0);

  const heroProducts = data?.data;

  if (isLoading) return <LoadingComponent fullScreen />;
  if (!heroProducts) return <Box>Products not found!</Box>;

  const heroProductComponents = heroProducts.map((product) => (
    <HeroProductComponent product={product} />
  ));

  const handleNextClick = () => {
    if (index < heroProducts.length - 1) {
      setIndex((current) => current + 1);
    }
  };

  const handlePrevClick = () => {
    if (index > 0) {
      setIndex((current) => current - 1);
    }
  };

  const prevDisabled = index === 0;
  const nextDisabled = index === heroProducts.length - 1;

  return (
    <Box sx={{ position: "relative", height: "80vh" }}>
      {heroProductComponents[index]}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          position: "absolute",
          bottom: 0,
          right: 16,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 4,
            alignItems: "center",
            height: "fit-content",
            alignSelf: "end",
          }}
        >
          <Typography variant="h4">{index + 1}</Typography>
          <Box sx={{ width: 150, height: 4 }} bgcolor="Background" />
          <Typography variant="h4" color="secondary">
            {heroProducts.length}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <IconButton onClick={handleNextClick} disabled={nextDisabled}>
            <ChevronRight sx={{ fontSize: 100 }} />
          </IconButton>
          <IconButton onClick={handlePrevClick} disabled={prevDisabled}>
            <ChevronLeft sx={{ fontSize: 100 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
