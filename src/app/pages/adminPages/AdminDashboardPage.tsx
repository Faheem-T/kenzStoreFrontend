import {
  Timeframe,
  timeframes,
  useGetSalesReportQuery,
} from "@/app/api/adminDashboardApi";
import { AdminProductCard } from "@/app/components/AdminProductCard";
import { LoadingComponent } from "@/app/components/LoadingComponent";
import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useState } from "react";

export const AdminDashboardPage = () => {
  const [sTimeframe, setSTimeframe] = useState<Timeframe>("day");
  const [dates, setDates] = useState<{
    startDate: undefined | Date;
    endDate: undefined | Date;
  }>({
    startDate: undefined,
    endDate: undefined,
  });
  const { data, isLoading: salesReportLoading } = useGetSalesReportQuery({
    timeframe: sTimeframe,
    startDate: dates.startDate ? dates.startDate.toString() : undefined,
    endDate: dates.endDate ? dates.endDate.toString() : undefined,
  });

  if (salesReportLoading) {
    return <LoadingComponent fullScreen />;
  }
  if (!data) {
    return <Box>Couldn't fetch sales report</Box>;
  }
  const salesReport = data.data;
  const {
    orderCountByTimeframe,
    totalSaleAmount,
    totalSalesCount,
    topSellingProducts,
    topSellingCategories,
    topSellingBrands,
  } = salesReport;
  const salesCount = [];
  const salesLabel = [];

  for (let i = 0; i < orderCountByTimeframe.length; i++) {
    salesCount.push(orderCountByTimeframe[i].count);
    salesLabel.push(orderCountByTimeframe[i]._id);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 4,
        width: 1,
      }}
    >
      <Typography variant="h5">Dashboard</Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 4,
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Typography variant="caption">Total Sales Count:</Typography>
          <Typography variant="h4">{totalSalesCount}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 4,
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Typography variant="caption">Total Sales Amount:</Typography>
          <Typography variant="h4">
            QR {Math.round(totalSaleAmount * 100) / 100} /-
          </Typography>
        </Box>
      </Box>
      <SalesCountChart
        dates={dates}
        setDates={setDates}
        salesCount={salesCount}
        salesLabel={salesLabel}
        sTimeframe={sTimeframe}
        setSTimeframe={setSTimeframe}
      />
      <TopSellingProductsSection products={topSellingProducts} />
      <TopSellingCategoriesSection categories={topSellingCategories} />
      <TopSellingBrandsSection brands={topSellingBrands} />
    </Box>
  );
};

const SalesCountChart = ({
  dates,
  setDates,
  salesCount,
  salesLabel,
  sTimeframe,
  setSTimeframe,
}: {
  dates: { startDate: undefined | Date; endDate: undefined | Date };
  setDates: React.Dispatch<
    React.SetStateAction<{
      startDate: undefined | Date;
      endDate: undefined | Date;
    }>
  >;
  salesCount: number[];
  salesLabel: string[];
  sTimeframe: string;
  setSTimeframe: React.Dispatch<React.SetStateAction<Timeframe>>;
}) => {
  const { endDate, startDate } = dates;
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography variant="h6" sx={{ alignSelf: "center", mx: "auto" }}>
          Sales Count
        </Typography>
        <FormControl>
          <FormHelperText>Chart view</FormHelperText>
          <Select
            value={sTimeframe}
            onChange={(e) => setSTimeframe(e.target.value as Timeframe)}
            variant="standard"
            label="something"
          >
            {timeframes.map((timeframe) => (
              <MenuItem
                key={timeframe}
                value={timeframe}
                selected={timeframe === timeframe}
              >
                <Typography sx={{ textTransform: "capitalize" }}>
                  {timeframe}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: "70%", mx: "auto" }}>
        <LineChart
          height={500}
          series={[{ data: salesCount }]}
          xAxis={[{ scaleType: "point", data: salesLabel }]}
          colors={["white"]}
          grid={{ vertical: true, horizontal: true }}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
        {/* <Typography>Start Date</Typography> */}
        <DatePicker
          label="Start Date"
          value={startDate ? dayjs(startDate) : null}
          onChange={(value) => {
            setDates((prev) => ({ ...prev, startDate: value?.toDate() }));
          }}
        />
        <DatePicker
          label="End Date"
          value={endDate ? dayjs(endDate) : null}
          onChange={(value) => {
            setDates((prev) => ({ ...prev, endDate: value?.toDate() }));
          }}
        />
      </Box>
    </Box>
  );
};

const TopSellingProductsSection = ({
  products,
}: {
  products: { _id: string; count: number }[];
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Top Selling Products</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {...products.map((product) => (
          <AdminProductCard
            key={product._id}
            _id={product._id}
            saleCount={product.count}
          />
        ))}
      </Box>
    </Box>
  );
};

const TopSellingCategoriesSection = ({
  categories,
}: {
  categories: { _id: { name: string }; count: number }[];
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Top Selling Categories</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {categories.map((category) => (
          <Box
            key={category._id.name}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "15rem",
              gap: 1,
              bgcolor: "background.paper",
              p: 4,
            }}
          >
            <Typography variant="h5">{category._id.name}</Typography>
            <Typography variant="caption">{category.count} sales</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const TopSellingBrandsSection = ({
  brands,
}: {
  brands: { _id: string; count: number }[];
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Top Selling Brands</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {brands.map((brand) => (
          <Box
            key={brand._id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "15rem",
              gap: 1,
              bgcolor: "background.paper",
              p: 4,
            }}
          >
            <Typography variant="h5">{brand._id}</Typography>
            <Typography variant="caption">{brand.count} sales</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
