import { Box, Button, Divider, Typography } from "@mui/material";
import { CheckoutAddressSelectionSection } from "./pageSections/CheckoutAddressSelectionSection";
import { useState } from "react";
import {
  CartValidationErrorType,
  PlaceOrderResponse,
  usePlaceOrderMutation,
} from "../api/orderApi";
import { useGetCartQuery } from "../api/cartApi";
import { LoadingComponent } from "../components/LoadingComponent";
import { PaymentMethod } from "../types/order";
import { CheckoutPaymentSection } from "./pageSections/CheckoutPaymentSection";
import toast from "react-hot-toast";
import { OrderSummary } from "./pageSections/OrderSummarySection";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router";
import { displayRazorpay } from "../utils/razorpayUtils";

// Type predicate
const isOrderError = (error: unknown): error is PlaceOrderResponse => {
  return typeof error === "object" && error !== null && "errors" in error;
};

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [addressId, setAddressId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [errors, setErrors] = useState<CartValidationErrorType[]>([]);
  const { data, isLoading: isCartLoading } = useGetCartQuery();
  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();

  if (isCartLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Couldn't fetch cart</Box>;
  const cart = data.data;
  const cartId = cart._id;

  const handleOrderPlacement = async () => {
    try {
      const data = await placeOrder({
        addressId,
        paymentMethod,
        cartId,
      }).unwrap();
      if (data) {
        if (data.data?.razorpayOrder) {
          const { amount, currency, id } = data.data.razorpayOrder;
          await displayRazorpay({ amount, currency, id });
        }
        toast.success(data.message);
        navigate("/order-confirmation", {
          state: { orderId: data.data?.orderId },
        });
      }
    } catch (error) {
      if (isOrderError(error)) {
        if (error?.errors) {
          setErrors(error.errors);
          error.errors.forEach((err) => {
            toast.error(err.error);
          });
        }
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occured");
      }

      console.log(error);
    }
  };

  const isOrderButtonDisabled =
    cart.items.length === 0 ||
    isPlacingOrder ||
    errors.length > 0 ||
    !addressId;

  return (
    <>
      <Navbar />
      <Box sx={{ py: 4, px: 16 }}>
        <Typography variant="h4" textAlign="center" sx={{ mb: 4 }}>
          Checkout
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* Address selection */}
            <CheckoutAddressSelectionSection
              addressId={addressId}
              setAddressId={setAddressId}
            />
            {/* Payment type selection */}
            <CheckoutPaymentSection
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
            {/* Order Summary */}
            <OrderSummary cart={cart}>
              <OrderSummary.Items errors={errors} />
              <Box sx={{ p: 2, backgroundColor: "background.paper" }}>
                <OrderSummary.Total />
              </Box>
            </OrderSummary>
            {/* Place Order Button */}
            <Button
              onClick={handleOrderPlacement}
              disabled={isOrderButtonDisabled}
              variant="contained"
            >
              Place Order
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: "background.paper",
              p: 2,
              height: "fit-content",
              flex: 0.4,
            }}
          >
            <Button
              variant="contained"
              onClick={handleOrderPlacement}
              disabled={isOrderButtonDisabled}
            >
              Place Order
            </Button>
            <Divider />
            <OrderSummary cart={cart}>
              <OrderSummary.Total />
            </OrderSummary>
          </Box>
        </Box>
      </Box>
    </>
  );
};
