import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { RouterProvider } from "react-router";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { Toaster } from "react-hot-toast";
import { GoogleAuthProvider } from "./app/utils/GoogleAuthProvider.tsx";
import { router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleAuthProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster
            position="bottom-left"
            toastOptions={{
              className: "",
              style: {
                border: "",
                padding: "8px",
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
                fontFamily: theme.typography.fontFamily,
                textTransform: "uppercase",
                fontWeight: "500",
                fontSize: "12px",
              },
            }}
          />
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </GoogleAuthProvider>
  </StrictMode>
);
