import relativeTime from "dayjs/plugin/relativeTime";
import {
  SalesReportBody,
  Timeframe,
  timeframes,
  useGetSalesReportQuery,
} from "@/app/api/adminDashboardApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminProductCard } from "@/app/components/AdminProductCard";
import { LoadingComponent } from "@/app/components/LoadingComponent";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { SalesReportPDF } from "@/app/utils/SalesReportPDF";
import { SalesReportCSV } from "@/app/utils/SalesReportCSV";

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
  // const [dateRange, setDateRange] = useState();

  if (salesReportLoading) {
    return <LoadingComponent fullScreen />;
  }
  if (!data) {
    return <Box>Couldn't fetch sales report</Box>;
  }
  const salesReport = data.data;
  const {
    orders,
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
      <DateRangeSelect dates={dates} setDates={setDates} />

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
            ₹ {Math.round(totalSaleAmount * 100) / 100} /-
          </Typography>
        </Box>
      </Box>
      <SalesCountChart
        // dates={dates}
        // setDates={setDates}
        salesCount={salesCount}
        salesLabel={salesLabel}
        sTimeframe={sTimeframe}
        setSTimeframe={setSTimeframe}
      />
      <TopSellingProductsSection products={topSellingProducts} />
      <TopSellingCategoriesSection categories={topSellingCategories} />
      <TopSellingBrandsSection brands={topSellingBrands} />
      <RecentOrders orders={orders} />
      <ReportDownloadButton salesReport={salesReport} />
    </Box>
  );
};

const RecentOrders = ({
  orders,
}: {
  orders: SalesReportBody["data"]["orders"];
}) => {
  dayjs.extend(relativeTime);
  return (
    <>
      <Typography variant="h6">Recent Orders</Typography>

      <Table>
        <TableCaption>Recent Orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Price (₹)</TableHead>
            <TableHead>Original Price (₹)</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order.userId?.firstName ?? ""}</TableCell>
              <TableCell>{order.totalPrice}</TableCell>
              {order.discountValue && order.discountType ? (
                <TableCell>
                  {order.originalPrice}
                  <Typography
                    component="span"
                    variant="caption"
                    color="textDisabled"
                  >
                    {" -" +
                      order.discountValue +
                      (order.discountType === "percentage" ? "%" : "₹")}
                  </Typography>
                </TableCell>
              ) : (
                <TableCell>-</TableCell>
              )}
              <TableCell>
                <Typography variant="caption" color="textDisabled">
                  {dayjs(order.completedAt).fromNow()}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

const DateRangeSelect = ({
  dates,
  setDates,
}: {
  dates: { startDate: Date | undefined; endDate: Date | undefined };
  setDates: React.Dispatch<
    React.SetStateAction<{
      startDate: undefined | Date;
      endDate: undefined | Date;
    }>
  >;
}) => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  interface DateRangeMapType {
    label: string;
    dates: {
      startDate: Date | undefined;
      endDate: Date | undefined;
    };
  }
  const dateRangeMap: DateRangeMapType[] = [
    {
      label: "This month",
      dates: {
        startDate: new Date(y, m, 1),
        endDate: new Date(y, m + 1, 0),
      },
    },
    {
      label: "This year",
      dates: {
        startDate: new Date(y, 0, 1),
        endDate: new Date(y + 1, 0, 0),
      },
    },
    {
      label: "Custom",
      dates: {
        startDate: undefined,
        endDate: new Date(y, m + 1, 0),
      },
    },
    {
      label: "All Time",
      dates: {
        startDate: undefined,
        endDate: undefined,
      },
    },
  ];

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const label = e.target.value;
    const foundDateRange = dateRangeMap.find((d) => d.label === label);
    if (foundDateRange) {
      setDates(foundDateRange.dates);
    }
  };

  let selected = dateRangeMap.find(
    (d) =>
      d.dates.startDate?.getTime() === dates.startDate?.getTime() &&
      d.dates.endDate?.getTime() === dates.endDate?.getTime()
  )?.label;
  return (
    <>
      <Select value={selected ?? "Custom"} onChange={handleSelectChange}>
        {...dateRangeMap.map((d) => (
          <MenuItem value={d.label} key={d.label}>
            {d.label}
          </MenuItem>
        ))}
      </Select>
      {(selected === "Custom" || selected === undefined) && (
        /* Date picker  */
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          <DatePicker
            label="Start Date"
            value={dates.startDate ? dayjs(dates.startDate) : null}
            onChange={(value) => {
              setDates((prev) => ({ ...prev, startDate: value?.toDate() }));
            }}
          />
          <DatePicker
            label="End Date"
            value={dates.endDate ? dayjs(dates.endDate) : null}
            onChange={(value) => {
              setDates((prev) => ({ ...prev, endDate: value?.toDate() }));
            }}
          />
        </Box>
      )}
    </>
  );
};

const SalesCountChart = ({
  salesCount,
  salesLabel,
  sTimeframe,
  setSTimeframe,
}: {
  salesCount: number[];
  salesLabel: string[];
  sTimeframe: string;
  setSTimeframe: React.Dispatch<React.SetStateAction<Timeframe>>;
}) => {
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
          colors={["black"]}
          grid={{ vertical: true, horizontal: true }}
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

const ReportDownloadButton = ({
  salesReport,
}: {
  salesReport: SalesReportBody["data"];
}) => {
  const [visible, setVisible] = useState(false);
  const [pdfVisible, setPdfVisible] = useState(false);

  return (
    <>
      {visible ? (
        <>
          <Box sx={{ display: "flex", gap: 2 }}>
            <PDFDownloadLink document={<SalesReportPDF data={salesReport} />}>
              {({ blob: _blob, url: _url, loading, error: _error }) =>
                loading ? (
                  <Typography color="textDisabled">
                    "Loading report..."
                  </Typography>
                ) : (
                  <Button variant="contained"> Download PDF</Button>
                )
              }
            </PDFDownloadLink>
            <SalesReportCSV body={salesReport} />
            <Button variant="outlined" onClick={() => setVisible(false)}>
              Cancel
            </Button>
          </Box>
          {pdfVisible ? (
            <>
              <Button onClick={() => setPdfVisible(false)}>Hide Preview</Button>
              <PDFViewer width="70%" height="800px">
                <SalesReportPDF data={salesReport} />
              </PDFViewer>
            </>
          ) : (
            <Button onClick={() => setPdfVisible(true)}>
              Show PDF Preview
            </Button>
          )}
        </>
      ) : (
        <Button onClick={() => setVisible(true)} variant="contained">
          Generate Sales Report Download
        </Button>
      )}
    </>
  );
};
