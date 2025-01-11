import { apiSlice } from "../api";
import { AdminLoginResponse } from "../types/apiResponseTypes";

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation<AdminLoginResponse>({
      query: (body) => ({
        url: "v1/admin/login",
        method: "POST",
        body: body,
      }),
    }),
    adminRefresh: builder.query({
      query: () => "v1/admin/refresh",
    }),
  }),
});

export const { useAdminLoginMutation } = adminApi;
