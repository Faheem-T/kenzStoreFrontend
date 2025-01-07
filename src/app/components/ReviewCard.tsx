import { Box, Rating, Typography } from "@mui/material"
import { UserPopulatedReviewType } from "../types/reviews"

interface ReviewCardProps {
    review: UserPopulatedReviewType
}

// TODO add "verified" badge

export const ReviewCard = ({ review }: ReviewCardProps) => {

    const plural = (review.helpfulCount && review.helpfulCount > 1)

    return (
        <Box sx={theme => ({ background: theme.palette.background.paper, padding: 4 })}>
            <Typography color="textDisabled">{review.userId.firstName}</Typography>
            <Rating value={review.rating} precision={0.5} readOnly />
            <Typography variant="body1" sx={{ margin: 2 }}>{review.comment}</Typography>
            {review.helpfulCount ?
                <Typography variant="caption" color="textDisabled">
                    {review.helpfulCount}
                    {plural ? " people " : " person "}
                    found this helpful
                </Typography>
                : null}
        </Box>
    )
}
