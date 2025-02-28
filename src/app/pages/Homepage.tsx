import { Stack } from "@mui/material";
import { Footer } from "../components/Footer";
import { CategoryHeroComponent } from "../components/CategoryHeroComponent";
import { Navbar } from "../components/Navbar";
import { BrowseHeroComponent } from "../components/BrowseHeroComponent";

export const Homepage = () => {
  return (
    <>
      <Stack sx={{ width: "100%", "& > *": { px: 12 } }}>
        <Navbar />
        {/* <MainSection /> */}
        <CategoryHeroComponent
          categorySlug="webcam"
          heroText="Best webcams in town!"
          subText="Enjoy HD resolution video calls with your family, friends and co-workers."
          imageURL="https://res.cloudinary.com/dlicxnblg/image/upload/v1740752145/El_Gato_Facecam_bvupgk.webp"
          imageSide="right"
        />
        <CategoryHeroComponent
          categorySlug="headsets"
          categoryName="Headphones"
          heroText="Headphones? We got you."
          subText="Experience blissfull soud quality."
          imageURL="https://res.cloudinary.com/dlicxnblg/image/upload/v1740756789/3_d2e88ac4-eecf-466e-b906-a676db3390c4_nf0pmy.webp"
          imageSide="left"
          dark
        />
        <BrowseHeroComponent />
        <Footer />
      </Stack>
    </>
  );
};
