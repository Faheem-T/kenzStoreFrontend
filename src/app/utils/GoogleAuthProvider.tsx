import { useEffect } from "react";
import { useGoogleLoginMutation } from "../api/authApi";
import toast from "react-hot-toast";
import { isServerError } from "./serverErrorTypeGuard";
import { useAppDispatch } from "../hooks";
import { userLoggedIn } from "../features/auth/authSlice";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
if (!CLIENT_ID) {
  throw new Error("VITE_GOOGLE_CLIENT_ID not found. set it in your .env");
}

declare global {
  interface Window {
    googleLoginCallback: (user: any) => void;
  }
}
export const GoogleLoginButton = () => {
  const [createGoogleLogin] = useGoogleLoginMutation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Load Google's authentication script dynamically
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Define the callback function
    window.googleLoginCallback = async (payload: any) => {
      // Setting cookie for double submit cookie (csrf protection)
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      const g_csrf_token = "" + array[0];
      document.cookie = `g_csrf_token=${g_csrf_token};secure;SameSite=strict`;
      const { data, error } = await createGoogleLogin({
        credential: payload.credential,
        g_csrf_token,
      });
      if (data) {
        const { accessToken, user } = data.data;
        dispatch(userLoggedIn({ accessToken, user }));
      }

      if (error) {
        if (isServerError(error)) {
          toast.error(error.data.message);
        } else {
          toast.error("Something unexpected occured during Google login");
        }
        return;
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  // return null;
  return (
    <div>
      <div
        id="g_id_onload"
        data-client_id={CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="googleLoginCallback"
        data-auto_prompt="false"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="filled_black"
        data-text="continue_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </div>
  );
};
