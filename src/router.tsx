import { createBrowserRouter } from "react-router";
import { lazy } from "react";

import { WrapinSuspense } from "./app/utils/WrapInSuspense";
import initialAuthLoader from "./app/utils/initialAuthLoader";
import LoadingComponent from "./app/components/LoadingComponent";
import ErrorPage from "./app/pages/ErrorPage";

// Lazy loaded components
import Root from "./Root";
// const UserRoutes = lazy(() => import("./app/components/UserRoutes"));
import UserRoutes from "./app/components/UserRoutes";
// const UnprotectedRoutes = lazy(
//   () => import("./app/components/UnprotectedRoutes")
// );
import UnprotectedRoutes from "./app/components/UnprotectedRoutes";

const RegisterPage = lazy(() => import("./app/pages/RegisterPage"));
const LoginPage = lazy(() => import("./app/pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("./app/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./app/pages/ResetPasswordPage"));
// const ProtectedRoutes = lazy(() => import("./app/components/ProtectedRoutes"));
import ProtectedRoutes from "./app/components/ProtectedRoutes";
const UserProfileRoot = lazy(() => import("./app/pages/UserProfileRoot"));
const UserProfilePage = lazy(() => import("./app/pages/UserProfilePage"));
const UserAddressesPage = lazy(() => import("./app/pages/UserAddressesPage"));
const CartPage = lazy(() => import("./app/pages/CartPage"));
const OrdersPage = lazy(() => import("./app/pages/OrdersPage"));
const OrderDetailsPage = lazy(() => import("./app/pages/OrderDetailsPage"));
const WishlistPage = lazy(() => import("./app/pages/WishlistPage"));
const WalletPage = lazy(() => import("./app/pages/WalletPage"));
const CheckoutPage = lazy(() => import("./app/pages/CheckoutPage"));
const OrderConfirmationPage = lazy(
  () => import("./app/pages/OrderConfirmationPage")
);
// const Homepage = lazy(() => import("./app/pages/Homepage"));
import Homepage from "./app/pages/Homepage";
const ProductDetailsPage = lazy(() => import("./app/pages/ProductDetailsPage"));
// const SearchProductPage = lazy(
//   () => import("./app/pages/SearchProductPage")
// );
import SearchProductPage from "./app/pages/SearchProductPage";
const CategoryProductsPage = lazy(
  () => import("./app/pages/CategoryProductsPage")
);

// Admin Components
// const AdminOnlyRoutes = lazy(
//   () => import("./app/components/adminComponents/AdminOnlyRoutes")
// );
import AdminOnlyRoutes from "./app/components/adminComponents/AdminOnlyRoutes";
const AdminLoginPage = lazy(
  () => import("./app/pages/adminPages/AdminLoginPage")
);
const AdminDashboardPage = lazy(
  () => import("./app/pages/adminPages/AdminDashboardPage")
);
const AdminUsersOverviewPage = lazy(
  () => import("./app/pages/adminPages/AdminUsersOverviewPage")
);
const ProductOverviewPage = lazy(
  () => import("./app/pages/adminPages/ProductOverviewPage")
);
const AdminProductPage = lazy(
  () => import("./app/pages/adminPages/AdminProductPage")
);
const AdminUpdateProductPage = lazy(
  () => import("./app/pages/adminPages/AdminUpdateProductPage")
);
const AdminUpdateImagePage = lazy(
  () => import("./app/pages/adminPages/AdminUpdateImagePage")
);
const AdminCreateProductPage = lazy(
  () => import("./app/pages/adminPages/AdminCreateProductPage")
);
const CategoryOverviewPage = lazy(
  () => import("./app/pages/adminPages/CategoryOverviewPage")
);
const AdminUpdateCategoryPage = lazy(
  () => import("./app/pages/adminPages/AdminUpdateCategoryPage")
);
const AdminCreateCategoryPage = lazy(
  () => import("./app/pages/adminPages/AdminCreateCategoryPage")
);
const AdminOrderOverviewPage = lazy(
  () => import("./app/pages/adminPages/AdminOrderOverviewPage")
);
const AdminProductOffersPage = lazy(
  () => import("./app/pages/adminPages/AdminProductOffersPage")
);
const AdminCategoryOffersPage = lazy(
  () => import("./app/pages/adminPages/AdminCategoryOffersPage")
);
const AdminCreateOfferPage = lazy(
  () => import("./app/pages/adminPages/AdminCreateOfferPage")
);
const AdminCouponPage = lazy(
  () => import("./app/pages/adminPages/AdminCouponPage")
);
const AdminCreateCouponPage = lazy(
  () => import("./app/pages/adminPages/AdminCreateCouponPage")
);

export const router = createBrowserRouter([
  {
    path: "/",
    loader: initialAuthLoader,
    hydrateFallbackElement: <LoadingComponent fullScreen />,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <UserRoutes />,
        children: [
          {
            element: <UnprotectedRoutes />,
            children: [
              { path: "/register", element: WrapinSuspense(<RegisterPage />) },
              { path: "/login", element: WrapinSuspense(<LoginPage />) },
              {
                path: "/forgot-password",
                element: WrapinSuspense(<ForgotPasswordPage />),
              },
              {
                path: "/reset-password",
                element: WrapinSuspense(<ResetPasswordPage />),
              },
            ],
          },
          {
            element: <ProtectedRoutes />,
            children: [
              {
                path: "/user",
                element: WrapinSuspense(<UserProfileRoot />),
                children: [
                  {
                    path: "profile",
                    element: WrapinSuspense(<UserProfilePage />),
                  },
                  {
                    path: "addresses",
                    element: WrapinSuspense(<UserAddressesPage />),
                  },
                  { path: "cart", element: WrapinSuspense(<CartPage />) },
                  { path: "orders", element: WrapinSuspense(<OrdersPage />) },
                  {
                    path: "orders/:orderId",
                    element: WrapinSuspense(<OrderDetailsPage />),
                  },
                  {
                    path: "wishlist",
                    element: WrapinSuspense(<WishlistPage />),
                  },
                  { path: "wallet", element: WrapinSuspense(<WalletPage />) },
                ],
              },
              { path: "/checkout", element: WrapinSuspense(<CheckoutPage />) },
              {
                path: "/order-confirmation",
                element: WrapinSuspense(<OrderConfirmationPage />),
              },
            ],
          },
          { path: "/", element: <Homepage /> },
          {
            path: "/products/:id",
            element: WrapinSuspense(<ProductDetailsPage />),
          },
          // { path: "/search", element: WrapinSuspense(<SearchProductPage />) },
          { path: "/search", element: <SearchProductPage /> },
          {
            path: "/categories/:slug",
            element: WrapinSuspense(<CategoryProductsPage />),
          },
        ],
      },

      // Admin Related Routes
      { path: "/admin/login", element: WrapinSuspense(<AdminLoginPage />) },
      {
        path: "/admin",
        element: <AdminOnlyRoutes />,
        children: [
          {
            path: "dashboard",
            element: WrapinSuspense(<AdminDashboardPage />),
          },
          {
            path: "users",
            element: WrapinSuspense(<AdminUsersOverviewPage />),
          },
          {
            path: "products",
            element: WrapinSuspense(<ProductOverviewPage />),
          },
          {
            path: "products/:productId",
            element: WrapinSuspense(<AdminProductPage />),
          },
          {
            path: "products/:productId/update",
            element: WrapinSuspense(<AdminUpdateProductPage />),
          },
          {
            path: "products/:productId/update/images",
            element: WrapinSuspense(<AdminUpdateImagePage />),
          },
          {
            path: "products/create",
            element: WrapinSuspense(<AdminCreateProductPage />),
          },
          {
            path: "categories",
            element: WrapinSuspense(<CategoryOverviewPage />),
          },
          {
            path: "categories/:categoryId/update",
            element: WrapinSuspense(<AdminUpdateCategoryPage />),
          },
          {
            path: "categories/create",
            element: WrapinSuspense(<AdminCreateCategoryPage />),
          },
          {
            path: "orders",
            element: WrapinSuspense(<AdminOrderOverviewPage />),
          },
          {
            path: "orders/:orderId",
            element: WrapinSuspense(<OrderDetailsPage isAdmin />),
          },

          {
            path: "offers",
            element: WrapinSuspense(<AdminProductOffersPage />),
          },
          {
            path: "offers/products",
            element: WrapinSuspense(<AdminProductOffersPage />),
          },
          {
            path: "offers/categories",
            element: WrapinSuspense(<AdminCategoryOffersPage />),
          },
          {
            path: "offers/products/create",
            element: WrapinSuspense(<AdminCreateOfferPage type="product" />),
          },
          {
            path: "offers/categories/create",
            element: WrapinSuspense(<AdminCreateOfferPage type="category" />),
          },
          { path: "coupons", element: WrapinSuspense(<AdminCouponPage />) },
          {
            path: "coupons/create",
            element: WrapinSuspense(<AdminCreateCouponPage />),
          },
        ],
      },
    ],
  },
]);
