import {
  Box,
  Divider,
  Rating,
  Stack,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import { useParams } from "react-router";
import { AddToCartButton } from "../components/AddToCartButton";
import { useGetProductQuery } from "../api/productsApi";
import LoadingComponent from "../components/LoadingComponent";
import { ImageViewComponent } from "../components/ImageViewComponent";
import { CategoryBreadCrumb } from "../components/CategoryBreadcrumb";
import { ReviewSection } from "./pageSections/ReviewSection";
import { useGetProductReviewsQuery } from "../api/reviewsApi";
import { RelatedProductsSection } from "./pageSections/RelatedProductsSection";
import { SpecificationSection } from "./pageSections/SpecificationSection";
import { Navbar } from "../components/Navbar";
import { StockDisplay } from "../components/ProductStockDisplay";
import { DiscountedPriceDisplay } from "../components/ProductDiscountedPriceDisplay";
import { Footer } from "../components/Footer";

const ProductDetailsPage = () => {
  const productId = useParams().id?.trim();

  if (!productId) return <Box>Product not found!!</Box>;

  // fetching product
  const { data, isLoading } = useGetProductQuery(productId);

  // fetching product review to display average review
  let averageReviewContent;
  const {
    data: reviewData,
    isLoading: isReviewLoading,
    isError,
  } = useGetProductReviewsQuery(productId);

  if (isLoading) return <LoadingComponent fullScreen />;

  if (!data) return <Box>Product not found!!</Box>;

  const { data: product } = data;

  if (isReviewLoading) averageReviewContent = <LoadingComponent />;
  else if (!reviewData || isError)
    averageReviewContent = (
      <Typography variant="caption" color="textDisabled">
        No Reviews yet
      </Typography>
    );
  else
    averageReviewContent = (
      <Rating value={reviewData.data.averageRating} readOnly />
    );

  return (
    <>
      <Navbar />
      <Stack
        sx={{
          px: { xs: 2, sm: 4, md: 8, lg: 18 }, // Responsive padding
          spacing: 4,
        }}
        divider={<Divider />}
      >
        <Box>
          {/* Category Breadcrumb */}
          <CategoryBreadCrumb categories={[product.category]} />
          {/* Main Section */}
          <Grid container spacing={4} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ImageViewComponent images={product.images} />
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                p: { xs: 2, md: 4 }, // Smaller padding for mobile
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h4">{product.name}</Typography>
              {averageReviewContent}
              <DiscountedPriceDisplay
                price={product.price}
                finalPrice={product.finalPrice}
              />
              <Typography>{product.description}</Typography>
              {product.stock ? (
                <>
                  <StockDisplay stock={product.stock} />
                  <AddToCartButton
                    productId={product._id}
                    productStock={product.stock}
                  />
                </>
              ) : (
                <Typography color="textDisabled">
                  This product is currently out of stock
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
        {/* Product Specifications Section */}
        <SpecificationSection specifications={product.specifications} />
        {/* Reviews Section */}
        <ReviewSection productId={productId} />
        {/* Related Products Section */}
        <RelatedProductsSection productId={productId} />
      </Stack>
      <Footer />
    </>
  );
};
export default ProductDetailsPage;
