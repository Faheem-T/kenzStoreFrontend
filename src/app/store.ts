import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import authReducer from "./features/auth/authSlice";
import { apiSlice } from "./api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  }
});

// Infer type of store
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store
export type AppDispatch = typeof store.dispatch;
// Same for the root state
export type RootState = ReturnType<typeof store.getState>;
