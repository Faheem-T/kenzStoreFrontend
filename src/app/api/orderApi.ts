import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api";
import { GetUserOrder } from "../types/order";

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

export interface getUserOrdersResponse {
  success: boolean;
  data: GetUserOrder[];
  message?: string;
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
          message: "An unexpected error occured during order placement",
        };
      },
      invalidatesTags: ["Cart", "Product", { type: "Product" }],
    }),
    getUserOrders: build.query<getUserOrdersResponse, void>({
      query: () => "v1/orders",
      providesTags: (result = { data: [], success: false }) => [
        ...result.data.map(({ _id }) => ({ type: "Order", id: _id } as const)),
        { type: "Order" },
      ],
      transformErrorResponse: (response: FetchBaseQueryError) => {
        if ("data" in response) {
          return response.data as getUserOrdersResponse;
        }
        return {
          success: false,
          message: "An unexpected error occured when fetching orders",
        };
      },
    }),
    cancelOrder: build.mutation<any, { orderId: string }>({
      query: ({ orderId }) => ({
        url: `v1/orders/${orderId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Order", _id: arg.orderId },
      ],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetUserOrdersQuery,
  useCancelOrderMutation,
} = orderApi;
