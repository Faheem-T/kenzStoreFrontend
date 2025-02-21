import {
  useAdminApproveOrderReturnMutation,
  useAdminChangeOrderStatusMutation,
  useAdminGetAllOrdersQuery,
  useAdminRejectOrderReturnMutation,
} from "@/app/api/orderApi";
import { LoadingComponent } from "@/app/components/LoadingComponent";
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
  Typography,
} from "@mui/material";
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
              <TableHead>Order Amount (₹)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <OrderRow order={order} key={order._id} />
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
