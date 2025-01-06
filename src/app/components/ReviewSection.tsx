import { Box, Typography } from "@mui/material"
import { useGetProductReviewsQuery } from "../api/reviewsApi"
import { LoadingComponent } from "./LoadingComponent"
import { ReviewCard } from "./ReviewCard"

interface ReviewSectionProps {
    productId: string
}

export const ReviewSection = ({ productId }: ReviewSectionProps) => {
    const { data, isLoading } = useGetProductReviewsQuery(productId)
    console.log(data, isLoading)

    if (isLoading) return <LoadingComponent />

    if (!data) return <Box>Reviews Not Found!</Box>

    const { ratingsCount, averageRating, productReviews: reviews } = data.data
    return (
        <>
            <Box sx={{ padding: 4 }}>
                <Typography sx={{ textTransform: "uppercase" }} variant="h4">Reviews</Typography>
                <Typography sx={{ textTransform: "uppercase" }} variant="h6">
                    Average Rating: {averageRating} <Box sx={theme => ({ display: "inline", color: theme.palette.text.secondary })}>({ratingsCount})</Box>
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {reviews.map((review) => <ReviewCard review={review} />)}
                </Box>
            </Box>
        </>
    )
}
