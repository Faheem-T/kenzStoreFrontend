import { Divider, Stack } from "@mui/material";
import { AllProductsSection } from "./pageSections/AllProductsSection";
import { HeroSection } from "./pageSections/HeroSection";
import { Navbar } from "../components/Navbar";

export const Homepage = () => {
  return (
    <>
      <Navbar />
      <Stack sx={{ px: 12 }} gap={8} divider={<Divider />}>
        <HeroSection />
        <AllProductsSection />
      </Stack>
    </>
  );
};
