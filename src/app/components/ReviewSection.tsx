import { Box, Rating, Typography } from "@mui/material"
import { useGetProductReviewsQuery } from "../api/reviewsApi"
import { LoadingComponent } from "./LoadingComponent"
import { ReviewCard } from "./ReviewCard"

interface ReviewSectionProps {
    productId: string
}

export const ReviewSection = ({ productId }: ReviewSectionProps) => {
    const { data, isLoading } = useGetProductReviewsQuery(productId)

    if (isLoading) return <LoadingComponent />

    if (!data) return <Box>Reviews Not Found!</Box>

    const { ratingsCount, averageRating, productReviews: reviews } = data.data
    return (
        <>
            <Box sx={{ padding: 4 }}>
                <Typography sx={{ textTransform: "uppercase" }} variant="h6">Reviews <Box sx={theme => ({ display: "inline", color: theme.palette.text.secondary })}>({ratingsCount})</Box></Typography>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContents: "center", marginY: 1 }}>
                    <Typography sx={{ textTransform: "uppercase" }} variant="h3">
                        {averageRating}
                    </Typography>
                    <Rating value={averageRating} precision={0.5} readOnly />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {reviews.map((review) => <ReviewCard review={review} key={review._id}/>)}
                </Box>
            </Box>
        </>
    )
}
