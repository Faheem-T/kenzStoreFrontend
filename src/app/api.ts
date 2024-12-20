import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { registerFormValues } from "./app/features/auth/RegisterPage";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: registerFormValues) => ({
        url: "v1/auth/register",
        method: "POST",
        body: data
      })
    })
  })
})

export const {useRegisterMutation} = apiSlice
