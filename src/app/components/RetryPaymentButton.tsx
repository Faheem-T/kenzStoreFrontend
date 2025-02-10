import { Typography } from "@mui/material";
import { useRetryPaymentMutation } from "../api/orderApi";
import toast from "react-hot-toast";
import { displayRazorpay } from "../utils/razorpayUtils";
import { useState } from "react";

export const RetryPaymentButton = ({ orderId }: { orderId: string }) => {
  const [retryPayment, { isLoading }] = useRetryPaymentMutation();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const handleRetryClick = async () => {
    if (isLoading || paymentLoading) return;
    try {
      setPaymentLoading(true);
      const data = await retryPayment({ orderId }).unwrap();
      const { razorpayOrder } = data.data;
      const { amount, currency, id } = razorpayOrder;
      await displayRazorpay({ amount, currency, id, orderId });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        toast.error(error.message);
      } else {
        toast.error("That did not quite work");
      }
      console.log(error);
    }
    setPaymentLoading(false);
  };
  return (
    <Typography
      variant="caption"
      sx={{
        "&:hover": {
          textDecoration: "underline",
          cursor: "pointer",
        },
      }}
      onClick={handleRetryClick}
      color={isLoading || paymentLoading ? "textDisabled" : ""}
    >
      {isLoading || paymentLoading ? "Please wait..." : "Retry payment?"}
    </Typography>
  );
};
