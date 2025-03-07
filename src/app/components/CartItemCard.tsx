import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
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
  item: {
    _id: string;
    productId: Partial<ProductType>;
    price: number;
    quantity: number;
  };
}) => {
  const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();
  const product = item.productId as ProductType;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRemoveFromCart = async () => {
    const { data, error } = await removeFromCart({
      productId: product._id,
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
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 3 },
          p: { xs: 2, sm: 3, md: 4 },
          alignItems: { xs: "flex-start", sm: "center" },
          position: "relative",
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        {/* Product Image */}
        <Box
          sx={{
            width: { xs: "100%", sm: "25%" },
            maxWidth: { xs: "200px", sm: "25%" },
            alignSelf: { xs: "center", sm: "flex-start" },
          }}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            style={{
              width: "100%",
              borderRadius: "4px",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Product Details */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            justifyContent: "center",
            width: { xs: "100%", sm: "auto" },
            mt: { xs: 1, sm: 0 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.2em", sm: "1.3em", md: "1.5em" },
              fontWeight: "medium",
              pr: { xs: 4, sm: 0 }, // Space for delete button on mobile
            }}
          >
            {product.name}
          </Typography>

          <DiscountedPriceDisplay
            price={product.price}
            finalPrice={product.finalPrice}
            smallFont={isMobile}
          />
        </Box>

        {/* Add to Cart Button */}
        <Box
          sx={{
            ml: { xs: 0, sm: "auto" },
            mt: { xs: 2, sm: 0 },
            width: { xs: "100%", sm: "auto" },
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-end" },
          }}
        >
          <AddToCartButton
            productId={product._id}
            productStock={product.stock}
          />
        </Box>

        {/* Delete Button */}
        <Tooltip title="Remove from cart">
          <IconButton
            onClick={handleRemoveFromCart}
            sx={{
              position: { xs: "absolute", sm: "absolute" },
              top: { xs: 8, sm: 8 },
              right: { xs: 8, sm: 8 },
            }}
            disabled={isLoading}
            size={isMobile ? "small" : "medium"}
          >
            <Delete fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};
