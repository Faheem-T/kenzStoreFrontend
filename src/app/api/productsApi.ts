import { apiSlice } from "../api";
import { getHeroProductsResponse, getProductResponse } from "../types/apiResponseTypes";
import { ProductType } from "../types/product";

const productsApi = apiSlice.injectEndpoints(({
    endpoints: (builder) => ({
        getProduct: builder.query<getProductResponse, string>({
            query: (id) => `v1/products/${id}`
        }),
        getHeroProducts: builder.query<getHeroProductsResponse, void>({
            query: () => "v1/products/hero"
        })
    })
}))

export const { useGetProductQuery, useGetHeroProductsQuery } = productsApi
