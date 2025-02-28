import {
  Box,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useLazyGetCategoryProductsQuery } from "../api/categoriesApi";
import { LoadingComponent } from "../components/LoadingComponent";
import { useParams, useSearchParams } from "react-router";
import { ProductCard } from "../components/ProductCard";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useEffect, useMemo } from "react";
import { SortByField, sortOptions } from "../api/productsApi";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchFormSchema = z.object({
  query: z.string().optional(),
});

type SearchFormType = z.infer<typeof searchFormSchema>;
export const CategoryProductsPage = () => {
  const categorySlug = useParams().slug;
  const [searchParams, setSearchParams] = useSearchParams();
  if (!categorySlug) throw new Error("Slug is required");
  const { handleSubmit, register } = useForm();
  const [getCategoryProducts, { data, isLoading, isFetching }] =
    useLazyGetCategoryProductsQuery();

  // Querying when searchParams change
  useEffect(() => {
    const sortBy: SortByField =
      (searchParams.get("sortBy") as SortByField) || "createdAt";
    const sort: "asc" | "desc" = searchParams.get("sort") as "asc" | "desc";
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") ?? "";
    getCategoryProducts({ slug: categorySlug, sortBy, sort, query, category });
  }, [searchParams, categorySlug]);

  // Search submit handler
  const handleSearchSubmit = async (data: SearchFormType) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      q: data.query || "",
    });
  };

  const currentSort = useMemo(
    () =>
      sortOptions.find(
        (options) =>
          options.sortBy === searchParams.get("sortBy") &&
          options.sort === searchParams.get("sort")
      ),
    [searchParams]
  );

  if (isLoading) return <LoadingComponent />;
  if (!data) return <Box>Couldn't fetch products</Box>;
  const { category, products } = data.data;
  return (
    <>
      <Navbar />
      <Box sx={{ p: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 4,
          }}
        >
          {category?.image && (
            <Box component="img" src={category.image} width="20%" />
          )}

          <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
            {category?.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "space-between", p: 2 }}>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
            component="form"
            onSubmit={handleSubmit(handleSearchSubmit)}
          >
            <TextField
              variant="standard"
              {...register("query")}
              placeholder={`Search for ${categorySlug}...`}
              defaultValue={searchParams.get("q")}
            />
            <IconButton type="submit" disabled={isFetching}>
              <Search />
            </IconButton>
          </Box>
          <Select
            value={
              currentSort?.label ||
              sortOptions.find((option) => option.label === "Newest")?.label
            }
            disabled={isFetching}
            onChange={(e) => {
              const selectedOption = sortOptions.find(
                (option) => option.label === e.target.value
              );
              if (selectedOption) {
                setSearchParams(
                  {
                    ...Object.fromEntries(searchParams),
                    sort: selectedOption.sort,
                    sortBy: selectedOption.sortBy,
                  },
                  { replace: false }
                );
              }
            }}
            sx={{ textTransform: "capitalize", ml: "auto" }}
            size="small"
          >
            {sortOptions.map((option) => (
              <MenuItem
                value={option.label}
                key={option.label}
                sx={{ textTransform: "capitalize" }}
              >
                Sort By: {option.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </Box>
      </Box>
      <Box sx={{ mt: 80 }}>
        <Footer />
      </Box>
    </>
  );
};
