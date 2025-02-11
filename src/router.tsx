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
import { UserAddressesPage } from "./app/pages/UserAddressesPage";
import { CartPage } from "./app/pages/CartPage";
import { CheckoutPage } from "./app/pages/CheckoutPage";
import { OrderConfirmationPage } from "./app/pages/OrderConfirmationPage";
import { OrdersPage } from "./app/pages/OrdersPage";
import { AdminOrderOverviewPage } from "./app/pages/adminPages/AdminOrderOverviewPage";
import { SearchProductPage } from "./app/pages/SearchProductPage";
import { ForgotPasswordPage } from "./app/pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./app/pages/ResetPasswordPage";
import { AdminProductOffersPage } from "./app/pages/adminPages/AdminProductOffersPage";
import { AdminCreateOfferPage } from "./app/pages/adminPages/AdminCreateOfferPage";
import { AdminCategoryOffersPage } from "./app/pages/adminPages/AdminCategoryOffersPage";
import { AdminCouponPage } from "./app/pages/adminPages/AdminCouponPage";
import { AdminCreateCouponPage } from "./app/pages/adminPages/AdminCreateCouponPage";
import { WishlistPage } from "./app/pages/WishlistPage";
import { WalletPage } from "./app/pages/WalletPage";
import { InvoiceDocument } from "./app/utils/invoicePDF";
import { PDFViewer } from "@react-pdf/renderer";

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
              {
                path: "/forgot-password",
                element: <ForgotPasswordPage />,
              },
              {
                path: "/reset-password",
                element: <ResetPasswordPage />,
              },
            ],
          },
          {
            element: <ProtectedRoutes />,
            children: [
              {
                path: "/user",
                element: <UserProfileRoot />,
                children: [
                  {
                    path: "profile",
                    element: <UserProfilePage />,
                  },
                  {
                    path: "addresses",
                    element: <UserAddressesPage />,
                  },
                  {
                    path: "cart",
                    element: <CartPage />,
                  },
                  {
                    path: "orders",
                    element: <OrdersPage />,
                  },
                  {
                    path: "wishlist",
                    element: <WishlistPage />,
                  },
                  {
                    path: "wallet",
                    element: <WalletPage />,
                  },
                ],
              },
              {
                path: "/checkout",
                element: <CheckoutPage />,
              },
              {
                path: "/order-confirmation",
                element: <OrderConfirmationPage />,
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
            element: (
              <PDFViewer width="100%" height="800px">
                <InvoiceDocument
                  order={{
                    address: {
                      address_line:
                        "Some very long address line that is just absurd",
                      city: "Lil City",
                      state: "Big",
                      pincode: 224442,
                    },
                    _id: "67aadca217b2813645bee800",
                    userId: "6785d7239dbfaa808380aa32",
                    items: [
                      {
                        productId: {
                          _id: "6776c13a8b6c48fdcb191814",
                          name: "Logitech C505 HD Webcam",
                          description:
                            "HD 720p webcam with long-range microphone, supporting clear conversations up to 3 meters away",
                          images: [
                            "https://res.cloudinary.com/dlicxnblg/image/upload/v1737720148/z4vfghqsz80r5t3stumn.png",
                            "https://res.cloudinary.com/dlicxnblg/image/upload/v1736698909/siv9ioyvcxduhk6dticg.webp",
                            "https://res.cloudinary.com/dlicxnblg/image/upload/v1735835309/t8eohjybmwehxkgxfdyz.png",
                          ],
                          effectiveDiscount: null,
                        },
                        price: 34.99,
                        quantity: 2,
                        _id: "67aadc8717b2813645bee793",
                      },
                      {
                        productId: {
                          _id: "6778d5f86fe6c7dddd18def3",
                          name: "Logitech H540 USB Computer Headset",
                          description:
                            "USB headset with noise-cancelling microphone, designed for clear communication and comfortable computer use",
                          images: [
                            "https://res.cloudinary.com/dlicxnblg/image/upload/v1736699327/pzgcod0pyvazqkmswmci.webp",
                            "https://res.cloudinary.com/dlicxnblg/image/upload/v1735972095/sw2ag1fbuba634mk8kq9.png",
                            "https://res.cloudinary.com/dlicxnblg/image/upload/v1736699329/loepdwjfr39zsfgjcpzt.webp",
                          ],
                          effectiveDiscount: null,
                        },
                        price: 59.99,
                        quantity: 1,
                        _id: "67aadc8c17b2813645bee7b7",
                      },
                      {
                        productId: {
                          _id: "679373fb444d9e97fe0af1a8",
                          name: "new",
                          description: "new",
                          images: [
                            "https://res.cloudinary.com/dlicxnblg/image/upload/v1737716727/wktrrxwvfbmschul7keh.png",
                            "https://res.cloudinary.com/dlicxnblg/image/upload/v1737716729/zotrjnua5zbbqming9du.jpg",
                            "https://res.cloudinary.com/dlicxnblg/image/upload/v1737716730/pdmpbjmg7xkfwijvz0ow.jpg",
                          ],
                          effectiveDiscount: null,
                        },
                        price: 140,
                        quantity: 2,
                        _id: "67aadc9317b2813645bee7d4",
                      },
                    ],
                    coupon: null,
                    discountType: null,
                    discountValue: 0,
                    status: "completed",
                    paymentMethod: "Credit Card",
                    paymentOrder: {
                      amount: 40997,
                      amount_due: 40997,
                      amount_paid: 0,
                      attempts: 0,
                      created_at: 1739251191,
                      currency: "QAR",
                      entity: "order",
                      id: "order_PuHlmmdH0Fwkdn",
                      notes: [],
                      offer_id: null,
                      receipt: null,
                      status: "created",
                    },
                    paymentStatus: "paid",
                    createdAt: new Date("2025-02-11T05:14:10.306Z"),
                    updatedAt: new Date("2025-02-11T05:22:24.610Z"),
                    totalPrice: 409.97,
                  }}
                />
              </PDFViewer>
            ),
          },
          {
            path: "/products/:id",
            element: <ProductDetailsPage />,
          },
          {
            // path: "/search?sort=:sort&sortBy=:sortBy",
            path: "/search",
            element: <SearchProductPage />,
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
          // Order paths
          {
            path: "orders",
            element: <AdminOrderOverviewPage />,
          },
          // Offer paths
          {
            path: "offers",
            element: <AdminProductOffersPage />,
          },
          {
            path: "offers/products",
            element: <AdminProductOffersPage />,
          },
          {
            path: "offers/categories",
            element: <AdminCategoryOffersPage />,
          },
          {
            path: "offers/products/create",
            element: <AdminCreateOfferPage type="product" />,
          },
          {
            path: "offers/categories/create",
            element: <AdminCreateOfferPage type="category" />,
          },

          // Coupon Paths
          {
            path: "coupons",
            element: <AdminCouponPage />,
          },
          {
            path: "coupons/create",
            element: <AdminCreateCouponPage />,
          },
        ],
      },
    ],
  },
]);
