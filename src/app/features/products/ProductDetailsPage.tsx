import { Box, CircularProgress, Typography } from "@mui/material";
import { ProductType } from "../../types/product";
import { useLocation, useParams } from "react-router";
import { AddToCartButton } from "../../components/AddToCartButton";
import { useGetProductQuery } from "../../api/productsApi";
import { LoadingComponent } from "../../components/LoadingComponent";

/* interface ProductDetailsPageProps {
*     product: ProductType
* } */

export const ProductDetailsPage = () => {
    const productId = useParams().id

    if (!productId) return <Box>Product not found!!</Box>

    console.log("Param", productId)
    /* const product: ProductType = useLocation().state */
    const { data, isLoading } = useGetProductQuery(productId)

    if (isLoading) return <LoadingComponent fullScreen />

        if (!data) return <Box>Product not found!!</Box>

        const {data: product } = data

    const productImages = product.images.map((link, i) => <img src={link} key={i} width="80%" />)
        return (
        <>
            <Box sx={{ display: "flex", gap: 4, padding: 4 }}>
                <Box sx={{ width: 1 / 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {productImages[0]}
                </Box>
                <Box sx={{ width: 1 / 2, padding: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="h4">{product.name}</Typography>
                    <Typography>{product.description}</Typography>
                    <AddToCartButton />
                </Box>
            </Box>
        </>
        )
}
