import { Box, Button, TextField, Typography } from "@mui/material";
import { useGetApplicableCouponsQuery } from "../api/couponApi";
import { LoadingComponent } from "./LoadingComponent";

export const ApplicableCoupons = () => {
  const { data, isLoading } = useGetApplicableCouponsQuery();
  if (isLoading) return <LoadingComponent />;
  if (!data) return <Box>Couldn't fetch applicable coupons</Box>;

  const coupons = data.data;

  const couponComponent = coupons.map((coupon) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        borderRadius: 2,
        bgcolor: "secondary.main",
        p: 2,
        "& > *": { fontSize: 12 },
      }}
    >
      <Typography sx={{ fontSize: 14 }}>{coupon.code}</Typography>
      <Typography sx={{ fontWeight: "bold", fontSize: 12 }}>
        -{coupon.discountValue}%
      </Typography>
      <Typography color="textDisabled" variant="caption">
        {coupon.name}
      </Typography>
    </Box>
  ));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        bgcolor: "background.paper",
        p: 4,
        m: 2,
      }}
    >
      <Typography variant="h6">
        Applicable Coupons {"("}
        {coupons.length}
        {")"}
      </Typography>
      <EnterCodeInput />
      {couponComponent}
    </Box>
  );
};

const EnterCodeInput = () => {
  return (
    <Box sx={{ my: 5, display: "flex", gap: 1 }}>
      <TextField
        placeholder="Enter a coupon code"
        name="couponCode"
        variant="standard"
      />
      <Button>Apply</Button>
    </Box>
  );
};
