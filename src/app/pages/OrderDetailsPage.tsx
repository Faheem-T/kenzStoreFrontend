import { useNavigate, useParams } from "react-router";
import {
  useGetOrderQuery,
  useAdminChangeOrderStatusMutation,
} from "@/app/api/orderApi";
import LoadingComponent from "@/app/components/LoadingComponent";
import {
  OrderDetailsType,
  OrderStatus,
  orderStatuses,
} from "@/app/types/order";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  CalendarToday,
  ChevronLeft,
  LocalShipping,
  Payment,
  Receipt,
  ShoppingBag,
} from "@mui/icons-material";

const OrderStatusChip = ({ status }: { status: OrderStatus }) => {
  // Define color schemes for different statuses
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "warning";
      //   case "PROCESSING":
      //     return "info";
      //   case "":
      //     return "primary";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Chip
      label={status}
      color={getStatusColor(status)}
      sx={{ fontWeight: "bold" }}
    />
  );
};

const OrderDetailsPage = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  if (!orderId) {
    return (
      <Alert severity="error" sx={{ m: 4 }}>
        Order ID not found in URL parameters
      </Alert>
    );
  }

  const { data, isLoading, error } = useGetOrderQuery({ orderId });

  if (isLoading) return <LoadingComponent fullScreen />;

  if (error || !data) {
    return (
      <Alert severity="error" sx={{ m: 4 }}>
        Error loading order details. Order may not exist or there might be a
        connection issue.
      </Alert>
    );
  }

  const order = data.data;
  const createdAt = dayjs(order.createdAt).format("D MMM YYYY HH:mm A");
  const updatedAt = dayjs(order.updatedAt).format("D MMM YYYY HH:mm A");

  return (
    <>
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          maxWidth: "1200px",
          mx: "auto",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            display: { xs: "none", md: "inline" },
            position: "absolute",
            top: 25,
            left: -50,
          }}
          size="large"
        >
          <Tooltip title="Go back">
            <ChevronLeft fontSize="large" />
          </Tooltip>
        </IconButton>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              mb: 2,
            }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
              Order Details
            </Typography>
            <OrderStatusChip status={order.status} />
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Receipt fontSize="small" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Order ID:
                  </Typography>
                  <Typography>{order._id}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarToday fontSize="small" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Placed:
                  </Typography>
                  <Typography>{createdAt}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarToday fontSize="small" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Updated:
                  </Typography>
                  <Typography>{updatedAt}</Typography>
                </Box>

                {order.cancelledAt && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday fontSize="small" color="error" />
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="error.main"
                    >
                      Cancelled:
                    </Typography>
                    <Typography color="error.main">
                      {dayjs(order.cancelledAt).format("D MMM YYYY HH:mm A")}
                    </Typography>
                  </Box>
                )}

                {order.completedAt && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday fontSize="small" color="success" />
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="success.main"
                    >
                      Completed:
                    </Typography>
                    <Typography color="success.main">
                      {dayjs(order.completedAt).format("D MMM YYYY HH:mm A")}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Payment fontSize="small" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Payment Method:
                  </Typography>
                  <Typography>{order.paymentMethod}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Payment fontSize="small" />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Payment Status:
                  </Typography>
                  <Chip
                    label={order.paymentStatus}
                    color={
                      order.paymentStatus === "paid" ? "success" : "warning"
                    }
                    size="small"
                  />
                </Box>

                {order.coupon && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Receipt fontSize="small" />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Coupon Applied:
                    </Typography>
                    <Typography>
                      {order.coupon.name} ({order.coupon.code}) -
                      {order.coupon.discountType === "percentage"
                        ? `${order.coupon.discountValue}%`
                        : `₹${order.coupon.discountValue}`}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <LocalShipping fontSize="small" />
                  Shipping Address
                </Typography>
                <Typography>{order.address.address_line}</Typography>
                <Typography>
                  {order.address.city}, {order.address.state} -{" "}
                  {order.address.pincode}
                </Typography>
                {order.address.landmark && (
                  <Typography>Landmark: {order.address.landmark}</Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
          >
            <ShoppingBag fontSize="small" />
            Order Items
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "action.hover" }}>
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        {item.productId.images &&
                          item.productId.images.length > 0 && (
                            <Box
                              component="img"
                              src={item.productId.images[0]}
                              alt={item.productId.name}
                              sx={{
                                width: 50,
                                height: 50,
                                objectFit: "contain",
                                borderRadius: 1,
                              }}
                            />
                          )}
                        <Box>
                          <Typography variant="body1" fontWeight="medium">
                            {item.productId.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              maxWidth: "300px",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {item.productId.description}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="right">
                      ₹{item.price.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "300px" } }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Original Price:</Typography>
                <Typography>₹{order.originalPrice.toFixed(2)}</Typography>
              </Box>

              {order.discountValue > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Discount:</Typography>
                  <Typography color="error.main">
                    -₹{(order.originalPrice - order.totalPrice).toFixed(2)}
                  </Typography>
                </Box>
              )}

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Total:
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  ₹{order.totalPrice.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {isAdmin && <AdminActions order={order} />}
      </Box>
    </>
  );
};

const AdminActions = ({ order }: { order: OrderDetailsType }) => {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [changeStatus, { isLoading }] = useAdminChangeOrderStatusMutation();

  const handleStatusChange = async (e: SelectChangeEvent) => {
    const newStatus = e.target.value as OrderStatus;
    setStatus(newStatus);

    try {
      const data = await changeStatus({
        orderId: order._id,
        status: newStatus,
      }).unwrap();

      if (data) {
        toast.success(`Order status changed to ${newStatus}`);
      }
    } catch (error) {
      toast.error("Failed to update order status");
      setStatus(order.status); // Revert to original state on error
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
        Admin Actions
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Change Order Status:
            </Typography>
            <Select
              value={status}
              size="small"
              onChange={handleStatusChange}
              disabled={isLoading}
              fullWidth
            >
              {orderStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              height: "100%",
              alignItems: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              color="error"
              disabled={
                order.status === "cancelled" ||
                order.status === "completed" ||
                isLoading
              }
              onClick={() =>
                handleStatusChange({
                  target: { value: "cancelled" },
                } as SelectChangeEvent)
              }
            >
              Cancel Order
            </Button>

            <Button
              variant="contained"
              color="success"
              disabled={order.status === "completed" || isLoading}
              onClick={() =>
                handleStatusChange({
                  target: { value: "completed" },
                } as SelectChangeEvent)
              }
            >
              Mark as Completed
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OrderDetailsPage;
