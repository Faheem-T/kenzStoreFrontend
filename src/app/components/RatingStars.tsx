import { Star, StarBorder, StarHalf } from "@mui/icons-material";
import { Box } from "@mui/material"
import { ReactNode } from "react";

interface RatingStarsProps {
    rating: number
}

export const RatingStars = ({ rating }: RatingStarsProps) => {
    const starComponents: ReactNode[] = [];

    let temp = rating;
    while (temp >= 1) {
        starComponents.push(<Star />)
        temp--;
    }

    if (temp >= 0.5) {
        starComponents.push(<StarHalf />)
    }

    while (starComponents.length < 5) {
        starComponents.push(<StarBorder />)
    }



    return (
        <Box>
            {starComponents}
        </Box>
    )
}
