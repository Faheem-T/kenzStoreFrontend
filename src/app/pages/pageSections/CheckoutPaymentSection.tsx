import { useGetCartQuery } from "@/app/api/cartApi";
import { LoadingComponent } from "@/app/components/LoadingComponent";
import { PaymentMethod } from "@/app/types/order";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

export const CheckoutPaymentSection = ({
  paymentMethod,
  setPaymentMethod,
}: {
  paymentMethod: PaymentMethod;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
}) => {
  const { data, isLoading } = useGetCartQuery();
  if (isLoading) return <LoadingComponent />;
  if (!data) return <></>;
  const cartTotal = data.data.cartTotal;

  const handlePaymentMethodChange = (event: SelectChangeEvent) => {
    setPaymentMethod(event.target.value as PaymentMethod);
  };
  return (
    <Box sx={{ backgroundColor: "background.paper", boxShadow: 3, p: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Payment Method
      </Typography>
      <Select value={paymentMethod} onChange={handlePaymentMethodChange}>
        {cartTotal > 1000 ? (
          <MenuItem value="COD" disabled>
            Cash on Delivery (Not available for orders above 1000 QR)
          </MenuItem>
        ) : (
          <MenuItem value="COD">Cash on Delivery</MenuItem>
        )}
        <MenuItem value="Credit Card">Credit Card</MenuItem>
        <MenuItem value="Debit Card" disabled>
          Debit Card
        </MenuItem>
      </Select>
    </Box>
  );
};
