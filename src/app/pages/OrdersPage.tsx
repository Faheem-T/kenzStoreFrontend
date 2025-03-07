import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Container,
  Stack,
  Divider,
} from "@mui/material";
import { useGetUserOrdersQuery } from "../api/orderApi";
import LoadingComponent from "../components/LoadingComponent";
import { OrderCard } from "../components/OrderCard";
import { Package } from "lucide-react";
import { useState } from "react";
import { Paginator } from "../components/Pagination";

const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetUserOrdersQuery({ page });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: { xs: 2, sm: 3, md: 4 },
            mb: 4,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              mb: { xs: 1, sm: 2 },
            }}
          >
            <Package size={isMobile ? 28 : 40} />
            <Typography variant={isMobile ? "h6" : "h5"}>
              Your Orders
            </Typography>
          </Box>

          {/* Top Paginator */}
          {totalPages > 1 && (
            <Paginator
              sx={{
                alignSelf: "center",
                mb: { xs: 1, sm: 2 },
              }}
              currentPage={page}
              setPage={setPage}
              totalPages={totalPages}
              disabled={isFetching || isLoading}
            />
          )}

          {/* Orders List */}
          <Stack
            sx={{
              // display: "flex",
              // flexDirection: "column",
              gap: { xs: 2, md: 3 },
              opacity: isFetching ? "60%" : "100%",
              transition: "opacity 0.3s ease",
            }}
            divider={<Divider />}
          >
            {orders.length === 0 ? (
              <Box
                sx={{
                  py: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography color="textDisabled">
                  No orders found for this page
                </Typography>
              </Box>
            ) : (
              orders.map((order) => <OrderCard order={order} key={order._id} />)
            )}
          </Stack>

          {/* Bottom Paginator */}
          {totalPages > 1 && (
            <Paginator
              sx={{
                alignSelf: "center",
                mt: { xs: 1, sm: 2 },
              }}
              currentPage={page}
              setPage={setPage}
              totalPages={totalPages}
              disabled={isFetching || isLoading}
            />
          )}
        </Box>
      </Container>
    </>
  );
};

export default OrdersPage;
