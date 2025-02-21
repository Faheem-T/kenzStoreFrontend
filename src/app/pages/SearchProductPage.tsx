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
import { SortByField, useLazyGetProductsQuery } from "../api/productsApi";
import { LoadingComponent } from "../components/LoadingComponent";
import { ProductCard } from "../components/ProductCard";
import { useEffect, useRef, useMemo } from "react";
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
  const searchTimer = useRef<NodeJS.Timeout | null>(null);
  const { handleSubmit, register } = useForm();
  interface SortOption {
    label: string;
    sortBy: SortByField;
    sort: "asc" | "desc";
  }

  const sortOptions: SortOption[] = [
    {
      label: "Price: Low to High",
      sortBy: "finalPrice",
      sort: "asc",
    },
    {
      label: "Price: High to Low",
      sortBy: "finalPrice",
      sort: "desc",
    },
    {
      label: "Newest",
      sortBy: "createdAt",
      sort: "desc",
    },
    {
      label: "Oldest",
      sortBy: "createdAt",
      sort: "asc",
    },
    {
      label: "Average Rating",
      sortBy: "avgRating",
      sort: "desc",
    },
  ];

  // Querying when searchParams change
  useEffect(() => {
    const sortBy: SortByField =
      (searchParams.get("sortBy") as SortByField) || "createdAt";
    const sort: "asc" | "desc" = searchParams.get("sort") as "asc" | "desc";
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") ?? "";
    getProducts({ sortBy, sort, query, category });
    // cleanup
    return () => {
      searchTimer.current && clearTimeout(searchTimer.current);
    };
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
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          sx={{ textTransform: "uppercase", textAlign: "center", mb: 2 }}
        >
          Search Results
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
            component="form"
            onSubmit={handleSubmit(handleSearchSubmit)}
          >
            <TextField
              variant="standard"
              {...register("query")}
              placeholder="Search for a product..."
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
        <Box sx={{ display: "flex", gap: 2, p: 2 }}>
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
          <Box sx={{ display: "flex", gap: 2, p: 2 }}>
            {isFetching ? (
              <Box sx={{ width: "100%", height: "30vh" }}>
                <LoadingComponent />
              </Box>
            ) : (
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))
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
    <FormControl>
      <FormLabel>Shop by category</FormLabel>
      <RadioGroup value={value} onChange={handleChange}>
        {...categories.map((category) => (
          <FormControlLabel
            // sx={{ fontSize: "1px" }}
            sx={{ "& > *": { fontSize: "14px" } }}
            key={category._id}
            value={category._id}
            control={<Radio size="small" />}
            label={category.name}
          />
        ))}
      </RadioGroup>
      {value && (
        <Button onClick={handleClear} variant="text" color="text">
          Clear category filter
        </Button>
      )}
    </FormControl>
  );
};
