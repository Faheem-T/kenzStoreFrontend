import { Box } from "@mui/material";
import { useGetProductQuery } from "../../api/productsApi"

interface ProductDetailsPageProps {
    productId: string
}

export const ProductDetailsPage = ({ productId }: ProductDetailsPageProps) => {
    const { data, isLoading } = useGetProductQuery(productId)

    let content;

    if (isLoading) {
        return <Box>Loading...</Box>
    }

    const product = data?.data

    if (!product) {
        return <Box>product not found </Box>
    }

    const productImages = product.images.map((link, i) => <img src={link} key={i} />)
    content = (
        <>
            <Box>
                {productImages}
            </Box>
        </>
    )

    return content
}
