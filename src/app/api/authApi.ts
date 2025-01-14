import { apiSlice } from "../api";
import { loggedOut } from "../features/auth/authSlice";
import { loginFormValues } from "../pages/LoginPage";
import { registerFormValues } from "../pages/RegisterPage";
import {
  baseResponseWithMessage,
  loginResponse,
  meResponse,
  refreshResponse,
} from "../types/apiResponseTypes";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<baseResponseWithMessage, any>({
      query: (data: registerFormValues) => ({
        url: "v1/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<baseResponseWithMessage, any>({
      query: (data) => ({
        url: "v1/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: builder.mutation<baseResponseWithMessage, any>({
      query: (data) => ({
        url: "v1/auth/resend-otp",
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
      providesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "v1/auth/logout",
        method: "POST",
      }),
      //   onQueryStarted: async (_, { dispatch }) => {
      //     dispatch(loggedOut());
      //   },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLoginMutation,
  useRefreshQuery,
  useMeQuery,
  useLogoutMutation,
} = authApi;
