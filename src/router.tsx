import { createBrowserRouter } from "react-router";
import { lazy } from "react";

import { WrapinSuspense } from "./app/utils/WrapInSuspense";
import initialAuthLoader from "./app/utils/initialAuthLoader";
import LoadingComponent from "./app/components/LoadingComponent";
import ErrorPage from "./app/pages/ErrorPage";

// Lazy loaded components
const Root = lazy(() => import("./Root"));
const UserRoutes = lazy(() => import("./app/components/UserRoutes"));
const UnprotectedRoutes = lazy(
  () => import("./app/components/UnprotectedRoutes")
);
const RegisterPage = lazy(() => import("./app/pages/RegisterPage"));
const OtpVerificationPage = lazy(
  () => import("./app/pages/OtpVerificationPage")
);
const LoginPage = lazy(() => import("./app/pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("./app/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./app/pages/ResetPasswordPage"));
const ProtectedRoutes = lazy(() => import("./app/components/ProtectedRoutes"));
const UserProfileRoot = lazy(() => import("./app/pages/UserProfileRoot"));
const UserProfilePage = lazy(() => import("./app/pages/UserProfilePage"));
const UserAddressesPage = lazy(() => import("./app/pages/UserAddressesPage"));
const CartPage = lazy(() => import("./app/pages/CartPage"));
const OrdersPage = lazy(() => import("./app/pages/OrdersPage"));
const WishlistPage = lazy(() => import("./app/pages/WishlistPage"));
const WalletPage = lazy(() => import("./app/pages/WalletPage"));
const CheckoutPage = lazy(() => import("./app/pages/CheckoutPage"));
const OrderConfirmationPage = lazy(
  () => import("./app/pages/OrderConfirmationPage")
);
const Homepage = lazy(() => import("./app/pages/Homepage"));
const ProductDetailsPage = lazy(() => import("./app/pages/ProductDetailsPage"));
const SearchProductPage = lazy(() => import("./app/pages/SearchProductPage"));
const CategoryProductsPage = lazy(
  () => import("./app/pages/CategoryProductsPage")
);

// Admin Components
const AdminOnlyRoutes = lazy(
  () => import("./app/components/adminComponents/AdminOnlyRoutes")
);
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
    element: WrapinSuspense(<Root />),
    errorElement: <ErrorPage />,
    children: [
      {
        element: WrapinSuspense(<UserRoutes />),
        children: [
          {
            element: WrapinSuspense(<UnprotectedRoutes />),
            children: [
              { path: "/register", element: WrapinSuspense(<RegisterPage />) },
              {
                path: "/register/otp",
                element: WrapinSuspense(<OtpVerificationPage />),
              },
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
            element: WrapinSuspense(<ProtectedRoutes />),
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
          { path: "/", element: WrapinSuspense(<Homepage />) },
          {
            path: "/products/:id",
            element: WrapinSuspense(<ProductDetailsPage />),
          },
          { path: "/search", element: WrapinSuspense(<SearchProductPage />) },
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
        element: WrapinSuspense(<AdminOnlyRoutes />),
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
