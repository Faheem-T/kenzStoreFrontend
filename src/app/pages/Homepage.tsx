import { Box, Divider, Stack, Typography } from "@mui/material";
import { AllProductsSection } from "./pageSections/AllProductsSection";
import { HeroSection } from "./pageSections/HeroSection";
import { Navbar } from "../components/Navbar";
import { MainSection } from "./pageSections/MainSection";

export const Homepage = () => {
  return (
    <>
      <Stack sx={{ width: "100%", "& > *": { px: 12 } }}>
        <MainSection />
        {/* <HeroSection /> */}
        <Box
          sx={{
            background: "linear-gradient(to bottom,  black, 20%, transparent)",
          }}
        >
          <AllProductsSection />
        </Box>
      </Stack>
    </>
  );
};
