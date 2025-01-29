import { apiSlice } from "../api";
import { baseResponse } from "../types/apiResponseTypes";
import { CategoryType } from "../types/category";
import { ProductWithoutCategory } from "../types/product";

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
    getOfferProducts: builder.query<
      baseResponse<ProductWithoutCategory[]>,
      void
    >({
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
    getOfferCategories: builder.query<baseResponse<CategoryType[]>, void>({
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
  }),
});

export const {
  useGetOfferProductsQuery,
  useCreateCategoriesOfferMutation,
  useCreateProductsOfferMutation,
} = offerApi;
