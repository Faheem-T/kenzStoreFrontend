import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";
import { AddToCartButton } from "../components/AddToCartButton";
import { useGetProductQuery } from "../api/productsApi";
import { LoadingComponent } from "../components/LoadingComponent";
import { ImageViewComponent } from "../components/ImageViewComponent";
import { CategoryBreadCrumb } from "../components/CategoryBreadcrumb";
import { ReviewSection } from "../components/ReviewSection";

export const ProductDetailsPage = () => {
    const productId = useParams().id?.trim()

    if (!productId) return <Box>Product not found!!</Box>

    const { data, isLoading } = useGetProductQuery(productId)

    if (isLoading) return <LoadingComponent fullScreen />

    if (!data) return <Box>Product not found!!</Box>

    const { data: product } = data

    return (
        <>
            {/* Category Breadcrumb */}
            <CategoryBreadCrumb categories={product.categories} />
            {/* Main Section */}
            <Box sx={{ display: "flex", gap: 4, padding: 4 }}>
                <ImageViewComponent images={product.images} />
                <Box sx={{ width: 1 / 2, padding: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="h4">{product.name}</Typography>
                    <Typography variant="h5">QR {product.price}/-</Typography>
                    <Typography>{product.description}</Typography>
                    <AddToCartButton />
                </Box>
            </Box>
        {/* Reviews Section */}
            <ReviewSection productId={productId} />
        </>
    )
}
