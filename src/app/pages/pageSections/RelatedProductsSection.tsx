import { Box, Typography } from "@mui/material";
import { useGetRelatedProductsQuery } from "../../api/productsApi";
import { LoadingComponent } from "../../components/LoadingComponent";
import { ProductCard } from "../../components/ProductCard";

interface RelatedProductsSectionProps {
  productId: string;
}

export const RelatedProductsSection = ({
  productId,
}: RelatedProductsSectionProps) => {
  const { data, isLoading } = useGetRelatedProductsQuery(productId);
  if (isLoading) return <LoadingComponent />;
  if (!data) return <Box>No Related Products...</Box>;

  const relatedProducts = data.data;
  const productCards = relatedProducts.map((product) => (
    <ProductCard product={product} key={product._id} />
  ));

  return (
    <Box>
      <Typography sx={{ textTransform: "uppercase", marginY: 2 }} variant="h6">
        Related Products
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>{productCards}</Box>
    </Box>
  );
};
