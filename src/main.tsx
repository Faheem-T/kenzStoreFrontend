import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./Root.tsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { createBrowserRouter, RouterProvider } from "react-router";
import { RegisterPage } from "./app/pages/RegisterPage.tsx";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { Toaster } from "react-hot-toast";
import { LoginPage } from "./app/pages/LoginPage.tsx";
import { Homepage } from "./app/features/user/Homepage.tsx";
import { UnprotectedRoutes } from "./app/components/UnprotectedRoutes.tsx";
import { ProtectedRoutes } from "./app/components/ProtectedRoutes.tsx";
import { ProductDetailsPage } from "./app/pages/ProductDetailsPage.tsx";
import { LoadingComponent } from "./app/components/LoadingComponent.tsx";
import { AdminOnlyRoutes } from "./app/components//adminComponents/AdminOnlyRoutes.tsx";
import { AdminDashboardPage } from "./app/pages/adminPages/AdminDashboardPage.tsx";
import { AdminLoginPage } from "./app/pages/adminPages/AdminLoginPage.tsx";
import { ProductOverviewPage } from "./app/pages/adminPages/ProductOverviewPage.tsx";
import { AdminProductPage } from "./app/pages/adminPages/AdminProductPage.tsx";
import { AdminUpdateProductPage } from "./app/pages/adminPages/AdminUpdateProductPage.tsx";
import { AdminCreateProductPage } from "./app/pages/adminPages/AdminCreateProductPage.tsx";
import { AdminUpdateImagePage } from "./app/pages/adminPages/AdminUpdateImagePage.tsx";
import { UserRoutes } from "./app/components/UserRoutes.tsx";
import { CategoryOverviewPage } from "./app/pages/adminPages/CategoryOverviewPage.tsx";
import { AdminCreateCategoryPage } from "./app/pages/adminPages/AdminCreateCategoryPage.tsx";
import { AdminUpdateCategoryPage } from "./app/pages/adminPages/AdminUpdateCategoryPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <UserRoutes />,
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
                path: "/protected",
                element: (
                  <div>You can't see this unless you are logged in 😮 </div>
                ),
              },
            ],
          },
          {
            path: "/home",
            element: <Homepage />,
          },
          {
            path: "/test",
            element: <LoadingComponent fullScreen />,
          },
          {
            path: "/products/:id",
            element: <ProductDetailsPage />,
          },
        ],
      },

      // Admin Related Routes
      {
        path: "/admin/login",
        element: <AdminLoginPage />,
      },
      {
        path: "/admin",
        element: <AdminOnlyRoutes />,
        children: [
          {
            path: "dashboard",
            element: <AdminDashboardPage />,
          },
          // Product Paths
          {
            path: "products",
            element: <ProductOverviewPage />,
          },
          {
            path: "products/:productId",
            element: <AdminProductPage />,
          },
          {
            path: "products/:productId/update",
            element: <AdminUpdateProductPage />,
          },
          {
            path: "products/:productId/update/images",
            element: <AdminUpdateImagePage />,
          },
          {
            path: "products/create",
            element: <AdminCreateProductPage />,
          },
          // Category paths
          {
            path: "categories",
            element: <CategoryOverviewPage />,
          },
          {
            path: "categories/:categoryId",
            element: <div>TODO</div>, // TODO: add category details page
          },
          {
            path: "categories/:categoryId/update",
            element: <AdminUpdateCategoryPage />,
          },
          {
            path: "categories/create",
            element: <AdminCreateCategoryPage />,
          },
        ],
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
  </StrictMode>
);
