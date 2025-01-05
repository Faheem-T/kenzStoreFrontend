import { Button, Typography } from "@mui/material"

export const AddToCartButton = () => {
    return (
        <Button variant="contained" sx={{ width: 1 }}>
            <Typography variant="button" sx={{ textTransform: "uppercase" }}>add to cart</Typography>
        </Button>
    )
}
