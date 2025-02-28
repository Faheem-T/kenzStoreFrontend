import { api } from "../api";
import {
  getProductReviewsResponse,
  getReviewResponse,
} from "../types/apiResponseTypes";

const reviewsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReview: builder.query<getReviewResponse, string>({
      query: (id) => `v1/reviews/${id}`,
      providesTags: (_result, _error, arg) => [{ type: "Review", id: arg }],
    }),
    getProductReviews: builder.query<getProductReviewsResponse, string>({
      query: (productId) => `v1/reviews/product/${productId}`,
      providesTags: (
        result = {
          data: { productReviews: [], ratingsCount: 0, averageRating: 0 },
          success: false,
        },
        _error,
        arg
      ) => [
        ...result.data.productReviews.map(
          ({ _id }) => ({ type: "Review", id: _id } as const)
        ),
        { type: "Review", productId: arg },
      ],
    }),
  }),
});

export const { useGetReviewQuery, useGetProductReviewsQuery } = reviewsApi;
