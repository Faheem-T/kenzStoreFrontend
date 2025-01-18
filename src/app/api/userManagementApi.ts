import { apiSlice } from "../api";
import { getUsersResponse, blockUserResponse } from "../types/apiResponseTypes";

const userManagementApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getUsers: builder.query<getUsersResponse, void>({
      query: () => "v1/admin/users",
      providesTags: (result = { data: [], success: false }, error, arg) => [
        ...result.data.map(({ _id }) => ({ type: "Users", id: _id } as const)),
        "Users",
      ],
    }),
    blockUser: builder.mutation<blockUserResponse, string>({
      query: (userId) => ({
        url: `v1/admin/users/${userId}/block`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Users", id: arg }],
    }),
  }),
});

export const { useGetUsersQuery, useBlockUserMutation } = userManagementApi;
