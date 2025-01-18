import { createBrowserRouter } from "react-router";
import Root from "./Root";
import { UserRoutes } from "./app/components/UserRoutes";
import { UnprotectedRoutes } from "./app/components/UnprotectedRoutes";
import { RegisterPage } from "./app/pages/RegisterPage";
import { OtpVerificationPage } from "./app/pages/OtpVerificationPage";
import { LoginPage } from "./app/pages/LoginPage";
import { AdminCreateCategoryPage } from "./app/pages/adminPages/AdminCreateCategoryPage";
import { AdminUpdateCategoryPage } from "./app/pages/adminPages/AdminUpdateCategoryPage";
import { CategoryOverviewPage } from "./app/pages/adminPages/CategoryOverviewPage";
import { AdminCreateProductPage } from "./app/pages/adminPages/AdminCreateProductPage";
import { AdminUpdateImagePage } from "./app/pages/adminPages/AdminUpdateImagePage";
import { AdminUpdateProductPage } from "./app/pages/adminPages/AdminUpdateProductPage";
import { AdminProductPage } from "./app/pages/adminPages/AdminProductPage";
import { ProductOverviewPage } from "./app/pages/adminPages/ProductOverviewPage";
import { AdminUsersOverviewPage } from "./app/pages/adminPages/AdminUsersOverviewPage";
import { AdminDashboardPage } from "./app/pages/adminPages/AdminDashboardPage";
import { AdminOnlyRoutes } from "./app/components/adminComponents/AdminOnlyRoutes";
import { AdminLoginPage } from "./app/pages/adminPages/AdminLoginPage";
import { ProductDetailsPage } from "./app/pages/ProductDetailsPage";
import { LoadingComponent } from "./app/components/LoadingComponent";
import { Homepage } from "./app/pages/Homepage";
import { ProtectedRoutes } from "./app/components/ProtectedRoutes";
import { UserProfilePage } from "./app/pages/UserProfilePage";
import { UserProfileRoot } from "./app/pages/UserProfileRoot";
import { initialAuthLoader } from "./app/utils/initialAuthLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: initialAuthLoader,
    hydrateFallbackElement: <LoadingComponent fullScreen />,
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
                path: "/register/otp",
                element: <OtpVerificationPage />,
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
              {
                path: "/user/profile",
                element: <UserProfileRoot />,
                children: [
                  {
                    path: "",
                    element: <UserProfilePage />,
                  },
                ],
              },
            ],
          },
          {
            path: "/home",
            // index: true,
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
          // User Paths
          {
            path: "users",
            element: <AdminUsersOverviewPage />,
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
