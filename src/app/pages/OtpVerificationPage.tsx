import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useVerifyOtpMutation } from "../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const OtpSchema = z.object({
  otp: z.string().trim().nonempty("Please enter your OTP"),
  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .email("Please enter a valid email"),
});

type OtpFormType = z.infer<typeof OtpSchema>;

export const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const form = useForm<OtpFormType>({ resolver: zodResolver(OtpSchema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [createVerifyOtpMutation, { isLoading }] = useVerifyOtpMutation();

  const submitHandler = async (data: OtpFormType) => {
    // TODO: call the API to verify the OTP and navigate to the next step
    try {
      const { success, message } = await createVerifyOtpMutation(data).unwrap();
      if (success) {
        toast.success(message);
        navigate("/login");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error((error as any)?.data?.message);
      console.log(error);
      // Handle the error
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 12,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
        An OTP has been sent to your mail
      </Typography>
      <Typography variant="body1">
        Please enter your email and the OTP sent to your email to proceed.
      </Typography>
      <Stack
        gap={1}
        component="form"
        noValidate
        onSubmit={handleSubmit(submitHandler)}
      >
        <TextField
          {...register("email")}
          type="email"
          label="Email"
          variant="standard"
          error={!!errors?.email}
          helperText={errors?.email?.message}
        />
        <TextField
          slotProps={{
            htmlInput: {
              style: { textAlign: "center" },
            },
          }}
          {...register("otp")}
          label="OTP"
          variant="standard"
          required
          error={!!errors?.otp}
          helperText={errors?.otp?.message}
        />
        <Button type="submit" variant="contained">
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </Stack>
    </Box>
  );
};
