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
  const handlePaymentMethodChange = (event: SelectChangeEvent) => {
    setPaymentMethod(event.target.value as PaymentMethod);
  };
  return (
    <Box sx={{ backgroundColor: "background.paper", boxShadow: 3, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Payment Method
      </Typography>
      <Select value={paymentMethod} onChange={handlePaymentMethodChange}>
        <MenuItem value="COD">Cash on Delivery</MenuItem>
        <MenuItem value="creditCard" disabled>
          Credit Card
        </MenuItem>
        <MenuItem value="debitCard" disabled>
          Debit Card
        </MenuItem>
      </Select>
    </Box>
  );
};
