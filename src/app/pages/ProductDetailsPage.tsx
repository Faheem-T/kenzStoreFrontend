import { Box, Rating, Typography } from "@mui/material";
import { useParams } from "react-router";
import { AddToCartButton } from "../components/AddToCartButton";
import { useGetProductQuery } from "../api/productsApi";
import { LoadingComponent } from "../components/LoadingComponent";
import { ImageViewComponent } from "../components/ImageViewComponent";
import { CategoryBreadCrumb } from "../components/CategoryBreadcrumb";
import { ReviewSection } from "../components/ReviewSection";
import { useGetProductReviewsQuery } from "../api/reviewsApi";

export const ProductDetailsPage = () => {
    const productId = useParams().id?.trim()

    if (!productId) return <Box>Product not found!!</Box>

    // fetching product
    const { data, isLoading } = useGetProductQuery(productId)

    // fetching product review to display average review
    let averageReviewContent;
    const { data: reviewData, isLoading: isReviewLoading } = useGetProductReviewsQuery(productId)

    if (isLoading) return <LoadingComponent fullScreen />

    if (!data) return <Box>Product not found!!</Box>

    const { data: product } = data

    if (isReviewLoading) averageReviewContent = <LoadingComponent />
    else if (!reviewData) averageReviewContent = <Box>No reviews yet</Box>
    else averageReviewContent = <Rating value={reviewData.data.averageRating} readOnly />

    return (
        <>
            {/* Category Breadcrumb */}
            <CategoryBreadCrumb categories={product.categories} />
            {/* Main Section */}
            <Box sx={{ display: "flex", gap: 4, padding: 4 }}>
                <ImageViewComponent images={product.images} />
                <Box sx={{ width: 1 / 2, padding: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="h4">{product.name}</Typography>
                    {averageReviewContent}
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Typography
                            variant={product.isDiscountActive ? "h6" : "h5"}
                            sx={{
                                textDecoration: product.isDiscountActive ? "line-through" : "inital",
                            }}
                            color={product.isDiscountActive ? "textDisabled" : "textPrimary"}
                        >
                            QR {product.price}/-
                        </Typography>
                        {product.isDiscountActive &&
                            <Typography
                                variant="h5"
                            >
                                QR {product.finalPrice}/-
                            </Typography>}
                    </Box>
                    <Typography>{product.description}</Typography>
                    {product.stock ?
                        <AddToCartButton />
                        :
                        <Typography color="textDisabled">This product is currently out of stock</Typography>
                    }
                </Box>
            </Box >
            {/* Reviews Section */}
            < ReviewSection productId={productId} />
        </>
    )
}
