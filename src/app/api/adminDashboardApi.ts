import { apiSlice } from "../api";
import { BaseResponse } from "../types/apiResponseTypes";

// SHARED
export const timeframes = ["day", "month", "year"] as const;
export type Timeframe = (typeof timeframes)[number];
type SalesReportBody = BaseResponse<{
  totalSalesCount: number;
  totalSaleAmount: number;
  orderCountByTimeframe: { _id: string; count: number }[];
  topSellingProducts: { _id: string /*ObjectId*/; count: number }[];
}>;

const adminDashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalesReport: builder.query<SalesReportBody, { timeframe?: Timeframe }>({
      query: ({ timeframe }) =>
        `v1/admin/dashboard/sales-report?${
          timeframe ? `timeframe=${timeframe}` : ""
        }`,
    }),
  }),
});

export const { useGetSalesReportQuery } = adminDashboardApi;
