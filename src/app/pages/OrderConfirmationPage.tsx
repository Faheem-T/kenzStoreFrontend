import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router";
import { Navbar } from "../components/Navbar";

const OrderConfirmationPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Handle potential undefined state with fallback
  const location = useLocation();
  const { orderId, error = false } =
    (location.state as { orderId?: string; error?: boolean }) || {};

  if (!orderId) {
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
            height: "70vh",
            px: { xs: 2, sm: 4 },
          }}
        >
          <Typography variant={isMobile ? "h5" : "h4"} textAlign="center">
            Order ID not found
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            size={isMobile ? "medium" : "large"}
          >
            Return to Home
          </Button>
        </Box>
      </>
    );
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
          gap: { xs: 3, md: 4 },
          minHeight: { xs: "80vh", md: "90vh" },
          px: { xs: 2, sm: 4 },
          py: { xs: 4, sm: 0 },
          textAlign: "center",
        }}
      >
        {/* Success/Error Icon could be added here */}
        <Box
          sx={{
            width: { xs: "80px", sm: "100px", md: "120px" },
            height: { xs: "80px", sm: "100px", md: "120px" },
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: error ? "error.light" : "success.main",
            color: "white",
            fontSize: { xs: "40px", sm: "50px", md: "60px" },
          }}
        >
          {error ? "✕" : "✓"}
        </Box>

        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{
            maxWidth: { xs: "100%", sm: "80%", md: "60%" },
            fontWeight: "medium",
          }}
        >
          {error
            ? "There was an error during payment"
            : "Your order has been placed successfully!"}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Order ID:
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            sx={{
              fontFamily: "monospace",
              backgroundColor: "background.paper",
              p: { xs: 1, sm: 2 },
              borderRadius: 1,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            {orderId}
          </Typography>
        </Box>

        <Button
          component={Link}
          to={error ? "/user/orders" : "/"}
          variant="contained"
          size={isMobile ? "medium" : "large"}
          sx={{
            mt: { xs: 2, md: 4 },
            minWidth: { xs: "200px", md: "220px" },
          }}
        >
          {error ? "Retry payment on orders page" : "Continue Shopping"}
        </Button>
      </Box>
    </>
  );
};

export default OrderConfirmationPage;
