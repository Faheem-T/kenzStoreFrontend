import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { ShoppingCart } from "lucide-react";
import { useClearCartMutation, useGetCartQuery } from "../api/cartApi";
import { LoadingComponent } from "../components/LoadingComponent";
import { CartItemCard } from "../components/CartItemCard";
import { ProductAndTotalPopulatedCartType } from "../types/cart";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ServerError } from "../types/serverErrorType";

// DONE Create Cart Item component
// DONE "Cart Empty"
// DONE Create Cart Summary component
// DONE Create "Checkout" button
// DONE Create "Clear Cart" button
// TODO Create "Continue Shopping" button ?
export const CartPage = () => {
  const { data, isLoading } = useGetCartQuery();
  //   const [addToCart, { isLoading: isAddToCartLoading }] = useAddToCartMutation();

  if (isLoading) return <LoadingComponent fullScreen />;
  let content;
  let cart;
  if (!data) cart = { items: [] };
  else {
    cart = data.data;
  }
  return (
    <Box sx={{ px: 4, py: 2, width: "100vw" }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <ShoppingCart size={40} />
        <Typography variant="h5">Your Cart</Typography>
      </Box>
      {cart.items.length ? <ClearCartButton /> : null}
      <Box sx={{ display: "flex", minWidth: 500 }}>
        {cart.items.length ? (
          <>
            <Stack
              gap={2}
              sx={{
                p: 4,
                flex: 2,
                backgroundColor: "background.paper",
                m: 2,
              }}
              divider={<Divider />}
            >
              {cart.items.map((item) => (
                <CartItemCard item={item} key={item.productId._id} />
              ))}
              {/* TODO make a compound component out of `CartSummary` and display the `cartTotal` here */}
            </Stack>
            <CartSummary cart={cart} />
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 2,
              height: "90vh",
              width: "100%",
            }}
          >
            <Typography variant="h3" color="textDisabled">
              Your cart is empty
            </Typography>
            <Typography
              variant="h4"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  textDecoration: "underline",
                },
              }}
            >
              <Link to="/home">Continue Shopping</Link>
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const CartSummary = ({ cart }: { cart: ProductAndTotalPopulatedCartType }) => {
  const total = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Stack
        gap={1}
        sx={{
          p: 4,
          backgroundColor: "background.paper",
          height: "fit-content",
          minWidth: 250,
          flex: 0.5,
          m: 2,
        }}
      >
        <Typography variant="h6">
          Cart Summary{" "}
          <Typography variant="caption" color="textDisabled" noWrap>
            {`(${total} Item` + (total === 1 ? "" : "s") + ")"}
          </Typography>
        </Typography>
        <Typography variant="body1">
          Total Price:{" "}
          <Box component="span" sx={{ fontWeight: "bold" }}>
            QR {cart.cartTotal}
          </Box>
        </Typography>
        <Button variant="contained" onClick={handleCheckoutClick}>
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
      }}
      onClick={handleClearCartClick}
    >
      {isLoading ? "Clearing cart..." : "Clear Cart"}
    </Typography>
  );
};
