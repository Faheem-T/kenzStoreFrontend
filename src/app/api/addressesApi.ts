import { api } from "../api";
import { AddressType } from "../types/address";
import { BaseResponse } from "../types/apiResponseTypes";

const addressesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserAddresses: build.query<BaseResponse<AddressType[]>, void>({
      query: () => "v1/addresses/user",
      providesTags: (result = { data: [], success: false }) => [
        ...result.data.map(
          ({ _id }) => ({ type: "Addresses", id: _id } as const)
        ),
        "Addresses",
      ],
    }),
    createUserAddress: build.mutation({
      query: (body) => ({
        url: "v1/addresses/user",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Addresses"],
    }),
    setDefaultAddress: build.mutation({
      query: (addressId) => ({
        url: `v1/addresses/${addressId}/setDefault`,
        method: "PATCH",
      }),
      invalidatesTags: ["Addresses"],
    }),
    deleteAddress: build.mutation({
      query: (addressId) => ({
        url: `v1/addresses/${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Addresses", id: arg },
      ],
    }),
    updateAddress: build.mutation<
      any,
      { addressId: string; patch: Partial<AddressType> }
    >({
      query: ({ addressId, patch }) => ({
        url: `v1/addresses/${addressId}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Addresses", id: arg.addressId },
        "Addresses", // TODO: check if this is needed
      ],
    }),
  }),
});

export const {
  useCreateUserAddressMutation,
  useGetUserAddressesQuery,
  useSetDefaultAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} = addressesApi;
