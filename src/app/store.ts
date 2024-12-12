import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

// Infer type of store
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store
export type AppDispatch = typeof store.dispatch;
// Same for the root state
export type RootState = ReturnType<typeof store.getState>;
