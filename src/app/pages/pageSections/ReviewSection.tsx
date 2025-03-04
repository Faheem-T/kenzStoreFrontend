import { Box, Rating, Typography } from "@mui/material";
import { useGetProductReviewsQuery } from "../../api/reviewsApi";
import LoadingComponent from "../../components/LoadingComponent";
import { ReviewCard } from "../../components/ReviewCard";

interface ReviewSectionProps {
  productId: string;
}

export const ReviewSection = ({ productId }: ReviewSectionProps) => {
  const { data, isLoading, isError } = useGetProductReviewsQuery(productId);

  let content;
  let ratingsCount = 0;

  if (isLoading) content = <LoadingComponent />;
  else if (!data || isError)
    content = (
      <Typography variant="caption" color="textDisabled">
        No Reviews yet
      </Typography>
    );
  else {
    const {
      ratingsCount: count,
      averageRating,
      productReviews: reviews,
    } = data.data;

    ratingsCount = count;

    content = (
      <>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContents: "center",
            marginY: 1,
          }}
        >
          <Typography sx={{ textTransform: "uppercase" }} variant="h3">
            {averageRating}
          </Typography>
          <Rating value={averageRating} precision={0.5} readOnly />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {reviews.map((review) => (
            <ReviewCard review={review} key={review._id} />
          ))}
        </Box>
      </>
    );
  }
  return (
    <>
      <Box>
        <Typography sx={{ textTransform: "uppercase" }} variant="h6">
          Reviews{" "}
          <Box
            sx={(theme) => ({
              display: "inline",
              color: theme.palette.text.secondary,
            })}
          >
            ({ratingsCount})
          </Box>
        </Typography>
        {content}
      </Box>
    </>
  );
};
