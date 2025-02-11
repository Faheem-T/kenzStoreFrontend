import { Box, Typography } from "@mui/material";
import { useGetUserOrdersQuery } from "../api/orderApi";
import { LoadingComponent } from "../components/LoadingComponent";
import { OrderCard } from "../components/OrderCard";
import { Package } from "lucide-react";

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
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Package size={40} />
          <Typography variant="h5">Your Orders</Typography>
        </Box>
        {orders.map((order) => (
          <OrderCard order={order} key={order._id} />
        ))}
      </Box>
    </>
  );
};
