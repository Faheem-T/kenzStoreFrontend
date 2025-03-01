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

  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Couldn't fetch products</Box>;

  const { category, products } = data.data;

  return (
    <>
      <Navbar />
      <Box
        sx={{
          p: { xs: 2, sm: 4, md: 6, lg: 8 },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Category Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 1, sm: 2 },
            mb: { xs: 2, sm: 3, md: 4 },
            textAlign: "center",
          }}
        >
          {category?.image && (
            <Box
              component="img"
              src={category.image}
              sx={{
                width: { xs: "40%", sm: "30%", md: "20%" },
                maxWidth: "200px",
                height: "auto",
              }}
              alt={category.name}
            />
          )}
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
            }}
          >
            {category?.name}
          </Typography>
        </Box>

        {/* Search and Sort Controls */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            gap: 2,
            p: { xs: 1, sm: 2 },
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexGrow: 1,
              width: "100%",
            }}
            component="form"
            onSubmit={handleSubmit(handleSearchSubmit)}
          >
            <TextField
              variant="standard"
              {...register("query")}
              placeholder={`Search for ${categorySlug}...`}
              defaultValue={searchParams.get("q")}
              fullWidth
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
            sx={{
              textTransform: "capitalize",
              width: { xs: "100%", sm: "auto" },
              ml: { sm: "auto" },
            }}
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

        {/* Products Grid */}
        {isFetching ? (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingComponent />
          </Box>
        ) : products.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: { xs: "center", sm: "flex-start" },
              flexGrow: 1,
            }}
          >
            {products.map((product) => (
              <Box
                key={product._id}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 8px)",
                    md: "calc(33.333% - 10.667px)",
                    lg: "calc(25% - 12px)",
                  },
                  p: { xs: 6, md: 1 },
                }}
              >
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              py: 8,
            }}
          >
            <Typography variant="h6" gutterBottom>
              No products found
            </Typography>
            <Typography color="text.secondary">
              Try adjusting your search criteria
            </Typography>
          </Box>
        )}
      </Box>

      {/* Footer - fixed at bottom of page */}
      <Footer />
    </>
  );
};
