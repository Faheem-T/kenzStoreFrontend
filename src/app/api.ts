import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { registerFormValues } from "./features/auth/RegisterPage";
import { loginFormValues } from "./features/auth/LoginPage";
import { loginResponse } from "./types/loginResponse";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
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
  }),
});

export const { useRegisterMutation, useLoginMutation } = apiSlice;
