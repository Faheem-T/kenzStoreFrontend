import { Box, Typography } from "@mui/material";
import { useGetWishlistQuery } from "../api/wishlistApi";
import { LoadingComponent } from "../components/LoadingComponent";
import { ProductCard } from "../components/ProductCard";
import { Heart } from "lucide-react";

export const WishlistPage = () => {
  const { data, isLoading } = useGetWishlistQuery();
  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Couldn't Fetch Wishlist</Box>;
  const products = data.data;

  let content;

  if (products.length === 0) {
    content = (
      <Box
        sx={{
          height: "70vh",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" color="textDisabled">
          Your wishlist is empty
        </Typography>
      </Box>
    );
  } else {
    content = products.map((product) => (
      <ProductCard product={product} key={product._id} />
    ));
  }

  return (
    <>
      <Box
        sx={{
          p: 4,
          display: "flex",
          width: "100%",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Heart size={40} />
          <Typography variant="h5">Your Wishlist</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>{content}</Box>
      </Box>
    </>
  );
};
