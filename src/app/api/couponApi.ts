import { apiSlice } from "../api";
import {
  baseResponse,
  baseResponseWithMessage,
} from "../types/apiResponseTypes";
import {
  CouponType,
  CreateCouponType,
  FetchCouponType,
  UpdateCouponType,
} from "../types/coupon";

const couponApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCoupons: builder.query<baseResponse<CouponType[]>, void>({
      query: () => "v1/coupons",
      providesTags: (result = { data: [], success: false }) => [
        ...result.data.map(
          (coupon) => ({ type: "Coupon", id: coupon._id } as const)
        ),
        { type: "Coupon" },
      ],
    }),
    createCoupon: builder.mutation<baseResponseWithMessage, CreateCouponType>({
      query: (body) => ({
        url: "v1/coupons",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Coupon"],
    }),
    deleteCoupon: builder.mutation<baseResponseWithMessage, string>({
      query: (couponId) => ({
        url: `v1/coupons/${couponId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Coupon", id: arg }],
    }),
    updateCoupon: builder.mutation<
      baseResponseWithMessage,
      { couponId: string; body: UpdateCouponType }
    >({
      query: ({ couponId, body }) => ({
        url: `v1/coupons/${couponId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { couponId }) => [
        { type: "Coupon", id: couponId },
      ],
    }),
    getApplicableCoupons: builder.query<baseResponse<FetchCouponType[]>, void>({
      query: () => "v1/coupons/users/applicable",
      providesTags: [{ type: "Coupon", id: "User" }],
    }),
    applyCouponToCart: builder.mutation<baseResponseWithMessage, string>({
      query: (code) => ({
        url: "v1/coupons/cart",
        method: "POST",
        body: { code },
      }),
    }),
    deleteCouponFromCart: builder.mutation<baseResponseWithMessage, void>({
      query: () => ({
        url: "v1/coupons/cart",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
  useGetApplicableCouponsQuery,
  useApplyCouponToCartMutation,
  useDeleteCouponFromCartMutation,
} = couponApi;
