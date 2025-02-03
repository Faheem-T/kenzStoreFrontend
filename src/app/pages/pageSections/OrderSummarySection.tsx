import { CartValidationErrorType } from "@/app/api/orderApi";
import { OrderItemCard } from "@/app/components/OrderItemCard";
import { PopulatedCartType } from "@/app/types/cart";
import { Box, Typography, Link } from "@mui/material";
import { createContext, PropsWithChildren, useContext } from "react";
import { Link as RouterLink } from "react-router";

interface OrderSummaryContext {
  cart: PopulatedCartType;
}

const OrderSummaryContext = createContext<OrderSummaryContext | undefined>(
  undefined
);

const useOrderSummaryContext = () => {
  const context = useContext(OrderSummaryContext);
  if (!context) {
    throw new Error("useOrderSummaryContext must be used within OrderSummary");
  }
  return context;
};

interface OrderSummarySectionProps extends PropsWithChildren {
  cart: PopulatedCartType;
}

export const OrderSummary = ({ children, cart }: OrderSummarySectionProps) => {
  return (
    <>
      <OrderSummaryContext.Provider value={{ cart }}>
        {children}
      </OrderSummaryContext.Provider>
    </>
  );
};

OrderSummary.Items = function OrderSummaryItems({
  errors,
}: {
  errors: CartValidationErrorType[];
}) {
  const { cart } = useOrderSummaryContext();

  return (
    <>
      <Box
        sx={{
          p: 4,
          backgroundColor: "background.paper",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography variant="h6">Items</Typography>
        {cart.items.length > 0 ? (
          cart.items.map((item) => (
            <>
              <OrderItemCard
                item={item}
                key={item._id}
                error={errors.find((error) => error.item === item._id)}
              />
            </>
          ))
        ) : (
          <Typography color="textDisabled">
            Your Cart is empty{" "}
            <Link
              component={RouterLink}
              to="/home"
              sx={{
                color: "text.primary",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Continue Shopping?
            </Link>
          </Typography>
        )}
      </Box>
    </>
  );
};

OrderSummary.Total = function OrderSummaryTotal() {
  const { cart } = useOrderSummaryContext();
  const totalItemPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const couponDiscountAmount = totalItemPrice - cart.cartTotal;
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography variant="body2">
        Items price: <Box component="span">QR {totalItemPrice}</Box>
      </Typography>
      <Typography variant="body2">
        Coupon discount:{" "}
        <Typography variant="body2" component="span">
          {"- QR "}
          {couponDiscountAmount}{" "}
        </Typography>
        <Typography variant="caption" color="textDisabled" component="span">
          {"(-"}
          {cart.discountValue +
            (cart.discountType && cart.discountType === "percentage"
              ? "%"
              : "QR")}
          {")"}
        </Typography>
      </Typography>
      <Typography sx={{ fontWeight: "bold" }}>
        Order Total: QR {cart.cartTotal} /-
      </Typography>
    </Box>
  );
};
