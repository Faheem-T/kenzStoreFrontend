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
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 1,
        borderRadius: 1,
        boxShadow: 3,
        p: 4,
        bgcolor: "background.paper",
        maxWidth: "16rem",
      }}
      component={Link}
      to={`/admin/products/${product._id}`}
    >
      <Box
        sx={{ width: "50%", alignSelf: "center" }}
        component="img"
        src={product.images[0]}
      />
      <Typography variant="h6">{product.name}</Typography>
      <Typography variant="caption" textTransform={"uppercase"}>
        {saleCount} sales
      </Typography>
    </Box>
  );
};
