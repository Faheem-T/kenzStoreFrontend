import { api } from "../api";
import {
  getUsersResponse,
  blockUserResponse,
  baseResponseWithMessage,
} from "../types/apiResponseTypes";

const userManagementApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getUsers: builder.query<getUsersResponse, void>({
      query: () => "v1/admin/users",
      providesTags: (result = { data: [], success: false }, _error, _arg) => [
        ...result.data.map(({ _id }) => ({ type: "Users", id: _id } as const)),
        "Users",
      ],
    }),
    blockUser: builder.mutation<blockUserResponse, string>({
      query: (userId) => ({
        url: `v1/admin/users/${userId}/block`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Users", id: arg }],
    }),
    purgeUser: builder.mutation<baseResponseWithMessage, string>({
      query: (userId) => ({
        url: `v1/admin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Users", id: arg }],
    }),
  }),
});

export const { useGetUsersQuery, useBlockUserMutation, usePurgeUserMutation } =
  userManagementApi;
