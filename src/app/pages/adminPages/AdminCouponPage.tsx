import {
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
} from "@/app/api/couponApi";
import { LoadingComponent } from "@/app/components/LoadingComponent";
import { Box, Button, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router";
import { calculateDaysToToday } from "@/app/utils/dateUtils";

export const AdminCouponPage = () => {
  const { data, isLoading } = useGetAllCouponsQuery();
  const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();
  const navigate = useNavigate();
  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Couldn't fetch coupons</Box>;

  const coupons = data.data;

  const couponRow = coupons.map((coupon) => (
    <TableRow key={coupon._id} className={coupon.isDeleted ? "opacity-50" : ""}>
      <TableCell>{coupon.name}</TableCell>
      <TableCell>{coupon.code}</TableCell>
      <TableCell>
        {coupon.discountValue + coupon.discountType === "percentage"
          ? " %"
          : " QR"}
      </TableCell>
      {coupon.validUntil ? (
        <>
          <TableCell>
            {new Date(coupon.validUntil).toLocaleDateString("en-GB")}
          </TableCell>
          <TableCell>{calculateDaysToToday(coupon.validUntil)}</TableCell>
        </>
      ) : (
        <>
          <TableCell>-</TableCell>
          <TableCell>-</TableCell>
        </>
      )}
      <TableCell>{coupon.limitPerUser}</TableCell>
      <TableCell>{coupon.totalUsedCount}</TableCell>
      <TableCell>
        {coupon.isDeleted ? (
          "Deleted"
        ) : (
          <Button
            onClick={() => deleteCoupon(coupon._id)}
            disabled={isDeleting}
            size="small"
          >
            Delete
          </Button>
        )}
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <Box sx={{ width: "100%", px: 12 }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ textTransform: "uppercase", ml: "auto" }}
          >
            Coupons Overview
          </Typography>
          <Button
            variant="contained"
            sx={{ ml: "auto" }}
            onClick={() => navigate("/admin/coupons/create")}
          >
            Add New Coupon
          </Button>
        </Box>
        <Table>
          <TableCaption>Overview of all coupons in your store</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Days Left</TableHead>
              <TableHead>Limit per user</TableHead>
              <TableHead>Total Used Count</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>{...couponRow}</TableBody>
        </Table>
      </Box>
    </>
  );
};
