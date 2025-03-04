import { Box, Typography } from "@mui/material";
import { useGetUserOrdersQuery } from "../api/orderApi";
import LoadingComponent from "../components/LoadingComponent";
import { OrderCard } from "../components/OrderCard";
import { Package } from "lucide-react";
import { useState } from "react";
import { Paginator } from "../components/Pagination";

const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetUserOrdersQuery({ page });
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
  const totalPages = data.totalPages;

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Package size={40} />
          <Typography variant="h5">Your Orders</Typography>
        </Box>
        <Paginator
          sx={{ alignSelf: "center" }}
          currentPage={page}
          setPage={setPage}
          totalPages={totalPages}
          disabled={isFetching || isLoading}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            opacity: isFetching ? "60%" : "100%",
          }}
        >
          {orders.map((order) => (
            <OrderCard order={order} key={order._id} />
          ))}
        </Box>
        <Paginator
          sx={{ alignSelf: "center" }}
          currentPage={page}
          setPage={setPage}
          totalPages={totalPages}
          disabled={isFetching || isLoading}
        />
      </Box>
    </>
  );
};
export default OrdersPage;
