import { useGetProductsQuery } from "@/app/api/productsApi";
import { LoadingComponent } from "@/app/components/LoadingComponent";
import { Box, Button, Typography } from "@mui/material";
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
import { DeleteProductButton } from "@/app/components/adminComponents/DeleteProductButton";
import { Paginator } from "@/app/components/Pagination";

export const ProductOverviewPage = () => {
  // TODO add pagination
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useGetProductsQuery({ page });

  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Could not fetch products</Box>;

  const products = data.data;

  const totalPages = data.totalPages;

  return (
    <>
      <Box sx={{ width: "100%", px: 12 }}>
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
              <TableHead>Price (₹)</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Discounted Price (₹)</TableHead>
              <TableHead>Category</TableHead>
              <TableHead />
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
                key={product._id}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                {product.finalPrice !== product.price &&
                product.effectiveDiscount ? (
                  <TableCell>
                    {product.effectiveDiscount.value}
                    {product.effectiveDiscount.type === "percentage"
                      ? "%"
                      : "₹"}
                  </TableCell>
                ) : (
                  <TableCell>None</TableCell>
                )}
                <TableCell>{product.finalPrice}</TableCell>
                <TableCell>
                  <CategoryChipGroup categories={[product.category]} />
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
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Paginator
            currentPage={page}
            setPage={setPage}
            disabled={isFetching || isLoading}
            totalPages={totalPages}
          />
        </Box>
      </Box>
    </>
  );
};
