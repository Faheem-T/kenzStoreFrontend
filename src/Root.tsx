import { Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectUser, userLoggedIn } from "./app/features/auth/authSlice";
import { useEffect, useLayoutEffect } from "react";
import { useMeQuery, useRefreshQuery } from "./app/api/authApi";
import { Navbar } from "./app/components/Navbar";
import { Box } from "@mui/material";
import { LoadingComponent } from "./app/components/LoadingComponent";
import { ThemeProvider } from "./app/components/shadcn-theme-provider";
import { selectIsAdmin } from "./app/features/auth/authSlice";

const Root = () => {
  const user = useAppSelector(selectUser);
  const isAdmin = useAppSelector(selectIsAdmin);
  const dispatch = useAppDispatch();

  // Initial api call that attempt to
  // fetch accessToken and user object
  const { data: meData, isLoading } = useMeQuery();

  useLayoutEffect(() => {
    if (!user) {
      if (meData) {
        const { user, isAdmin = false, accessToken } = meData.data;
        dispatch(userLoggedIn({ user, accessToken, isAdmin }));
      } else {
        console.log("request to /auth/me failed");
      }
    }
  }, [user, meData, isLoading]);

  if (isLoading) return <LoadingComponent fullScreen />;

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {!isAdmin && <Navbar />}
        <Box sx={{ paddingX: 12 }}>
          <Outlet />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Root;
