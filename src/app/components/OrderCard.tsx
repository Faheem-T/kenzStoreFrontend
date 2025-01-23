import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { GetUserOrder, OrderStatus } from "../types/order";
import { useCancelOrderMutation } from "../api/orderApi";
import toast from "react-hot-toast";

export const OrderCard = ({ order }: { order: GetUserOrder }) => {
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
              boxShadow: 3,
              borderRadius: 1,
            },
          }}
        >
          <Box>
            <Typography variant="caption" color="textDisabled">
              Order Total:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              QR {order.totalPrice} /-
            </Typography>
          </Box>
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
          <Box
            sx={{
              ml: "auto",
            }}
          >
            <Typography variant="caption" color="textDisabled">
              Status:
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Box sx={{ flex: 0.3 }}>
                  <img src={item.productId.images[0]} width="100%" />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography>{item.productId.name}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                  <Typography fontWeight="bold">QR {item.price} /-</Typography>
                </Box>
              </Box>
            ))}
          </Stack>
          <Box>
            {order.status === "pending" && (
              <CancelOrderButton orderId={order._id} />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

const statusColor = (status: OrderStatus): string => {
  switch (status) {
    case "pending":
      return "warning";
    case "completed":
      return "success";
    case "cancelled":
      return "error";
    default:
      return "warning";
  }
};

const CancelOrderButton = ({ orderId }: { orderId: string }) => {
  const [cancelOrder, { isLoading }] = useCancelOrderMutation();
  const handleCancleClick = async () => {
    try {
      const data = await cancelOrder({ orderId }).unwrap();
      if (data) toast.success("Order has been cancelled");
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
