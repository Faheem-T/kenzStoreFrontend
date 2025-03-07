import relativeTime from "dayjs/plugin/relativeTime";
import {
  useAdminApproveOrderReturnMutation,
  useAdminChangeOrderStatusMutation,
  useAdminGetAllOrdersQuery,
  useAdminRejectOrderReturnMutation,
} from "@/app/api/orderApi";
import LoadingComponent from "@/app/components/LoadingComponent";
import { Paginator } from "@/app/components/Pagination";
import { GetUserOrder, OrderStatus, orderStatuses } from "@/app/types/order";
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
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import toast from "react-hot-toast";

dayjs.extend(relativeTime);
const AdminOrderOverviewPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useAdminGetAllOrdersQuery({ page });
  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Orders not found</Box>;
  const orders = data.data;
  const totalPages = data.totalPages;
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
        <Box component={Table} sx={{ opacity: isFetching ? "60%" : "100%" }}>
          <TableCaption>Overview of all past orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Updated</TableHead>
              <TableHead>Ordered</TableHead>
              <TableHead>Order Amount (₹)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <OrderRow order={order} key={order._id} />
            ))}
          </TableBody>
        </Box>
        <Stack sx={{ my: 2 }}>
          <Paginator
            currentPage={page}
            setPage={setPage}
            disabled={isFetching || isLoading}
            totalPages={totalPages}
          />
        </Stack>
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
  const createdAt = dayjs(order.createdAt).format("D MMM YYYY HH:MM A");
  const updatedAt = dayjs(order.updatedAt).format("D MMM YYYY HH:MM A");

  const createdAtFromNow = dayjs(order.createdAt).fromNow();
  const updatedAtFromNow = dayjs(order.updatedAt).fromNow();

  return (
    <TableRow className={cn(isLoading ? "opacity-80 bg-white" : "")}>
      <Tooltip title={updatedAt}>
        <TableCell>{updatedAtFromNow}</TableCell>
      </Tooltip>
      <Tooltip title={createdAt}>
        <TableCell>{createdAtFromNow}</TableCell>
      </Tooltip>
      <TableCell>{order.totalPrice}</TableCell>
      <TableCell>
        {order.status === "requesting return" ? (
          <ReturnRequestButtons
            orderId={order._id}
            orderStatus={order.status}
          />
        ) : (
          <Select
            value={order.status}
            size="small"
            onChange={handleStatusChange}
            disabled={isLoading}
            sx={{ textTransform: "capitalize" }}
          >
            {/* <MenuItem color="blue" value="pending">
            Pending
          </MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="payment incomplete">Payment Incomplete</MenuItem> */}
            {...orderStatuses.map((status) => (
              <MenuItem
                key={status}
                value={status}
                sx={{ textTransform: "capitalize" }}
              >
                {status}
              </MenuItem>
            ))}
          </Select>
        )}
      </TableCell>
    </TableRow>
  );
};

export const ReturnRequestButtons = ({
  orderId,
  orderStatus,
}: {
  orderStatus: string;
  orderId: string;
}) => {
  const [approveReturn, { isLoading: loadingApprove }] =
    useAdminApproveOrderReturnMutation();
  const [rejectReturn, { isLoading: loadingReject }] =
    useAdminRejectOrderReturnMutation();
  return (
    <Box>
      <Typography variant="caption" textTransform={"capitalize"}>
        {orderStatus}
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          color="success"
          variant="outlined"
          disabled={loadingApprove || loadingReject}
          onClick={async () => {
            try {
              const data = await approveReturn({ orderId });
              if (data.data) toast.success(data.data.message);
            } catch (error) {
              toast.error("That did not work.");
              console.log(error);
            }
          }}
        >
          Approve
        </Button>
        <Button
          color="error"
          variant="outlined"
          disabled={loadingApprove || loadingReject}
          onClick={async () => {
            try {
              const data = await rejectReturn({ orderId });
              if (data.data) toast.success(data.data.message);
            } catch (error) {
              toast.error("That did not work.");
              console.log(error);
            }
          }}
        >
          Reject
        </Button>
      </Box>
    </Box>
  );
};
export default AdminOrderOverviewPage;
