import { Box, Button, TextField, Typography } from "@mui/material";
import {
  useApplyCouponToCartMutation,
  useGetApplicableCouponsQuery,
} from "../api/couponApi";
import { LoadingComponent } from "./LoadingComponent";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export const ApplicableCoupons = () => {
  const { data, isLoading } = useGetApplicableCouponsQuery();
  if (isLoading) return <LoadingComponent />;
  if (!data) return <Box>Couldn't fetch applicable coupons</Box>;

  const coupons = data.data;

  const couponComponent = coupons.map((coupon) => (
    <Box
      key={coupon._id}
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
      {coupons.length > 0 ? (
        <EnterCodeInput />
      ) : (
        <Typography variant="caption" color="textDisabled" flexWrap={"wrap"}>
          A coupon has already been applied or no applicable coupons found...
        </Typography>
      )}
      {couponComponent}
    </Box>
  );
};

const applyCouponSchema = z.object({
  code: z.string().trim().nonempty("Please enter a code"),
});

type ApplyCouponForm = z.infer<typeof applyCouponSchema>;

const EnterCodeInput = () => {
  const [applyCoupon, { isLoading }] = useApplyCouponToCartMutation();
  const form = useForm<ApplyCouponForm>({
    resolver: zodResolver(applyCouponSchema),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const submitHandler = async (data: ApplyCouponForm) => {
    try {
      await applyCoupon(data.code).unwrap();
      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error("That did not work...");
    }
  };

  return (
    <Box
      sx={{ my: 5, display: "flex", gap: 1 }}
      noValidate
      component="form"
      onSubmit={handleSubmit(submitHandler)}
    >
      <TextField
        {...register("code")}
        placeholder="Enter a coupon code"
        name="code"
        variant="standard"
        error={!!errors.code}
        helperText={errors.code?.message}
      />
      <Button type="submit" disabled={isLoading}>
        Apply
      </Button>
    </Box>
  );
};
