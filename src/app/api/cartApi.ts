import { apiSlice } from "../api";
import {
  baseResponse,
  baseResponseWithMessage,
} from "../types/apiResponseTypes";
import { CartType, ProductPopulatedCartType } from "../types/cart";

interface GetCartResponse extends baseResponse<ProductPopulatedCartType> {
  cartTotal: number;
}

const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<GetCartResponse, void>({
      query: () => "v1/cart",
      providesTags: ["Cart"],
    }),
    getMinimalCart: builder.query<baseResponse<CartType>, void>({
      query: () => "v1/cart/minimal",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<
      baseResponseWithMessage,
      { productId: string; quantity?: number }
    >({
      query: (body) => ({
        url: "v1/cart",
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation<
      baseResponseWithMessage,
      { productId: string }
    >({
      query: (body) => ({
        url: `v1/cart/items/${body.productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation<baseResponseWithMessage, void>({
      query: () => ({
        url: "v1/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useGetMinimalCartQuery,
  useClearCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
