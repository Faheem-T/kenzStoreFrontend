import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useResendOtpMutation, useVerifyOtpMutation } from "../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";

const OtpSchema = z.object({
  otp: z.string().trim().nonempty("Please enter your OTP"),
  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .email("Please enter a valid email"),
});

type OtpFormType = z.infer<typeof OtpSchema>;

const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const [resendTimer, setResendTimer] = useState<number>(0);
  const timerId = useRef<NodeJS.Timeout>();
  const form = useForm<OtpFormType>({ resolver: zodResolver(OtpSchema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = form;

  const [createVerifyOtpMutation, { isLoading }] = useVerifyOtpMutation();
  const [createResendOtpMutation, { isLoading: isResendLoading }] =
    useResendOtpMutation();

  const startTimer = () => {
    console.log("Starting timer");
    clearInterval(timerId.current);
    setResendTimer(30);
    timerId.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 0) {
          clearInterval(timerId.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  // Starting the timer for the first time
  useEffect(() => {
    startTimer();
  }, []);

  const handleResendOtp = async () => {
    const email = getValues("email");
    // validate email
    if (!email) return setError("email", { message: "Email is required" });
    const result = z
      .string()
      .email("Please enter a valid email")
      .safeParse(email);
    if (result.error?.message)
      return setError("email", { message: result.error.message });

    // resend otp requset
    try {
      const { success, message } = await createResendOtpMutation({
        email,
      }).unwrap();
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      startTimer();
    } catch (error) {
      toast.error((error as any)?.data?.message);
      console.log(error);
    }
  };

  const submitHandler = async (data: OtpFormType) => {
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
        Please enter your email and the OTP to proceed.
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
        <Button
          variant="outlined"
          onClick={handleResendOtp}
          disabled={resendTimer > 0}
        >
          {isResendLoading ? "Sending..." : "Resend Otp"}
        </Button>
        {resendTimer ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" color="textDisabled">
              You can resend OTP after {resendTimer} s
            </Typography>
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
};
export default OtpVerificationPage;
