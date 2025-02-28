import { api } from "../api";
import {
  BaseResponse,
  getCategoriesResponse,
  getCategoryResponse,
} from "../types/apiResponseTypes";
import { ProductType } from "../types/product";
import { CategoryType, UpdateCategoryType } from "../types/category";
import { SortByField } from "./productsApi";

type GetCategoryProductsType = BaseResponse<{
  products: ProductType[];
  category: CategoryType | null;
}>;

const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryProducts: builder.query<
      GetCategoryProductsType,
      {
        slug: string;
        sortBy?: SortByField;
        sort?: "asc" | "desc";
        page?: number;
        query?: string;
        category?: string;
      }
    >({
      query: ({ slug = "", sortBy = "createdAt", sort, page = "1", query }) =>
        `v1/categories/${slug}/products?` +
        (sort ? `sort=${sort}` : "") +
        (query ? `&q=${query}` : "") +
        (sortBy ? `&sortBy=${sortBy}` : "") +
        (page ? `&page=${page}` : ""),
      providesTags: (
        result = { data: { products: [], category: null }, success: false },
        _error,
        _arg
      ) => [
        ...result.data.products.map(
          ({ _id }) => ({ type: "Product", id: _id } as const)
        ),
        { type: "Category", id: result.data.category?._id },
      ],
    }),
    getCategory: builder.query<getCategoryResponse, string>({
      query: (categoryId) => `v1/categories/${categoryId}`,
      providesTags: (_result, _error, arg) => [{ type: "Category", id: arg }],
    }),
    getCategories: builder.query<getCategoriesResponse, void>({
      query: () => `v1/categories`,
      providesTags: (result = { data: [], success: false }, _error) => [
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
      invalidatesTags: (_result, _error, arg) => [
        { type: "Category", id: arg },
      ],
    }),
    // Update a category
    updateCategory: builder.mutation<
      void,
      { categoryId: string; patch: UpdateCategoryType }
    >({
      query: ({ categoryId, patch }) => ({
        url: `v1/categories/${categoryId}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { categoryId }) => [
        { type: "Category", id: categoryId },
      ],
    }),
  }),
});

export const {
  useLazyGetCategoryProductsQuery,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} = categoriesApi;
