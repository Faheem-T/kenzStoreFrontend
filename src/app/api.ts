import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { loggedOut, tokenRefreshed } from "./features/auth/authSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

if (!BACKEND_URL) {
  throw new Error(
    "`VITE_BACKEND_URL` is not defined. Please set it in your .env"
  );
}

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URL,
  credentials: "include",
  prepareHeaders: async (headers, { getState }) => {
    headers.set("Accept", "application/json");
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, apiArg, extraOptions) => {
  let result = await baseQuery(args, apiArg, extraOptions);

  // If "Forbidden" (401) request the refresh route
  if (result.error?.status === 401) {
    // refresh route for "user" role
    let refreshRoute = "v1/auth/refresh";
    if ((apiArg.getState() as RootState).auth.isAdmin) {
      refreshRoute = "v1/admin/auth/refresh";
    }
    const refreshResult = await baseQuery(refreshRoute, apiArg, extraOptions);
    if (refreshResult.data) {
      const refreshData = refreshResult.data as {
        success: boolean;
        data: { accessToken: string };
      };
      // console.log("Refresh Result: ", refreshData);
      // store new token
      apiArg.dispatch(
        tokenRefreshed({ accessToken: refreshData.data.accessToken })
      );
      // retry initial query
      result = await baseQuery(args, apiArg, extraOptions);
    } else {
      apiArg.dispatch(loggedOut());
      apiArg.dispatch(api.util.resetApiState());
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Product",
    "Auth",
    "Review",
    "Category",
    "Users",
    "Addresses",
    "Cart",
    "Order",
    "Offer",
    "Coupon",
    "Wishlist",
    "Wallet",
  ],
  // keepUnusedDataFor: 60,
  endpoints: () => ({}),
});
