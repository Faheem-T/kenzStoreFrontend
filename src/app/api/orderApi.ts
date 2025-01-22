import { apiSlice } from "../api";

interface placeOrderBody {
  cartId: string;
  addressId: string;
  paymentMethod: string;
}
// SHARED TYPE: Sync with backend
interface PlaceOrderResponse {
  success: boolean;
  message: string;
  data?: { orderId: string };
  errors?: CartValidationErrorType[];
}
// SHARED TYPE: Sync with backend
interface CartValidationErrorType {
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
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const { usePlaceOrderMutation } = orderApi;
