import { Typography } from "@mui/material";

export const StockDisplay = ({ stock }: { stock: number }) => {
  return <Typography variant="h6">In Stock: {stock}</Typography>;
};
