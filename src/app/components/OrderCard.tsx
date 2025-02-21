import {
  Box,
  Button,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { GetUserOrder, OrderStatus, PaymentStatus } from "../types/order";
import {
  useCancelOrderMutation,
  useRequestOrderReturnMutation,
} from "../api/orderApi";
import toast from "react-hot-toast";
import { RetryPaymentButton } from "./RetryPaymentButton";
import { InvoiceDocument } from "../utils/invoicePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

export const OrderCard = ({ order }: { order: GetUserOrder }) => {
  const OrderTotal = () => (
    <Box>
      <Typography variant="caption" color="textDisabled">
        Order Total:
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        ₹ {order.totalPrice} /-
      </Typography>
    </Box>
  );

  const OrderPriceBreakup = () => (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}
    >
      <Typography variant="caption">
        Order Amount:{" "}
        <Typography variant="caption" fontWeight={700} component="span">
          {order.originalPrice} ₹
        </Typography>
      </Typography>
      <Typography variant="caption">
        Coupon Discount:{" "}
        <Typography variant="caption" fontWeight={700} component="span">
          {(order.totalPrice - order.originalPrice).toFixed(2)} ₹ (
          {-order.discountValue}
          {order.discountType === "percentage" ? "%" : "₹"})
        </Typography>
      </Typography>
      <Typography variant="caption">
        Final Price:{" "}
        <Typography variant="caption" fontWeight={700} component="span">
          {order.totalPrice} ₹
        </Typography>
      </Typography>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.paper",
          p: 4,
          gap: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            "& > *": {
              py: 1,
              px: 3,
              backgroundColor: "background.default",
              boxShadow: 1,
              borderRadius: 1,
            },
          }}
        >
          <OrderTotal />
          <Box>
            <Typography variant="caption" color="textDisabled">
              Ordered On:
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {new Date(order.createdAt).toDateString()}
            </Typography>
          </Box>
          {order.cancelledAt && (
            <Box>
              <Typography variant="caption" color="textDisabled">
                Cancelled On:
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {new Date(order.cancelledAt).toDateString()}
              </Typography>
            </Box>
          )}
          <Box>
            <Typography variant="caption" color="textDisabled">
              Payment Method:
            </Typography>
            <Typography
              sx={{ textTransform: "capitalize", fontWeight: "bold" }}
            >
              {order.paymentMethod}
            </Typography>
          </Box>
          <Box
            sx={{
              ml: "auto",
            }}
          >
            <Typography variant="caption" color="textDisabled">
              Payment Status:
            </Typography>
            <Typography
              color={statusColor(order.paymentStatus)}
              sx={{ textTransform: "capitalize", fontWeight: "bold" }}
            >
              {order.paymentStatus}
            </Typography>
            {order.paymentStatus === "incomplete" &&
              order.paymentMethod === "online" &&
              order.status !== "cancelled" &&
              order.status !== "completed" && (
                <RetryPaymentButton orderId={order._id} />
              )}
          </Box>
          <Box>
            <Typography variant="caption" color="textDisabled">
              Order Status:
            </Typography>
            <Typography
              color={statusColor(order.status)}
              sx={{ textTransform: "capitalize", fontWeight: "bold" }}
            >
              {order.status}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Stack gap={4}>
            {order.items.map((item) => (
              <Box
                key={item._id}
                sx={{ display: "flex", alignItems: "center", gap: 3 }}
              >
                <Box sx={{ flex: 0.3 }}>
                  <img src={item.productId.images[0]} width="100%" />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography>{item.productId.name}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                  <Typography fontWeight="bold">₹ {item.price} /-</Typography>
                </Box>
              </Box>
            ))}
          </Stack>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {order.status === "pending" && (
              <CancelOrderButton orderId={order._id} />
            )}
            {order.status === "completed" && (
              <ReturnOrderButton orderId={order._id} />
            )}
            {order.status === "completed" && order.paymentStatus === "paid" && (
              <Box sx={{ mt: "auto" }}>
                <PDFDownloadLink
                  document={<InvoiceDocument order={order} />}
                  fileName={`invoice ${order._id}.pdf`}
                  style={{ fontSize: ".8rem" }}
                >
                  {({ blob: _blob, url: _url, loading, error: _error }) =>
                    loading ? "Loading invoice..." : "Download invoice"
                  }
                </PDFDownloadLink>
              </Box>
            )}
          </Box>
        </Box>
        <Divider />
        <OrderPriceBreakup />
      </Box>
    </>
  );
};

export const statusColor = (status: OrderStatus | PaymentStatus): string => {
  switch (status) {
    // order related
    case "pending":
      return "warning";
    case "completed":
      return "success";
    case "cancelled":
      return "error";
    // payment related
    case "paid":
      return "success";
    case "incomplete":
      return "error";
    case "refunded":
      return "success";
    default:
      return "warning";
  }
};

const CancelOrderButton = ({ orderId }: { orderId: string }) => {
  const [cancelOrder, { isLoading }] = useCancelOrderMutation();
  const handleCancleClick = async () => {
    try {
      const data = await cancelOrder({ orderId }).unwrap();
      if (data) toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("That did not work...");
    }
  };
  return (
    <Button onClick={handleCancleClick} disabled={isLoading} variant="outlined">
      {isLoading ? "Canceling..." : "Cancel Order"}
    </Button>
  );
};

const ReturnOrderButton = ({ orderId }: { orderId: string }) => {
  const [returnOrder, { isLoading }] = useRequestOrderReturnMutation();
  const handleReturnClick = async () => {
    try {
      const data = await returnOrder({ orderId }).unwrap();
      if (data) toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("That did not work...");
    }
  };
  return (
    <>
      <Button
        onClick={handleReturnClick}
        disabled={isLoading}
        variant="outlined"
      >
        {isLoading ? "Requesting return..." : "Return Order"}
      </Button>
    </>
  );
};
