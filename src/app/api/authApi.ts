import { api } from "../api";
import { loginFormValues } from "../pages/LoginPage";
import { registerFormValues } from "../pages/RegisterPage";
import {
  baseResponseWithMessage,
  loginResponse,
  meResponse,
  refreshResponse,
} from "../types/apiResponseTypes";

export const authApi = api.injectEndpoints({
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
      invalidatesTags: ["Auth", "Addresses", "Cart", "Wallet", "Wishlist"],
    }),
    forgotPassword: builder.mutation<
      baseResponseWithMessage,
      { email: string }
    >({
      query: ({ email }) => ({
        url: "v1/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation<
      baseResponseWithMessage,
      { newPassword: string; token: string }
    >({
      query: ({ newPassword, token }) => ({
        url: "v1/auth/reset-password",
        method: "POST",
        body: { newPassword, token },
      }),
    }),
    googleLogin: builder.mutation<
      loginResponse,
      { credential: string; g_csrf_token: string }
    >({
      query: ({ credential, g_csrf_token }) => ({
        url: "v1/auth/google-login",
        method: "POST",
        body: { credential, g_csrf_token },
      }),
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
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGoogleLoginMutation,
} = authApi;
