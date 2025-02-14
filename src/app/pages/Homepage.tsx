import { Box, Stack } from "@mui/material";
import { AllProductsSection } from "./pageSections/AllProductsSection";
import { MainSection } from "./pageSections/MainSection";

export const Homepage = () => {
  return (
    <>
      <Stack sx={{ width: "100%", "& > *": { px: 12 } }}>
        <MainSection />
        <Box>
          <AllProductsSection />
        </Box>
      </Stack>
    </>
  );
};
