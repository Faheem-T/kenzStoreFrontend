import { ProductType } from "../types/product"
import { Box, Typography } from "@mui/material"

interface HeroProductComponentProps {
    product: ProductType
}

export const HeroProductComponent = ({ product }: HeroProductComponentProps) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", padding: 8, alignItems: "center" }}>
            <Box sx={{ width: 1 / 2 }}>
                <Typography variant="h1">
                    {product.name}
                </Typography>
                {product?.categories[0]?.name}
                <Typography variant="h3" color="secondary" fontWeight="800">
                    QR {product.price}
                </Typography>
            </Box>
            <Box sx={{ width: 1 / 2 }}>
                <img src={product.images[0]} width="80%" />
            </Box>
        </Box>
    )
}
