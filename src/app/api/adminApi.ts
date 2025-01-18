import { apiSlice } from "../api";
import { AdminLoginResponse } from "../types/apiResponseTypes";

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation<AdminLoginResponse, any>({
      query: (body) => ({
        url: "v1/admin/auth/login",
        method: "POST",
        body: body,
      }),
    }),
    adminRefresh: builder.query({
      query: () => "v1/admin/auth/refresh",
    }),
  }),
});

export const { useAdminLoginMutation } = adminApi;
