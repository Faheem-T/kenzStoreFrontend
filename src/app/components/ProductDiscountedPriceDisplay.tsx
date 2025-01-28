import { Box, Typography } from "@mui/material";

export const DiscountedPriceDisplay = ({
  price,
  finalPrice,
  smallFont = false,
}: {
  price: number;
  finalPrice: number;
  smallFont?: boolean;
}) => {
  const fontSize = smallFont ? "1em" : "1.5em";
  const isDiscountActive = price !== finalPrice;
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Typography
        // variant={isDiscountActive ? "h6" : "h5"}
        sx={{
          fontWeight: "bold",
          //   fontSize: isDiscountActive ? "1em" : "1.5em",
          fontSize: isDiscountActive ? ".9em" : fontSize,
          textDecoration: isDiscountActive ? "line-through" : "inital",
        }}
        color={isDiscountActive ? "textDisabled" : "textPrimary"}
      >
        QR {price}/-
      </Typography>
      {isDiscountActive && (
        <Typography
          //   variant="h5"
          color="accent.main"
          sx={{ fontWeight: "bold", fontSize }}
        >
          QR {finalPrice}/-
        </Typography>
      )}
    </Box>
  );
};
