import { api } from "../api";
import {
  BaseResponse,
  baseResponseWithMessage,
} from "../types/apiResponseTypes";
import { ProductType } from "../types/product";

const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<BaseResponse<ProductType[]>, void>({
      query: () => "v1/wishlist",
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation<
      baseResponseWithMessage,
      { productId: string }
    >({
      query: (body) => ({
        url: "v1/wishlist",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: builder.mutation<
      baseResponseWithMessage,
      { productId: string }
    >({
      query: (body) => ({
        url: "v1/wishlist/product",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    clearWishlist: builder.mutation<baseResponseWithMessage, void>({
      query: () => ({
        url: "v1/wishlist",
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
} = wishlistApi;
