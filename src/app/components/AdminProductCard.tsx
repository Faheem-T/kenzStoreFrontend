import { Box, Typography } from "@mui/material";
import { useGetProductQuery } from "../api/productsApi";
import { LoadingComponent } from "./LoadingComponent";
import { Link } from "react-router";

export const AdminProductCard = ({
  _id,
  saleCount,
}: {
  _id: string;
  saleCount?: number;
}) => {
  const { data, isLoading } = useGetProductQuery(_id);
  if (isLoading) return <LoadingComponent />;
  if (!data) return <Box>Couldn't fetch product. (ID: {_id})</Box>;
  const product = data.data;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        borderRadius: 1,
        boxShadow: 3,
        p: 4,
        bgcolor: "background.paper",
        maxWidth: 200,
      }}
      component={Link}
      to={`/admin/products/${product._id}`}
    >
      <Box
        sx={{ width: "50%", alignSelf: "center" }}
        component="img"
        src={product.images[0]}
      />
      <Typography variant="body2">{product.name}</Typography>
      <Typography>Total sale count: {saleCount}</Typography>
    </Box>
  );
};
