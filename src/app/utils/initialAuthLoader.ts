import { authApi } from "../api/authApi";
import { userLoggedIn } from "../features/auth/authSlice";
import { store } from "../store";

export const initialAuthLoader = async () => {
  const { data, error } = await store.dispatch(authApi.endpoints.me.initiate());
  if (data) {
    const { accessToken, isAdmin = false, user } = data.data;
    store.dispatch(userLoggedIn({ accessToken, user, isAdmin }));
    return null;
  } else {
    console.log(error);
    return null;
  }
};
