import { Box, Button, Typography } from "@mui/material";
import { CheckoutAddressSelectionSection } from "./pageSections/CheckoutAddressSelectionSection";
import { useState } from "react";
import { usePlaceOrderMutation } from "../api/orderApi";
import { useGetCartQuery } from "../api/cartApi";
import { LoadingComponent } from "../components/LoadingComponent";
import { PaymentMethod } from "../types/order";
import { CheckoutPaymentSection } from "./pageSections/CheckoutPaymentSection";

export const CheckoutPage = () => {
  const [addressId, setAddressId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
  const { data, isLoading: isCartLoading } = useGetCartQuery();
  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();

  if (isCartLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Couldn't fetch cart</Box>;
  const cartId = data.data._id;

  const handleOrderPlacement = async () => {
    await placeOrder({ addressId, paymentMethod, cartId });
  };

  return (
    <>
      <Box
        sx={{ pt: 4, px: 16, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h4" textAlign="center" sx={{ mb: 4 }}>
          Checkout
        </Typography>
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
        {/* Place Order Button */}
        <Button
          onClick={handleOrderPlacement}
          disabled={isPlacingOrder}
          variant="contained"
        >
          Place Order
        </Button>
      </Box>
    </>
  );
};
