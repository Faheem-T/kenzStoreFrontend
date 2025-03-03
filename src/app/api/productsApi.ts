import { api } from "../api";
import {
  getMultipleProductsResponse,
  getProductResponse,
} from "../types/apiResponseTypes";
import { CreateProductType, UpdateProductType } from "../types/product";

export const sortByFields = [
  "name",
  "finalPrice",
  "createdAt",
  "avgRating",
] as const;
export type SortByField = (typeof sortByFields)[number];

export interface SortOption {
  label: string;
  sortBy: SortByField;
  sort: "asc" | "desc";
}
export const sortOptions: SortOption[] = [
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

const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get a product by its ID
    getProduct: builder.query<getProductResponse, string>({
      query: (id) => `v1/products/${id}`,
      providesTags: (_result, _error, arg) => [{ type: "Product", id: arg }],
    }),
    // Get products for the hero section
    getHeroProducts: builder.query<getMultipleProductsResponse, void>({
      query: () => "v1/products/hero",
      providesTags: (result = { data: [], success: false }) => [
        ...result.data.map(
          ({ _id }) => ({ type: "Product", id: _id } as const)
        ),
      ],
    }),
    // fetch products related to a product
    getRelatedProducts: builder.query<getMultipleProductsResponse, string>({
      query: (productId) => `v1/products/${productId}/related`,
      providesTags: (result = { data: [], success: false }, _error, arg) => [
        ...result.data.map(
          ({ _id }) => ({ type: "Product", id: _id } as const)
        ),
        { type: "Product", relatedTo: arg },
      ],
    }),
    // fetch all products
    getProducts: builder.query<
      getMultipleProductsResponse,
      {
        sortBy?: SortByField;
        sort?: "asc" | "desc";
        page?: number;
        query?: string;
        category?: string;
      }
    >({
      query: ({ sortBy = "createdAt", sort, page = "1", query, category }) =>
        `v1/products?` +
        (sort ? `sort=${sort}` : "") +
        (query ? `&q=${query}` : "") +
        (sortBy ? `&sortBy=${sortBy}` : "") +
        (page ? `&page=${page}` : "") +
        (category ? `&category=${category}` : ""),
      providesTags: (
        result = { data: [], success: false, currentPage: 1, totalPages: 1 }
      ) => [
        ...result.data.map(
          ({ _id }) => ({ type: "Product", id: _id } as const)
        ),
        "Product",
      ],
    }),
    // Update a product
    UpdateProduct: builder.mutation<
      getProductResponse,
      { id: string; patch: UpdateProductType }
    >({
      query: ({ id, patch }) => ({
        url: `v1/products/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Product", id }],
    }),
    // Create a new product
    createProduct: builder.mutation<getProductResponse, CreateProductType>({
      query: (product) => ({
        url: "v1/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    // Delete a product
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Product", id: arg }],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetHeroProductsQuery,
  useGetRelatedProductsQuery,
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productsApi;
