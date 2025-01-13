import { useGetCategoriesQuery } from "@/app/api/categoriesApi";
import { LoadingComponent } from "@/app/components/LoadingComponent";
import { Box, Typography, Button } from "@mui/material";
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { DeleteProductButton } from "@/app/components/adminComponents/DeleteProductButton";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { DeleteCategoryButton } from "@/app/components/adminComponents/DeleteCategoryButton";

export const CategoryOverviewPage = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  const navigate = useNavigate();

  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>No Categories Found</Box>;

  const categories = data.data;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ textTransform: "uppercase", ml: "auto" }}
          >
            Categories Overview
          </Typography>
          <Button
            variant="contained"
            sx={{ ml: "auto" }}
            onClick={() => navigate("create")}
          >
            Add Category
          </Button>
        </Box>

        <Table>
          <TableCaption>Overview of all categories in your store</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Parent Category</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {...categories.map((category) => (
              <TableRow
                className={cn(
                  "hover:bg-accent cursor-pointer",
                  "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                )}
                onClick={() => navigate(`/admin/categories/${category._id}`)}
              >
                <TableCell>{category.name}</TableCell>
                <TableCell>{category?.parentCategory?.name || null}</TableCell>
                <TableCell>
                  <DeleteCategoryButton
                    categoryId={category._id}
                    categoryName={category.name}
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
