import { api } from "../api";
import {
  BaseResponse,
  baseResponseWithMessage,
} from "../types/apiResponseTypes";
import { CartType, PopulatedCartType } from "../types/cart";

// interface GetCartResponse extends baseResponse<ProductPopulatedCartType> {
//   cartTotal: number;
// }

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<BaseResponse<PopulatedCartType>, void>({
      query: () => "v1/cart",
      providesTags: ["Cart"],
    }),
    getMinimalCart: builder.query<BaseResponse<CartType>, void>({
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
      invalidatesTags: ["Cart", { type: "Coupon", id: "User" }],
    }),
    removeFromCart: builder.mutation<
      baseResponseWithMessage,
      { productId: string }
    >({
      query: (body) => ({
        url: `v1/cart/items/${body.productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart", { type: "Coupon", id: "User" }],
    }),
    clearCart: builder.mutation<baseResponseWithMessage, void>({
      query: () => ({
        url: "v1/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart", { type: "Coupon", id: "User" }],
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
