import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SafeUserType, UserType } from "../../types/user";
import { RootState } from "../../store";
import { SafeAdminType } from "@/app/types/admin";
import { authApi } from "@/app/api/authApi";

interface initialStateType {
  accessToken: null | string;
  user: null | SafeUserType | SafeAdminType;
  isAdmin: boolean;
}

const initialState: initialStateType = {
  accessToken: null,
  user: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: SafeUserType | SafeAdminType;
        isAdmin?: boolean;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin || false;
    },
    tokenRefreshed: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
    loggedOut: (state) => {
      state.accessToken = null;
      state.user = null;
    },
    profileUpdated: (state, action: PayloadAction<Partial<SafeUserType>>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      } as SafeUserType;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(authApi.endpoints.me.matchFulfilled, (state, action) => {
  //     const { user, isAdmin = false, accessToken } = action.payload.data;
  //     state.user = user;
  //     state.isAdmin = isAdmin;
  //     state.accessToken = accessToken;
  //   });
  // },
});

export default authSlice.reducer;

export const { userLoggedIn, tokenRefreshed, loggedOut, profileUpdated } =
  authSlice.actions;

// selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAdmin = (state: RootState) => state.auth.isAdmin;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
