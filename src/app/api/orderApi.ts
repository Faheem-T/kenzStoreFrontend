import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { api } from "../api";
import { GetUserOrder, OrderStatus } from "../types/order";
import { baseResponseWithMessage } from "../types/apiResponseTypes";

interface placeOrderBody {
  cartId: string;
  addressId: string;
  paymentMethod: string;
}
// SHARED TYPE: Sync with backend
export interface PlaceOrderResponse {
  success: boolean;
  message: string;
  data?: {
    orderId: string;
    razorpayOrder: { id: string; amount: number; currency: string };
  };
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

export const orderApi = api.injectEndpoints({
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
    verifyPayment: build.mutation<
      baseResponseWithMessage,
      {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }
    >({
      query: (body) => ({
        url: "v1/orders/verify",
        method: "POST",
        body,
      }),
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
    requestOrderReturn: build.mutation<any, { orderId: string }>({
      query: ({ orderId }) => ({
        url: `v1/orders/${orderId}/return`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Order", _id: arg.orderId },
      ],
    }),
    // Admin routes
    adminGetAllOrders: build.query<getUserOrdersResponse, void>({
      query: () => "v1/orders/admin",
      providesTags: (result = { data: [], success: false }, _error) => [
        ...result.data.map(({ _id }) => ({ type: "Order", id: _id } as const)),
        "Order",
      ],
    }),
    adminChangeOrderStatus: build.mutation<
      baseResponseWithMessage,
      { orderId: string; status: OrderStatus }
    >({
      query: ({ orderId, status }) => ({
        url: `v1/orders/admin/${orderId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Order", _id: arg.orderId },
      ],
    }),
    adminApproveOrderReturn: build.mutation<
      baseResponseWithMessage,
      { orderId: string }
    >({
      query: ({ orderId }) => ({
        url: `v1/orders/admin/${orderId}/return/approve`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Order", _id: arg.orderId },
      ],
    }),
    adminRejectOrderReturn: build.mutation<
      baseResponseWithMessage,
      { orderId: string }
    >({
      query: ({ orderId }) => ({
        url: `v1/orders/admin/${orderId}/return/reject`,
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
  useVerifyPaymentMutation,
  useGetUserOrdersQuery,
  useCancelOrderMutation,
  useRequestOrderReturnMutation,
  useAdminGetAllOrdersQuery,
  useAdminChangeOrderStatusMutation,
  useAdminApproveOrderReturnMutation,
  useAdminRejectOrderReturnMutation,
} = orderApi;
