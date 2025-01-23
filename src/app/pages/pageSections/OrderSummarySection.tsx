import { CartValidationErrorType } from "@/app/api/orderApi";
import { OrderItemCard } from "@/app/components/OrderItemCard";
import { ProductAndTotalPopulatedCartType } from "@/app/types/cart";
import { Box, Typography } from "@mui/material";
import { createContext, PropsWithChildren, useContext } from "react";

interface OrderSummaryContext {
  cart: ProductAndTotalPopulatedCartType;
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
  cart: ProductAndTotalPopulatedCartType;
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
        {cart.items.map((item) => (
          <>
            <OrderItemCard
              item={item}
              key={item._id}
              error={errors.find((error) => error.item === item._id)}
            />
          </>
        ))}
      </Box>
    </>
  );
};

OrderSummary.Total = function OrderSummaryTotal() {
  const { cart } = useOrderSummaryContext();
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
      <Typography sx={{ fontWeight: "bold" }}>
        Order Total: QR {cart.cartTotal} /-
      </Typography>
    </Box>
  );
};
