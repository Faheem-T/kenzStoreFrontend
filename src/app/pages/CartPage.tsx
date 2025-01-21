import { Box, Stack, Typography } from "@mui/material";
import { ShoppingCart } from "lucide-react";
import { useAddToCartMutation, useGetCartQuery } from "../api/cartApi";
import { LoadingComponent } from "../components/LoadingComponent";
import { CartItemCard } from "../components/CartItemCard";

// TODO Create Cart Item component
// TODO "Cart Empty"
// TODO Create Cart Summary component
// TODO Create "Checkout" button
// TODO Create "Clear Cart" button
// TODO Create "Continue Shopping" button ?
export const CartPage = () => {
  const { data, isLoading } = useGetCartQuery();
  //   const [addToCart, { isLoading: isAddToCartLoading }] = useAddToCartMutation();

  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Couldn't fetch cart</Box>;

  const cart = data.data;
  console.log(cart);

  return (
    <>
      <Stack gap={2} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <ShoppingCart size={40} />
          <Typography variant="h5">Your Cart</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {cart.items.map((item) => (
            <CartItemCard item={item} key={item.productId._id} />
          ))}
        </Box>
      </Stack>
    </>
  );
};
