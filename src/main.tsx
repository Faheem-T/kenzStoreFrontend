import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { createBrowserRouter, RouterProvider } from "react-router";
import { RegisterPage } from "./app/features/auth/RegisterPage.tsx";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { Toaster } from "react-hot-toast";
import { LoginPage } from "./app/features/auth/LoginPage.tsx";
import { Homepage } from "./app/features/user/Homepage.tsx";
import { UnprotectedRoutes } from "./app/components/UnprotectedRoutes.tsx";
import { ProtectedRoutes } from "./app/components/ProtectedRoutes.tsx";
import { Navlink } from "./app/components/Navlink.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                element: <UnprotectedRoutes />,
                children: [
                    {
                        path: "/register",
                        element: <RegisterPage />,
                    },
                    {
                        path: "/login",
                        element: <LoginPage />,
                    },
                ],
            },
            {
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: "/home",
                        element: <Homepage />,
                    },
                ],
            },
            {
                path: "/test",
                element: <Navlink label="Cables" link="/cables" />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
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
                            backgroundColor: theme.palette.secondary.main,
                            fontFamily: theme.typography.fontFamily,
                            textTransform: "uppercase",
                            fontWeight: "500",
                            fontSize: "12px",
                        },
                    }}
                />
                <RouterProvider router={router} />
                {/* <App /> */}
            </ThemeProvider>
        </Provider>
    </StrictMode>
);
