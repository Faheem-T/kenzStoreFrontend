import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { ProductType } from "../types/product";
import { AddToCartButton } from "./AddToCartButton";
import { Delete } from "@mui/icons-material";
import { useRemoveFromCartMutation } from "../api/cartApi";
import toast from "react-hot-toast";
import { ServerError } from "../types/serverErrorType";
import { DiscountedPriceDisplay } from "./ProductDiscountedPriceDisplay";

export const CartItemCard = ({
  item,
}: {
  item: { productId: ProductType; quantity: number };
}) => {
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
  const handleRemoveFromCart = async () => {
    const { data, error } = await removeFromCart({
      productId: item.productId._id,
    });
    if (data) {
      toast.success(data.message);
    }
    if (error) {
      const serverError = error as ServerError;
      toast.error(serverError.data.message);
    }
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          gap: 1,
          p: 4,
          alignItems: "center",
          position: "relative",
        }}
      >
        <img src={item.productId.images[0]} width="25%" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: "1.5em" }}>
            {item.productId.name}
          </Typography>
          <DiscountedPriceDisplay
            price={item.productId.price}
            finalPrice={item.productId.finalPrice}
            isDiscountActive={item.productId.isDiscountActive}
            smallFont={true}
          />
        </Box>
        <Box sx={{ ml: "auto" }}>
          <AddToCartButton
            productId={item.productId._id}
            productStock={item.productId.stock}
          />
        </Box>
        <Tooltip title="Remove from cart">
          <IconButton
            onClick={handleRemoveFromCart}
            sx={{ position: "absolute", top: 4, right: 4 }}
            disabled={isLoading}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};
