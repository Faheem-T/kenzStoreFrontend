import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";
import { AddToCartButton } from "../components/AddToCartButton";
import { useGetProductQuery } from "../api/productsApi";
import { LoadingComponent } from "../components/LoadingComponent";
import { ImageViewComponent } from "../components/ImageViewComponent";

export const ProductDetailsPage = () => {
    const productId = useParams().id?.trim()

    if (!productId) return <Box>Product not found!!</Box>

    const { data, isLoading } = useGetProductQuery(productId)

    if (isLoading) return <LoadingComponent fullScreen />

    if (!data) return <Box>Product not found!!</Box>

    const { data: product } = data

    return (
        <>
            <Box sx={{ display: "flex", gap: 4, padding: 4 }}>
                <ImageViewComponent images={product.images} />
                <Box sx={{ width: 1 / 2, padding: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="h4">{product.name}</Typography>
                    <Typography>{product.description}</Typography>
                    <AddToCartButton />
                </Box>
            </Box>
        </>
    )
}
