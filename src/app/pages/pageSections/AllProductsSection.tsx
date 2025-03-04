import { useGetProductsQuery } from "@/app/api/productsApi";
import LoadingComponent from "@/app/components/LoadingComponent";
import { ProductCard } from "@/app/components/ProductCard";
import { Box, Stack, Typography } from "@mui/material";

export const AllProductsSection = () => {
  const { data, isLoading } = useGetProductsQuery({});
  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Couldn't fetch products</Box>;

  return (
    <>
      <Stack gap={2} sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
          All Products
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {data.data.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </Box>
      </Stack>
    </>
  );
};
