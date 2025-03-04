import { useGetProductQuery } from "@/app/api/productsApi";
import { ProductDetailsSection } from "@/app/pages/adminPages/adminPageSections/ProductDetailsSection";
import { ImageViewComponent } from "@/app/components/ImageViewComponent";
import LoadingComponent from "@/app/components/LoadingComponent";
import { ReviewSection } from "@/app/pages/pageSections/ReviewSection";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const AdminProductPage = () => {
  const productId = useParams().productId;
  const navigate = useNavigate();
  const [loadReviews, setLoadReviews] = useState(false);
  if (!productId) return <Box>No product ID found!</Box>;

  const { data, isLoading } = useGetProductQuery(productId);

  if (isLoading) return <LoadingComponent fullScreen />;

  if (!data) return <Box>Product Not Found</Box>;

  const product = data.data;

  return (
    <>
      <Stack spacing={2} sx={{ padding: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
            Product Details
          </Typography>
          <Button variant="contained" onClick={() => navigate("update")}>
            Update Details
          </Button>
        </Box>

        {/* Product Details */}
        <ProductDetailsSection product={product} />

        {/* Images Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
            Images
          </Typography>
          <Button variant="contained" onClick={() => navigate("update/images")}>
            Update Images
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 10,
          }}
        >
          <ImageViewComponent images={product.images} />
        </Box>

        {/* Reviews Section */}
        <Divider />
        <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
          Product Reviews
        </Typography>
        {loadReviews ? (
          <>
            <ReviewSection productId={product._id} />
            <Button variant="contained" onClick={() => setLoadReviews(false)}>
              Hide Reviews
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={() => setLoadReviews(true)}>
            Load Reviews
          </Button>
        )}
      </Stack>
    </>
  );
};
export default AdminProductPage;
