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
      providesTags: (result, error, arg) => {
        const tag = [{ type: "Product", id: arg } as const];
        console.log("Product tag:", tag);
        return tag;
      },
    }),
    // Get products for the hero section
    getHeroProducts: builder.query<getMultipleProductsResponse, void>({
      query: () => "v1/products/hero",
      providesTags: (result = { data: [], success: false }, error, arg) => {
        const tags = [
          ...result.data.map(
            ({ _id }) => ({ type: "Product", id: _id } as const)
          ),
        ];
        console.log("Hero tags:", tags);
        return tags;
      },
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
  }),
});

export const {
  useGetProductQuery,
  useGetHeroProductsQuery,
  useGetRelatedProductsQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
} = productsApi;
