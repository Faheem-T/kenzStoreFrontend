import { useGetOfferCategoriesQuery } from "@/app/api/offerApi";
import LoadingComponent from "@/app/components/LoadingComponent";
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

const AdminCategoryOffersPage = () => {
  const { data, isLoading } = useGetOfferCategoriesQuery();
  const navigate = useNavigate();
  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Couldn't fetch offers</Box>;

  const offerCategories = data.data;

  return (
    <>
      <Box sx={{ width: "100%", px: 12 }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ textTransform: "uppercase", ml: "auto" }}
          >
            Offer Categories Overview
          </Typography>
          <Button
            variant="contained"
            sx={{ ml: "auto" }}
            onClick={() => navigate("/admin/offers/categories/create")}
          >
            Add New Category Offer
          </Button>
        </Box>

        <Table>
          <TableCaption>
            Overview of all categories with an offer in your store
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Discount Name</TableHead>
              <TableHead>Starts in</TableHead>
              <TableHead>Ends in</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {...offerCategories.map((category) => {
              const daysToOfferEnd = calculateDaysToToday(
                category.discountEndDate
              );
              const daysToOfferStart = calculateDaysToToday(
                category.discountStartDate
              );
              return (
                <TableRow
                  className={cn(
                    "hover:bg-accent cursor-pointer",
                    "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  )}
                  key={category._id}
                >
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    -{category.discountValue}
                    {category.discountType === "percentage" ? "%" : "₹"}
                  </TableCell>
                  <TableCell>{category.discountName}</TableCell>
                  <TableCell>{`${
                    daysToOfferStart > 0
                      ? daysToOfferStart + " days"
                      : "Started"
                  }`}</TableCell>
                  <TableCell>
                    {isNaN(daysToOfferEnd)
                      ? "-"
                      : daysToOfferEnd > 0
                      ? daysToOfferEnd + " days"
                      : "Ended " + -daysToOfferEnd + " days ago"}
                  </TableCell>
                  <TableCell>
                    <DeleteOfferButton type="category" id={category._id} />
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
export default AdminCategoryOffersPage;
