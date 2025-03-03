import relativeTime from "dayjs/plugin/relativeTime";
import { Box, Tooltip, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetWalletQuery } from "../api/walletApi";
import { LoadingComponent } from "../components/LoadingComponent";
import dayjs from "dayjs";
import { useState } from "react";
import { Paginator } from "../components/Pagination";

export const WalletPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetWalletQuery({ page });
  dayjs.extend(relativeTime);
  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Couldn't fetch wallet</Box>;
  const { balance } = data.data;
  const totalPages = data.totalPages;
  let history = data.data.history
    .slice()
    .sort((a, b) => dayjs(b.timestamp).diff(dayjs(a.timestamp)));

  const WalletHistorySection = () => (
    <Box sx={{}}>
      <Box component={Table} sx={{ maxWidth: "32rem", mx: "auto" }}>
        <TableCaption>Wallet History</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Amount</TableHead>
            <TableHead>Transaction Type</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item) => (
            <Tooltip title={item.notes} key={item._id}>
              <TableRow key={item._id}>
                <TableCell
                  className={
                    item.amount > 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {item.amount}
                </TableCell>
                <Typography component={TableCell} textTransform="capitalize">
                  {item.logType}
                </Typography>
                <Typography component={TableCell} variant="caption">
                  {dayjs(item.timestamp).fromNow()}
                </Typography>
              </TableRow>
            </Tooltip>
          ))}
        </TableBody>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography variant="h5">Your wallet</Typography>
      <Box
        sx={{
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
          mx: "auto",
          mt: 4,
          mb: 8,
        }}
      >
        <Typography variant="h5">Wallet Balance:</Typography>
        <Typography variant="h4" sx={{ m: 4 }}>
          ₹ {Math.floor(balance * 100) / 100} /-
        </Typography>
      </Box>
      <WalletHistorySection />
      <Paginator
        currentPage={page}
        setPage={setPage}
        totalPages={totalPages}
        disabled={isFetching || isLoading}
      />
    </Box>
  );
};
