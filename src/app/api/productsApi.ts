import { apiSlice } from "../api";
import {
  getMultipleProductsResponse,
  getProductResponse,
} from "../types/apiResponseTypes";
import { CreateProductType, UpdateProductType } from "../types/product";

const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get a product by its ID
    getProduct: builder.query<getProductResponse, string>({
      query: (id) => `v1/products/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),
    // Get products for the hero section
    getHeroProducts: builder.query<getMultipleProductsResponse, void>({
      query: () => "v1/products/hero",
      providesTags: (result = { data: [], success: false }, error, arg) => [
        ...result.data.map(
          ({ _id }) => ({ type: "Product", id: _id } as const)
        ),
      ],
    }),
    // fetch products related to a product
    getRelatedProducts: builder.query<getMultipleProductsResponse, string>({
      query: (productId) => `v1/products/${productId}/related`,
      providesTags: (result = { data: [], success: false }, error, arg) => [
        ...result.data.map(
          ({ _id }) => ({ type: "Product", id: _id } as const)
        ),
        { type: "Product", relatedTo: arg },
      ],
    }),
    // fetch all products
    getProducts: builder.query<getMultipleProductsResponse, void>({
      query: () => `v1/products`,
      providesTags: (result = { data: [], success: false }, error, arg) => [
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
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
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
      invalidatesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetHeroProductsQuery,
  useGetRelatedProductsQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productsApi;
