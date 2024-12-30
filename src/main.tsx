import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme"
import { createBrowserRouter, RouterProvider } from "react-router";
import { RegisterPage } from "./app/features/auth/RegisterPage.tsx";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { Toaster } from "react-hot-toast";
const router = createBrowserRouter([
    {
        path: ""
    },
    {
        path: "/test",
        element: <RegisterPage />
    }
]
)


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Toaster
                    position="bottom-left"
                    toastOptions={{
                        className: '',
                        style: {
                            border: '',
                            padding: '8px',
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.secondary.main,
                            fontFamily: theme.typography.fontFamily,
                            textTransform: "uppercase",
                            fontWeight: "500",
                            fontSize: "12px"
                        },
                    }}
                />
                <RouterProvider router={router} />
                {/* <App /> */}
            </ThemeProvider>
        </Provider>
    </StrictMode>
);
