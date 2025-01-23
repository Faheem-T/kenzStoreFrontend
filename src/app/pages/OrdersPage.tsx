import { Box, Typography } from "@mui/material";
import { useGetUserOrdersQuery } from "../api/orderApi";
import { LoadingComponent } from "../components/LoadingComponent";
import { OrderCard } from "../components/OrderCard";

export const OrdersPage = () => {
  const { data, isLoading } = useGetUserOrdersQuery();
  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data)
    return (
      <Box
        sx={{
          height: "90vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="textDisabled">
          You do not have any past orders
        </Typography>
      </Box>
    );

  const orders = data.data;

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}>
        <Typography variant="h4">Your Orders</Typography>
        {orders.map((order) => (
          <OrderCard order={order} />
        ))}
      </Box>
    </>
  );
};
