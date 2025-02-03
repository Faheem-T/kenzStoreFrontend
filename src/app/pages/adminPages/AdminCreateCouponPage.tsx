import { useCreateCouponMutation } from "@/app/api/couponApi";
import { InputDate } from "@/app/components/InputDate";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";

const couponSchema = z.object({
  name: z.string().trim().nonempty("Name is required"),
  code: z.string().trim().nonempty("Code is required"),
  discountAmount: z
    .number()
    .min(0, "Discount Percentage cannot be less than 0")
    .max(100, "Discount Percentage cannot be more than 100"),
  description: z.string().optional(),
  limitPerUser: z
    .number()
    .min(0, "Limit per user cannot be less than 0")
    .optional(),
  minOrderAmount: z
    .number()
    .min(0, "Min Order Amount cannot be less than 0")
    .optional(),
  validUntil: z.date().optional(),
});

type CouponForm = z.infer<typeof couponSchema>;

export const AdminCreateCouponPage = () => {
  const [createCoupon, { isLoading }] = useCreateCouponMutation();
  const navigate = useNavigate();
  const form = useForm<CouponForm>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      minOrderAmount: 0,
      limitPerUser: 1,
    },
  });

  const {
    control,
    register,
    formState: { errors },

    handleSubmit,
    watch,
  } = form;

  const validUntil = watch("validUntil");
  useEffect(() => {
    console.log(validUntil);
  }, [validUntil]);

  const submitHandler = async (data: CouponForm) => {
    try {
      await createCoupon(data).unwrap();
      toast.success("Coupon created successfully");
      navigate("/admin/coupons");
    } catch (error) {
      console.log(error);
      toast.error("That did not quite work");
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(submitHandler)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100%",
          height: "100vh",
          "& > *": { width: "40%" },
        }}
        noValidate
      >
        <Typography variant="h4">Create Coupon</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            {...register("name")}
            label="Name"
            error={!!errors.name}
            helperText={errors.name?.message}
            variant="standard"
            required
          />
          <TextField
            {...register("code")}
            label="Coupon Code"
            error={!!errors.code}
            helperText={errors.code?.message}
            variant="standard"
            required
          />
        </Box>
        <TextField
          {...register("discountAmount", { valueAsNumber: true })}
          label="Discount Percentage"
          type="number"
          error={!!errors.discountAmount}
          helperText={errors.discountAmount?.message}
          variant="standard"
          required
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            {...register("minOrderAmount", { valueAsNumber: true })}
            label="Minimum Order Amount"
            type="number"
            error={!!errors.minOrderAmount}
            helperText={errors.minOrderAmount?.message}
            variant="standard"
          />
          <TextField
            {...register("limitPerUser", { valueAsNumber: true })}
            type="number"
            label="Limit per user"
            error={!!errors.limitPerUser}
            helperText={errors.limitPerUser?.message}
            variant="standard"
          />
        </Box>
        <InputDate control={control} name="validUntil" label="Valid Until" />
        <TextField
          {...register("description")}
          label="Description"
          error={!!errors.description}
          helperText={errors.description?.message}
          variant="standard"
        />
        <Button type="submit" disabled={isLoading} variant="contained">
          Create Coupon
        </Button>
      </Box>
      <DevTool control={control} />
    </>
  );
};
