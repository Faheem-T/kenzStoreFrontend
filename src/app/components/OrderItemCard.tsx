import { Box, Typography } from "@mui/material";
import { ProductPopulatedItem } from "../types/item";
import { CartValidationErrorType } from "../api/orderApi";
import { Link } from "react-router";

export const OrderItemCard = ({
  item,
  error,
}: {
  item: ProductPopulatedItem;
  error?: CartValidationErrorType;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        border: !!error ? 1 : 0,
        borderColor: !!error ? "error.main" : "",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          //   border: 1,

          borderRadius: 1,
          p: 2,
        }}
      >
        <Box sx={{ flex: 0.4 }}>
          <img src={item.productId?.images[0]} width="100%" />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Typography>{item.productId.name}</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            QR {item.price} /-
          </Typography>
          <Typography sx={{ mt: "auto" }}>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              Quantity:
            </Box>{" "}
            {item.quantity}
          </Typography>
        </Box>
      </Box>
      {error && (
        <>
          <Box sx={{ p: 2 }}>
            <Typography variant="caption" color="error">
              {error.error}{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                <Link to="/user/cart">Go to cart?</Link>
              </Box>
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};
