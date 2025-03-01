import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router";
import { Navbar } from "../components/Navbar";
import {
  SortByField,
  sortOptions,
  useLazyGetProductsQuery,
} from "../api/productsApi";
import { LoadingComponent } from "../components/LoadingComponent";
import { ProductCard } from "../components/ProductCard";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "@mui/icons-material";
import { useGetCategoriesQuery } from "../api/categoriesApi";
import { Footer } from "../components/Footer";

const searchFormSchema = z.object({
  query: z.string().optional(),
});

type SearchFormType = z.infer<typeof searchFormSchema>;

export const SearchProductPage = () => {
  const [getProducts, { data, isFetching, isLoading }] =
    useLazyGetProductsQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleSubmit, register } = useForm();

  // Querying when searchParams change
  useEffect(() => {
    const sortBy: SortByField =
      (searchParams.get("sortBy") as SortByField) || "createdAt";
    const sort: "asc" | "desc" = searchParams.get("sort") as "asc" | "desc";
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") ?? "";
    getProducts({ sortBy, sort, query, category });
  }, [searchParams]);

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

  const products = data.data;
  return (
    <>
      <Navbar />
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Typography
          variant="h4"
          sx={{
            textTransform: "uppercase",
            textAlign: "center",
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
          }}
        >
          Search Results
        </Typography>

        {/* Search and Sort Controls - Stack vertically on mobile */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: { xs: "stretch", sm: "center" },
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
              placeholder="Search for a product..."
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

        {/* Main Content Area */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          {/* Category Filter - Horizontal scrolling on mobile, sidebar on desktop */}
          <Box
            sx={{
              width: { xs: "100%", md: "250px" },
              flexShrink: 0,
            }}
          >
            <CategoryRadioGroup
              value={searchParams.get("category") ?? ""}
              handleChange={(e) => {
                setSearchParams({
                  ...Object.fromEntries(searchParams),
                  category: e.target.value,
                });
              }}
              handleClear={() => {
                setSearchParams({
                  ...Object.fromEntries(searchParams),
                  category: "",
                });
              }}
            />
          </Box>

          {/* Products Grid */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: { xs: "center", sm: "flex-start" },
              flexGrow: 1,
              px: { xs: 4, md: 1 },
            }}
          >
            {isFetching ? (
              <Box sx={{ width: "100%", height: "30vh" }}>
                <LoadingComponent />
              </Box>
            ) : products.length > 0 ? (
              products.map((product) => (
                <Box
                  key={product._id}
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "calc(50% - 8px)",
                      md: "calc(33.333% - 10.667px)",
                      lg: "calc(25% - 12px)",
                    },
                  }}
                >
                  <ProductCard product={product} />
                </Box>
              ))
            ) : (
              <Box sx={{ width: "100%", textAlign: "center", py: 4 }}>
                <Typography variant="h6">No products found</Typography>
                <Typography color="text.secondary">
                  Try adjusting your search or filters
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

const CategoryRadioGroup = ({
  value,
  handleChange,
  handleClear,
}: {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
}) => {
  const { data, isLoading } = useGetCategoriesQuery();
  if (isLoading) return <LoadingComponent />;
  if (!data) return <Box>Couldn't fetch categories</Box>;
  const categories = data.data;

  return (
    <FormControl sx={{ width: "100%" }}>
      <FormLabel
        sx={{
          fontWeight: "medium",
          mb: 1,
        }}
      >
        Shop by category
      </FormLabel>

      {/* Mobile view: horizontal scrolling categories */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          overflowX: "auto",
          whiteSpace: "nowrap",
          pb: 1,
          "&::-webkit-scrollbar": {
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "6px",
          },
        }}
      >
        <RadioGroup
          value={value}
          onChange={handleChange}
          sx={{
            display: "inline-flex",
            flexDirection: "row",
          }}
        >
          {categories.map((category) => (
            <FormControlLabel
              key={category._id}
              value={category._id}
              control={<Radio size="small" />}
              label={category.name}
              sx={{
                mr: 2,
                "& > *": { fontSize: "14px" },
              }}
            />
          ))}
        </RadioGroup>
      </Box>

      {/* Desktop view: vertical categories list */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <RadioGroup value={value} onChange={handleChange}>
          {categories.map((category) => (
            <FormControlLabel
              key={category._id}
              value={category._id}
              control={<Radio size="small" />}
              label={category.name}
              sx={{ "& > *": { fontSize: "14px" } }}
            />
          ))}
        </RadioGroup>
      </Box>

      {value && (
        <Button
          onClick={handleClear}
          variant="text"
          color="text"
          size="small"
          sx={{ mt: 1 }}
        >
          Clear category filter
        </Button>
      )}
    </FormControl>
  );
};
