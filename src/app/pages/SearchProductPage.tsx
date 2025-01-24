import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router";
import { Navbar } from "../components/Navbar";
import {
  SortByField,
  sortByFields,
  useLazyGetProductsQuery,
} from "../api/productsApi";
import { LoadingComponent } from "../components/LoadingComponent";
import { ProductCard } from "../components/ProductCard";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "@mui/icons-material";

const searchFormSchema = z.object({
  query: z.string().optional(),
});

type SearchFormType = z.infer<typeof searchFormSchema>;

export const SearchProductPage = () => {
  const [getProducts, { data, isLoading }] = useLazyGetProductsQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTimer = useRef<NodeJS.Timeout | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const { handleSubmit, register } = useForm();

  // Front end friendly names for the query params
  const sortByMap = {
    "Price: Low to High": { sortBy: "price", sort: "asc" },
    "Price: High to Low": { sortBy: "price", sort: "desc" },
    Newest: { sortBy: "createdAt", sort: "desc" },
    Oldest: { sortBy: "createdAt", sort: "asc" },
    "Average Rating": { sortBy: "avgRating", sort: "desc" },
  };

  // getting the query params
  const sortBy: SortByField =
    (searchParams.get("sortBy") as SortByField) || "createdAt";
  const sort: "asc" | "desc" =
    (searchParams.get("sort") as "asc" | "desc") || sortBy === "avgRating"
      ? "desc"
      : "asc";
  const query = searchParams.get("q") || "";

  // Querying when either the sortBy or sort changes
  useEffect(() => {
    getProducts({ sortBy, sort, query });
  }, [sortBy, sort, query]);

  // Query handler
  const handleSearchSubmit = async (data: SearchFormType) => {
    setSearchParams({ q: data.query || "" }); // setting the query param to the data;
    setIsLoadingProducts(true);
    await getProducts({ query, sortBy, sort });
    setIsLoadingProducts(false);
  };

  //
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    searchTimer.current && clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(async () => {
      setSearchParams({ q: value });
      setIsLoadingProducts(true);
      await getProducts({ query: value, sortBy, sort });
      setIsLoadingProducts(false);
    }, 1500);
  };

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
              defaultValue={query}
              onChange={handleSearchChange}
            />
            <IconButton type="submit" disabled={isLoadingProducts}>
              <Search />
            </IconButton>
          </Box>
          <Select
            defaultValue={
              (Object.entries(sortByMap).find(
                ([_, value]) => value.sortBy === sortBy && value.sort === sort
              )?.[0] as keyof typeof sortByMap) || "Price: Low to High"
            }
            onChange={(e: SelectChangeEvent<keyof typeof sortByMap>) =>
              setSearchParams({
                sortBy:
                  sortByMap[e.target.value as keyof typeof sortByMap].sortBy,
                sort: sortByMap[e.target.value as keyof typeof sortByMap].sort,
              })
            }
            sx={{ textTransform: "capitalize", ml: "auto" }}
            size="small"
          >
            {Object.keys(sortByMap).map((field) => (
              <MenuItem
                value={field}
                sx={{ textTransform: "capitalize" }}
                key={field}
              >
                Sort By: {field}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ display: "flex", gap: 2, p: 2 }}>
          {isLoadingProducts ? (
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
    </>
  );
};
