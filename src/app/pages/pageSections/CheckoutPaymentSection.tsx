import { useGetCartQuery } from "@/app/api/cartApi";
import LoadingComponent from "@/app/components/LoadingComponent";
import { PaymentMethod } from "@/app/types/order";
import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export const CheckoutPaymentSection = ({
  paymentMethod,
  setPaymentMethod,
}: {
  paymentMethod: PaymentMethod;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
}) => {
  const { data, isLoading } = useGetCartQuery();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isLoading) return <LoadingComponent />;
  if (!data) return <Box>Could not load payment options</Box>;

  const cartTotal = data.data.cartTotal;

  const handlePaymentMethodChange = (
    event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(event.target.value as PaymentMethod);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        backgroundColor: "background.paper",
        borderRadius: 1,
        width: "100%",
        boxShadow: 1,
      }}
    >
      <Typography
        variant={isMobile ? "h6" : "h5"}
        fontWeight="medium"
        sx={{ mb: { xs: 2, md: 3 } }}
      >
        Payment Method
      </Typography>

      {isMobile ? (
        <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
          <Select
            value={paymentMethod}
            onChange={
              handlePaymentMethodChange as (
                event: SelectChangeEvent<string>
              ) => void
            }
            displayEmpty
            sx={{ width: "100%" }}
          >
            <MenuItem value="cod" disabled={cartTotal > 1000}>
              Cash on Delivery{" "}
              {cartTotal > 1000
                ? "(Not available for orders above 1000 ₹)"
                : ""}
            </MenuItem>
            <MenuItem value="online">Online Payment</MenuItem>
            <MenuItem value="wallet">Wallet</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <RadioGroup
          value={paymentMethod}
          onChange={
            handlePaymentMethodChange as (
              event: React.ChangeEvent<HTMLInputElement>
            ) => void
          }
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            ml: 1,
          }}
        >
          <FormControlLabel
            value="cod"
            control={<Radio />}
            label={
              <Box>
                <Typography>Cash on Delivery</Typography>
                {cartTotal > 1000 && (
                  <Typography variant="caption" color="error.main">
                    Not available for orders above 1000 ₹
                  </Typography>
                )}
              </Box>
            }
            disabled={cartTotal > 1000}
          />
          <FormControlLabel
            value="online"
            control={<Radio />}
            label="Online Payment"
          />
          <FormControlLabel value="wallet" control={<Radio />} label="Wallet" />
        </RadioGroup>
      )}
    </Box>
  );
};
