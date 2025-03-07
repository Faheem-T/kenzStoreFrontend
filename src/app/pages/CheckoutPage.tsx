import {
  Box,
  Button,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CheckoutAddressSelectionSection } from "./pageSections/CheckoutAddressSelectionSection";
import { useState } from "react";
import {
  CartValidationErrorType,
  PlaceOrderResponse,
  usePlaceOrderMutation,
} from "../api/orderApi";
import { useGetCartQuery } from "../api/cartApi";
import LoadingComponent from "../components/LoadingComponent";
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

const CheckoutPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
          console.log("OrderID", data.data.orderId);
          await displayRazorpay({
            amount,
            currency,
            id,
            orderId: data.data.orderId,
            navigate,
          });
        } else {
          toast.success(data.message);
          navigate("/order-confirmation", {
            state: { orderId: data.data?.orderId },
          });
        }
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
        toast.error("An unexpected error occurred");
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
      <Box
        sx={{
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 4, md: 6, lg: 16 },
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          textAlign="center"
          sx={{ mb: { xs: 2, sm: 3, md: 4 } }}
        >
          Checkout
        </Typography>

        {/* Mobile Layout: Stacked */}
        {isMobile ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Quick Order Summary for Mobile */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                backgroundColor: "background.paper",
                p: 2,
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <OrderSummary cart={cart}>
                <OrderSummary.Total />
              </OrderSummary>
            </Box>

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

            {/* Detailed Order Summary */}
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
              size="large"
              fullWidth
              sx={{ py: 1.5 }}
            >
              Place Order
            </Button>
          </Box>
        ) : (
          /* Desktop Layout: Side by Side */
          <Box sx={{ display: "flex", gap: { sm: 2, md: 4 } }}>
            {/* Left Column - Main Checkout Flow */}
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

              {/* Place Order Button - Hidden on Desktop */}
              <Box sx={{ display: { md: "none" } }}>
                <Button
                  onClick={handleOrderPlacement}
                  disabled={isOrderButtonDisabled}
                  variant="contained"
                  fullWidth
                >
                  Place Order
                </Button>
              </Box>
            </Box>

            {/* Right Column - Order Summary */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                backgroundColor: "background.paper",
                p: 2,
                height: "fit-content",
                flex: { sm: 0.5, md: 0.4 },
                borderRadius: 1,
                boxShadow: 1,
                position: "sticky",
                top: 24,
              }}
            >
              <Button
                variant="contained"
                onClick={handleOrderPlacement}
                disabled={isOrderButtonDisabled}
                size="large"
                sx={{ py: 1.5 }}
              >
                Place Order
              </Button>
              <Divider />
              <OrderSummary cart={cart}>
                <OrderSummary.Total />
              </OrderSummary>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default CheckoutPage;
