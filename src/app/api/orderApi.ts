import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api";

interface placeOrderBody {
  cartId: string;
  addressId: string;
  paymentMethod: string;
}
// SHARED TYPE: Sync with backend
export interface PlaceOrderResponse {
  success: boolean;
  message: string;
  data?: { orderId: string };
  errors?: CartValidationErrorType[];
}
// SHARED TYPE: Sync with backend
export interface CartValidationErrorType {
  item: string; // ObjectId
  error: string;
  requested?: number;
  available?: number;
}
const orderApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    placeOrder: build.mutation<PlaceOrderResponse, placeOrderBody>({
      query: (body) => ({
        url: "v1/orders",
        method: "POST",
        body: body,
      }),
      // Transform error responses
      transformErrorResponse: (response: FetchBaseQueryError) => {
        if ("data" in response) {
          return response.data as PlaceOrderResponse;
        }
        return {
          success: false,
          message: "An error occured during order placement",
        };
      },
    }),
  }),
});

export const { usePlaceOrderMutation } = orderApi;
