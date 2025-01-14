import { Divider, Stack } from "@mui/material";
import { AllProductsSection } from "./pageSections/AllProductsSection";
import { HeroSection } from "./pageSections/HeroSection";

export const Homepage = () => {
  return (
    <>
      <Stack gap={8} divider={<Divider />}>
        <HeroSection />
        <AllProductsSection />
      </Stack>
    </>
  );
};
