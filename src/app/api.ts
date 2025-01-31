import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { loggedOut, tokenRefreshed } from "./features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api/",
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
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If "Forbidden" (401) request the refresh route
  if (result.error?.status === 401) {
    // refresh route for "user" role
    let refreshRoute = "v1/auth/refresh";
    if ((api.getState() as RootState).auth.isAdmin) {
      refreshRoute = "v1/admin/auth/refresh";
    }
    const refreshResult = await baseQuery(refreshRoute, api, extraOptions);
    if (refreshResult.data) {
      const refreshData = refreshResult.data as {
        success: boolean;
        data: { accessToken: string };
      };
      // console.log("Refresh Result: ", refreshData);
      // store new token
      api.dispatch(
        tokenRefreshed({ accessToken: refreshData.data.accessToken })
      );
      // retry initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(loggedOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
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
  ],
  // keepUnusedDataFor: 60,
  endpoints: () => ({}),
});
