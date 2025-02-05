import { apiSlice } from "../api";
import { BaseResponse } from "../types/apiResponseTypes";
import { CategoryWithDiscount } from "../types/category";
import { ProductWithDiscount } from "../types/product";

interface CreateOfferBody {
  name: string;
  startDate: Date;
  endDate: Date;
  discountType: "percentage" | "fixed";
  discountValue: number;
}

interface CreateProductsOfferBody extends CreateOfferBody {
  products: string[];
}

interface CreateCategoriesOfferBody extends CreateOfferBody {
  categories: string[];
}

const offerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOfferProducts: builder.query<BaseResponse<ProductWithDiscount[]>, void>({
      query: () => "v1/offers/offer-products",
      providesTags: (result = { data: [], success: false }, _error, _arg) => [
        ...result.data.map(
          (product) =>
            ({
              type: "Offer",
              id: `Product-${product._id}`,
              group: "offer-products",
            } as const)
        ),
        { type: "Offer", group: "offer-products" },
      ],
    }),
    getOfferCategories: builder.query<
      BaseResponse<CategoryWithDiscount[]>,
      void
    >({
      query: () => "v1/offers/offer-categories",
      providesTags: (result = { data: [], success: false }, _error, _arg) => [
        ...result.data.map(
          (category) =>
            ({
              type: "Offer",
              id: `Category-${category._id}`,
              group: "offer-categories",
            } as const)
        ),
        { type: "Offer", group: "offer-categories" },
      ],
    }),
    createProductsOffer: builder.mutation<void, CreateProductsOfferBody>({
      query: (body) => ({
        url: "v1/offers/products",
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Offer", group: "offer-products" }],
    }),
    createCategoriesOffer: builder.mutation<void, CreateCategoriesOfferBody>({
      query: (body) => ({
        url: "v1/offers/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: () => [{ type: "Offer", group: "offer-categories" }],
    }),
    deleteProductOffer: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/offers/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Offer", id: `Product-${arg}`, group: "offer-products" },
      ],
    }),
    deleteCategoryOffer: builder.mutation<void, string>({
      query: (id) => ({
        url: `v1/offers/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Offer", id: `Category-${arg}`, group: "offer-categories" },
      ],
    }),
  }),
});

export const {
  useGetOfferProductsQuery,
  useGetOfferCategoriesQuery,
  useCreateCategoriesOfferMutation,
  useCreateProductsOfferMutation,
  useDeleteProductOfferMutation,
  useDeleteCategoryOfferMutation,
} = offerApi;
