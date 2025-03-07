import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ShoppingCart } from "lucide-react";
import { useClearCartMutation, useGetCartQuery } from "../api/cartApi";
import LoadingComponent from "../components/LoadingComponent";
import { CartItemCard } from "../components/CartItemCard";
import { PopulatedCartType } from "../types/cart";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ServerError } from "../types/serverErrorType";
import { ApplicableCoupons } from "../components/ApplicableCouponsSection";
import { useDeleteCouponFromCartMutation } from "../api/couponApi";

const CartPage = () => {
  const { data, isLoading } = useGetCartQuery();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isLoading) return <LoadingComponent fullScreen />;

  let cart;
  if (!data) cart = { items: [] };
  else {
    cart = data.data;
  }

  return (
    <Container maxWidth="xl" disableGutters={isMobile}>
      <Box
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          width: "100%",
        }}
      >
        {/* Cart Header */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            mb: { xs: 2, sm: 3 },
          }}
        >
          <ShoppingCart size={isMobile ? 28 : 40} />
          <Typography variant={isMobile ? "h6" : "h5"}>Your Cart</Typography>
          {cart?.items.length ? (
            <Box sx={{ ml: "auto" }}>
              <ClearCartButton />
            </Box>
          ) : null}
        </Box>

        {/* Cart Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            minWidth: { xs: "unset", md: 500 },
          }}
        >
          {cart?.items.length ? (
            <>
              {/* Cart Items Section */}
              <Stack
                gap={2}
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  flex: 2,
                  backgroundColor: "background.paper",
                  m: { xs: 0, sm: 1, md: 2 },
                  mb: { xs: 2, md: 2 },
                  height: "fit-content",
                  borderRadius: 1,
                  boxShadow: 1,
                }}
                divider={<Divider />}
              >
                {cart.items.map((item) => (
                  <CartItemCard item={item} key={item.productId._id} />
                ))}
              </Stack>

              {/* Cart Summary Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { xs: "100%", md: "auto" },
                }}
              >
                <CartSummary cart={cart as PopulatedCartType} />
                <ApplicableCoupons />
              </Box>
            </>
          ) : (
            /* Empty Cart Message */
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: 2,
                height: { xs: "60vh", sm: "70vh", md: "90vh" },
                width: "100%",
              }}
            >
              <Typography
                variant={isMobile ? "h4" : "h3"}
                color="textDisabled"
                align="center"
              >
                Your cart is empty
              </Typography>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                align="center"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    textDecoration: "underline",
                  },
                  mt: 2,
                }}
              >
                <Link to="/">Continue Shopping</Link>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

const CartSummary = ({ cart }: { cart: PopulatedCartType }) => {
  const [deleteCoupon, { isLoading }] = useDeleteCouponFromCartMutation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  let totalItemsCount = 0;
  let totalItemPrice = 0;

  for (let i = 0; i < cart.items.length; i++) {
    totalItemsCount += cart.items[i].quantity;
    totalItemPrice += cart.items[i].price * cart.items[i].quantity;
  }
  totalItemPrice = Math.floor(totalItemPrice * 100) / 100;

  const couponDiscountAmount =
    Math.floor((totalItemPrice - cart.cartTotal) * 100) / 100;

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Stack
        gap={1}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          backgroundColor: "background.paper",
          height: "fit-content",
          minWidth: { xs: "unset", md: 250 },
          width: { xs: "100%", md: "auto" },
          flex: { xs: "unset", md: 0.5 },
          m: { xs: 0, sm: 1, md: 2 },
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Typography variant={isMobile ? "subtitle1" : "h6"}>
          Cart Summary{" "}
          <Typography variant="caption" color="textDisabled" noWrap>
            {`(${totalItemsCount} Item` +
              (totalItemsCount === 1 ? "" : "s") +
              ")"}
          </Typography>
        </Typography>

        {/* Coupon Section */}
        {cart.coupon && (
          <>
            <Typography variant="body2">
              Items price: <Box component="span">₹ {totalItemPrice}</Box>
            </Typography>
            <Typography variant="body2">
              Coupon discount:{" "}
              <Typography variant="body2" component="span">
                {"- ₹ "}
                {couponDiscountAmount}{" "}
              </Typography>
              <Typography
                variant="caption"
                color="textDisabled"
                component="span"
              >
                {"(-"}
                {cart.discountValue +
                  (cart.discountType && cart.discountType === "percentage"
                    ? "%"
                    : "₹")}
                {")"}
              </Typography>
            </Typography>
            <Typography
              variant="caption"
              color="textDisabled"
              sx={{
                "&:hover": { textDecoration: "underline", cursor: "pointer" },
              }}
              onClick={() => deleteCoupon()}
            >
              {isLoading ? "Deleting..." : "Delete coupon"}
            </Typography>
          </>
        )}

        {/* Total Price & Checkout Button */}
        <Typography variant="body1" sx={{ mt: 1 }}>
          Total Price:{" "}
          <Box component="span" sx={{ fontWeight: "bold" }}>
            ₹ {cart.cartTotal}
          </Box>
        </Typography>
        <Button
          variant="contained"
          onClick={handleCheckoutClick}
          size={isMobile ? "medium" : "large"}
          sx={{ mt: 1 }}
        >
          Checkout
        </Button>
      </Stack>
    </>
  );
};

const ClearCartButton = () => {
  const [clearCart, { isLoading }] = useClearCartMutation();

  const handleClearCartClick = async () => {
    if (!isLoading) {
      const { data, error } = await clearCart();
      if (data) {
        toast.success(data.message);
      }
      if (error) {
        const serverError = error as ServerError;
        toast.error(serverError.data.message);
      }
    }
  };

  return (
    <Typography
      variant="caption"
      color="textDisabled"
      sx={{
        "&:hover": {
          cursor: "pointer",
          textDecoration: "underline",
        },
        display: "inline-block",
      }}
      onClick={handleClearCartClick}
    >
      {isLoading ? "Clearing cart..." : "Clear Cart"}
    </Typography>
  );
};

export default CartPage;
