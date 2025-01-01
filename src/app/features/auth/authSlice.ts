import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SafeUserType, UserType } from "../../types/user";
import { RootState } from "../../store";

interface initialStateType {
  accessToken: null | string;
  user: null | Omit<UserType, "password">;
}

const initialState: initialStateType = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: SafeUserType;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    tokenRefreshed: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken
    }
  },
});

export default authSlice.reducer;

export const { userLoggedIn, tokenRefreshed } = authSlice.actions;

// selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
