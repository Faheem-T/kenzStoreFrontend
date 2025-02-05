import { apiSlice } from "../api";
import { BaseResponse } from "../types/apiResponseTypes";

interface razorpayOrder {
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  created_at: number;
  currency: string;
  entity: string;
  id: string;
  notes: [];
  offer_id: string | null;
  receipt: string;
  status: string;
}

const paymentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRazorpayOrder: builder.query<BaseResponse<razorpayOrder>, void>({
      query: () => "v1/payments/order",
    }),
  }),
});

export const { useGetRazorpayOrderQuery, useLazyGetRazorpayOrderQuery } =
  paymentsApi;
