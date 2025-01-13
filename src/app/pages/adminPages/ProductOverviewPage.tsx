import { useGetProductsQuery } from "@/app/api/productsApi";
import { LoadingComponent } from "@/app/components/LoadingComponent";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryChipGroup } from "@/app/components/CategoryChipGroup";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { Delete } from "@mui/icons-material";
import { DeleteProductButton } from "@/app/components/adminComponents/DeleteProductButton";

export const ProductOverviewPage = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Could not fetch products</Box>;

  const products = data.data;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ textTransform: "uppercase", ml: "auto" }}
          >
            Products Overview
          </Typography>
          <Button
            variant="contained"
            sx={{ ml: "auto" }}
            onClick={() => navigate("/admin/products/create")}
          >
            Add Product
          </Button>
        </Box>

        <Table>
          <TableCaption>Overview of all products in your store</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price (QR)</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Discounted Price (QR)</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead hidden>Delete Button</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {...products.map((product) => (
              <TableRow
                className={cn(
                  "hover:bg-accent cursor-pointer",
                  "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                )}
                onClick={() => navigate(`/admin/products/${product._id}`)}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                {product.isDiscountActive ? (
                  <TableCell>
                    {product.discountValue}
                    {product.discountType === "percentage" ? "%" : "QR"}
                  </TableCell>
                ) : (
                  <TableCell>None</TableCell>
                )}
                <TableCell>{product.finalPrice}</TableCell>
                <TableCell>
                  <CategoryChipGroup categories={product.categories} />
                </TableCell>
                <TableCell>
                  <DeleteProductButton
                    productId={product._id}
                    productName={product.name}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};
