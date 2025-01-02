import { apiSlice } from "../api";
import { loginFormValues } from "../features/auth/LoginPage";
import { registerFormValues } from "../features/auth/RegisterPage";
import { loginResponse, meResponse, refreshResponse } from "../types/apiResponseTypes";

const authApi = apiSlice.injectEndpoints({
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

    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useRefreshQuery,
    useMeQuery,
} = authApi;
