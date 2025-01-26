import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { z } from "zod";
import { useResetPasswordMutation } from "../api/authApi";
import toast from "react-hot-toast";
import { ServerError } from "../types/serverErrorType";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const resetPasswordSchema = z.object({
  newPassword: z.string().trim().nonempty("Password is required"),
  confirmPassword: z.string().trim().nonempty("Confirm Password is required"),
});

type resetPasswordType = z.infer<typeof resetPasswordSchema>;

// TODO make a global password schema
// const password = z.string().trim().nonempty("Password is required");

export const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<resetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const submitHandler = async (data: resetPasswordType) => {
    const token = searchParams.get("token");
    if (!token) {
      toast.error("Token not found");
      return;
    }

    const { newPassword, confirmPassword } = data;
    if (newPassword !== confirmPassword) {
      setError("confirmPassword", {
        message: "Passwords do not match",
        type: "value",
      });
      return;
    }

    const { data: response, error } = await resetPassword({
      newPassword,
      token,
    });

    if (response) {
      toast.success(response.message);
      navigate("/login");
    }
    if (error) {
      if ("data" in error) {
        const serverError = error as ServerError;
        toast.error(serverError.data.message);
      }
    }
  };

  return (
    <>
      <Box>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(submitHandler)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            height: "100vh",
            position: "relative",
          }}
        >
          <Tooltip title="Go back">
            <IconButton
              sx={{ position: "absolute", left: 20, top: 20 }}
              onClick={() => navigate(-1)}
            >
              <ArrowBack fontSize="large" />
            </IconButton>
          </Tooltip>
          <Typography variant="h4">Reset Password</Typography>
          <FormControl variant="standard">
            <InputLabel htmlFor="newPassword">Password</InputLabel>
            <Input
              id="newPassword"
              {...register("newPassword")}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((state) => !state)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              error={!!errors.newPassword}
            />
            {!!errors.newPassword && (
              <FormHelperText error>
                {errors.newPassword?.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <Input
              id="confirmPassword"
              {...register("confirmPassword")}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((state) => !state)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              error={!!errors.confirmPassword}
            />
            {!!errors.confirmPassword && (
              <FormHelperText error>
                {errors.confirmPassword?.message}
              </FormHelperText>
            )}
          </FormControl>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </Box>
      </Box>
    </>
  );
};
