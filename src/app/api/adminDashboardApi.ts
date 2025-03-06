import { api } from "../api";
import { BaseResponse } from "../types/apiResponseTypes";
import { OrderType } from "../types/order";

// SHARED
export const timeframes = ["day", "month", "year"] as const;
export type Timeframe = (typeof timeframes)[number];
// SHARED TYPE
export type SalesReportBody = BaseResponse<{
  orders: (Pick<
    OrderType,
    | "_id"
    | "userId"
    | "items"
    | "coupon"
    | "discountType"
    | "discountValue"
    | "paymentMethod"
    | "status"
    | "completedAt"
    | "totalPrice"
    | "originalPrice"
  > & { userId: { _id: string; name: string } })[];
  totalSalesCount: number;
  totalSaleAmount: number;
  orderCountByTimeframe: { _id: string; count: number }[];
  topSellingProducts: { _id: string /*ObjectId*/; count: number }[];
  topSellingCategories: { _id: { name: string }; count: number }[];
  topSellingBrands: { _id: string; count: number }[];
}>;

const adminDashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSalesReport: builder.query<
      SalesReportBody,
      { timeframe?: Timeframe; startDate?: string; endDate?: string }
    >({
      query: ({ timeframe, startDate, endDate }) =>
        `v1/admin/dashboard/sales-report?` +
        (timeframe ? `timeframe=${timeframe}` : "") +
        (startDate ? `&startDate=${startDate}` : "") +
        (endDate ? `&endDate=${endDate}` : ""),
    }),
  }),
});

export const { useGetSalesReportQuery } = adminDashboardApi;
