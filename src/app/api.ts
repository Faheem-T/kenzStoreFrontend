import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { registerFormValues } from "./features/auth/RegisterPage";
import { loginFormValues } from "./features/auth/LoginPage";
import {
  loginResponse,
  meResponse,
  refreshResponse,
} from "./types/apiResponseTypes";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: registerFormValues) => ({
        url: "v1/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<loginResponse, loginFormValues>({
      query: (data) => ({
        url: "v1/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    refresh: builder.query<refreshResponse, void>({
      query: () => "v1/auth/refresh",
    }),
    me: builder.query<meResponse, void>({
      query: () => "v1/auth/me",
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshQuery,
  useMeQuery,
} = apiSlice;
