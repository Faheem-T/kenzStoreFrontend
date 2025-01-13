import { apiSlice } from "../api";
import { getCategoriesResponse } from "../types/apiResponseTypes";

const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } =
  categoriesApi;
