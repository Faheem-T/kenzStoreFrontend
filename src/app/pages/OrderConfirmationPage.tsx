import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";
import { Navbar } from "../components/Navbar";

export const OrderConfirmationPage = () => {
  const { orderId, error = false } = useLocation().state as {
    orderId: string;
    error?: boolean;
  };

  if (!orderId) {
    return <Box>Order ID not found</Box>;
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          height: "90vh",
        }}
      >
        <Typography variant="h4">
          {error
            ? "There was an error during payment"
            : "Your order has been placed successfully!"}
        </Typography>
        <Typography variant="caption">Order ID: {orderId}</Typography>
        <Typography
          sx={{
            "&:hover": { textDecoration: "underline" },
            fontWeight: "bold",
          }}
        >
          {error ? (
            <Link to="/user/orders">Retry payment on orders page</Link>
          ) : (
            <Link to="/">Continue Shopping</Link>
          )}
        </Typography>
      </Box>
    </>
  );
};
