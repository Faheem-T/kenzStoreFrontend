import {
  useAdminChangeOrderStatusMutation,
  useAdminGetAllOrdersQuery,
} from "@/app/api/orderApi";
import { LoadingComponent } from "@/app/components/LoadingComponent";
import { statusColor } from "@/app/components/OrderCard";
import { GetUserOrder, OrderStatus } from "@/app/types/order";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

export const AdminOrderOverviewPage = () => {
  const { data, isLoading } = useAdminGetAllOrdersQuery();
  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Orders not found</Box>;
  const orders = data.data;
  return (
    <>
      <Box sx={{ width: "100%", px: 12 }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ textTransform: "uppercase" }}
          >
            Orders Overview
          </Typography>
        </Box>
        <Table>
          <TableCaption>Overview of all past orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Ordered At</TableHead>
              <TableHead>Order Amount (QR)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <OrderRow order={order} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

const OrderRow = ({ order }: { order: GetUserOrder }) => {
  //   const [status, setStatus] = useState<OrderStatus>(order.status);
  const [changeStatus, { isLoading }] = useAdminChangeOrderStatusMutation();

  const handleStatusChange = async (e: SelectChangeEvent) => {
    const newStatus = e.target.value as OrderStatus;
    try {
      const data = await changeStatus({
        orderId: order._id,
        status: newStatus,
      }).unwrap();
      if (data) {
        toast.success("Order status changed");
      }
    } catch (error) {
      toast.error("That did not quite work...");
      console.log(error);
    }
  };

  return (
    <TableRow className={cn(isLoading ? "opacity-80 bg-white" : "")}>
      <TableCell>{new Date(order.createdAt).toDateString()}</TableCell>
      <TableCell>{order.totalPrice}</TableCell>
      <TableCell>
        <Select
          value={order.status}
          size="small"
          onChange={handleStatusChange}
          disabled={isLoading}
          sx={{ textEmphasisColor: statusColor(order.status) }}
        >
          <MenuItem color="blue" value="pending">
            Pending
          </MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </TableCell>
    </TableRow>
  );
};
