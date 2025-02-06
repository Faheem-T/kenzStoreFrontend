import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authReducer from "./features/auth/authSlice";
import createProductReducer from "./features/admin/adminCreateProductSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    createProduct: createProductReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

// Infer type of store
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store
export type AppDispatch = typeof store.dispatch;
// Same for the root state
export type RootState = ReturnType<typeof store.getState>;
