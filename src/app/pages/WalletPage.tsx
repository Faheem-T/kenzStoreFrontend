import { Box, Typography } from "@mui/material";
import { useGetWalletQuery } from "../api/walletApi";
import { LoadingComponent } from "../components/LoadingComponent";

export const WalletPage = () => {
  const { data, isLoading } = useGetWalletQuery();
  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Couldn't fetch wallet</Box>;
  const balance = data.data.balance;
  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography variant="h5">Your wallet</Typography>
      <Box
        sx={{
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
          my: "auto",
          mx: "auto",
        }}
      >
        <Typography variant="h5">Wallet Balance:</Typography>
        <Typography variant="h4" sx={{ m: 4 }}>
          QR {balance} /-
        </Typography>
      </Box>
    </Box>
  );
};
