import { Button } from "@mui/material";
import { SalesReportBody } from "../api/adminDashboardApi";
import { CSVLink } from "react-csv";

export const SalesReportCSV = ({ body }: { body: SalesReportBody["data"] }) => {
  const {
    // orderCountByTimeframe,
    orders,
    topSellingBrands,
    topSellingCategories,
    topSellingProducts,
    totalSaleAmount,
    totalSalesCount,
  } = body;
  //   const headers = ["Total Sales", "Total Orders"];
  const orderHeaders = [
    "User",
    "Total Price",
    "Original Price",
    "Discount",
    "Coupon ID",
    "Payment Method",
    "Order Status",
    "Date Completed At",
    "Order ID",
  ];
  const orderRows = orders.map((order) => {
    const {
      _id,
      totalPrice,
      originalPrice,
      discountType,
      discountValue,
      coupon,
      //   items,
      paymentMethod,
      status,
      userId,
      completedAt,
    } = order;
    return [
      userId?.name ?? "",
      totalPrice,
      originalPrice,
      `-${
        discountValue +
        (discountType && discountType === "percentage" ? "%" : "₹")
      }`,
      coupon,
      paymentMethod,
      status,
      completedAt,
      _id,
    ];
  });
  const data = [
    ["Total Sales", "Total Orders"],
    [totalSaleAmount, totalSalesCount],
    [],
    ["Orders"],
    orderHeaders,
    ...orderRows,
    [],
    ["Top Selling Brands"],
    ["Brand Name", "Sale Count"],
    ...topSellingBrands.map((brand) => [brand._id, brand.count]),
    [],
    ["Top Selling Categories"],
    ["Category Name", "Sale Count"],
    ...topSellingCategories.map((category) => [
      category._id.name,
      category.count,
    ]),
    [],
    ["Top Selling Products"],
    ["Product ID", "Sale Count"],
    ...topSellingProducts.map((product) => [product._id, product.count]),
  ];
  return (
    <Button
      variant="contained"
      component={CSVLink}
      data={data}
      filename="kenzStoreSalesReport"
    >
      Download csv
    </Button>
  );
};
