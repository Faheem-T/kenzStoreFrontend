import { string } from "zod";
import { api } from "../api";
import {
  getCategoriesResponse,
  getCategoryResponse,
} from "../types/apiResponseTypes";
import { UpdateProductType } from "../types/product";

const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query<getCategoryResponse, string>({
      query: (categoryId) => `v1/categories/${categoryId}`,
      providesTags: (result, error, arg) => [{ type: "Category", id: arg }],
    }),
    getCategories: builder.query<getCategoriesResponse, void>({
      query: () => `v1/categories`,
      providesTags: (result = { data: [], success: false }, error) => [
        ...result.data.map(
          ({ _id }) => ({ type: "Category", id: _id } as const)
        ),
        { type: "Category" },
      ],
    }),
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "v1/categories",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: [{ type: "Category" }],
    }),
    // Delete a category
    deleteCategory: builder.mutation<void, string>({
      query: (categoryId) => ({
        url: `v1/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Category", id: arg }],
    }),
    // Update a category
    updateCategory: builder.mutation<
      void,
      { categoryId: string; patch: UpdateProductType }
    >({
      query: ({ categoryId, patch }) => ({
        url: `v1/categories/${categoryId}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { categoryId }) => [
        { type: "Category", id: categoryId },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} = categoriesApi;
