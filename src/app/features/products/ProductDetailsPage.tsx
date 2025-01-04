import { Box } from "@mui/material";
import { ProductType } from "../../types/product";
import { useLocation } from "react-router";

interface ProductDetailsPageProps {
    product: ProductType
}

export const ProductDetailsPage = () => {

    const product: ProductType = useLocation().state

    const productImages = product.images.map((link, i) => <img src={link} key={i} />)
    return (
        <>
            <Box>
                {productImages}
            </Box>
        </>
    )
}
