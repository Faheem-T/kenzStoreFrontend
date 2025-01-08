import { apiSlice } from "../api";
import { getMultipleProductsResponse, getProductResponse } from "../types/apiResponseTypes";

const productsApi = apiSlice.injectEndpoints(({
    endpoints: (builder) => ({
        getProduct: builder.query<getProductResponse, string>({
            query: (id) => `v1/products/${id}`,
            providesTags: (result, error, arg) => {
                const tag = [{ type: "Product", id: arg } as const]
                console.log("Product tag:", tag)
                return tag
            }
        }),
        getHeroProducts: builder.query<getMultipleProductsResponse, void>({
            query: () => "v1/products/hero",
            providesTags: (result = { data: [], success: false }, error, arg) => {
                const tags = [
                    ...result.data.map(({ _id }) => ({ type: "Product", id: _id }) as const)
                ]
                console.log("Hero tags:", tags)
                return tags
            }
        }),
        getRelatedProducts: builder.query<getMultipleProductsResponse, string>({
            query: (productId) => `v1/products/${productId}/related`,
            providesTags: (result = { data: [], success: false }, error, arg) => [
                ...result.data.map(({ _id }) => ({ type: "Product", id: _id }) as const),
                { type: "Product", relatedTo: arg }

            ]

        })
    }),
}))

export const { useGetProductQuery, useGetHeroProductsQuery, useGetRelatedProductsQuery } = productsApi
