import { useGetOfferProductsQuery } from "@/app/api/offerApi";
import { LoadingComponent } from "@/app/components/LoadingComponent";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DeleteOfferButton } from "@/app/components/DeleteCategoryButton";
import { calculateDaysToToday } from "@/app/utils/dateUtils";

export const AdminProductOffersPage = () => {
  const { data, isLoading } = useGetOfferProductsQuery();
  const navigate = useNavigate();
  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Couldn't fetch offers</Box>;

  const offerProducts = data.data;

  return (
    <>
      <Box sx={{ width: "100%", px: 12 }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ textTransform: "uppercase", ml: "auto" }}
          >
            Offer Products Overview
          </Typography>
          <Button
            variant="contained"
            sx={{ ml: "auto" }}
            onClick={() => navigate("/admin/offers/products/create")}
          >
            Add New Product Offer
          </Button>
        </Box>

        <Table>
          <TableCaption>
            Overview of all discounted products in your store
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              {/* <TableHead>Price (QR)</TableHead> */}
              <TableHead>Discount</TableHead>
              {/* <TableHead>Discounted Price (QR)</TableHead> */}
              <TableHead>Discount Name</TableHead>
              <TableHead>Starts in</TableHead>
              <TableHead>Ends in</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {...offerProducts.map((product) => {
              const daysToOfferEnd = calculateDaysToToday(
                product.discountEndDate
              );
              const daysToOfferStart = calculateDaysToToday(
                product.discountStartDate
              );
              return (
                <TableRow
                  className={cn(
                    "hover:bg-accent cursor-pointer",
                    "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  )}
                  onClick={() => navigate(`/admin/products/${product._id}`)}
                  key={product._id}
                >
                  <TableCell>{product.name}</TableCell>
                  {/* <TableCell>{product.price}</TableCell> */}
                  {product.finalPrice ? (
                    <TableCell>
                      -{product.discountValue}
                      {product.discountType === "percentage" ? "%" : "QR"}
                    </TableCell>
                  ) : (
                    <TableCell>None</TableCell>
                  )}
                  {/* <TableCell>{product.finalPrice}</TableCell> */}
                  <TableCell>{product.discountName}</TableCell>
                  <TableCell>{`${
                    daysToOfferStart > 0
                      ? daysToOfferStart + " days"
                      : "Started"
                  }`}</TableCell>
                  <TableCell>
                    {daysToOfferEnd < 0
                      ? `Ended ${-daysToOfferEnd} days ago`
                      : daysToOfferEnd + " days"}
                  </TableCell>
                  <TableCell>
                    <DeleteOfferButton type="product" id={product._id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};
