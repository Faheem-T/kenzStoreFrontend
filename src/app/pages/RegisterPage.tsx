import {
  TextField,
  Box,
  Button,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Input,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { useRegisterMutation } from "../api/authApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

// SHARED
const registerSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(3, "Name cannot be less than 3 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Email format is not valid"),
  password: z.string().nonempty("Password is required"),
  confirmPassword: z.string().nonempty("Confirmation is required"),
  referralCode: z.string().trim().optional(),
});

export type registerFormValues = z.infer<typeof registerSchema>;
export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const form = useForm<registerFormValues>({
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const { register, handleSubmit, control, formState, setError } = form;

  const { errors } = formState;

  const [createRegisterMutation, { isLoading }] = useRegisterMutation();

  const submitHandler = async (data: registerFormValues) => {
    if (data.confirmPassword !== data.password) {
      setError("confirmPassword", {
        message: "Confirmation does not match",
        type: "value",
      });
      return;
    }

    try {
      const { message } = await createRegisterMutation(data).unwrap();
      toast(message);
      navigate("otp");
    } catch (error: any) {
      console.log(error);
      error.data.issues.forEach(
        (issue: {
          message: string;
          field: "firstName" | "password" | "confirmPassword" | "email";
        }) => {
          setError(issue.field, { message: issue.message, type: "value" });
        }
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Typography margin={4} variant="h2" fontWeight={800}>
          Register
        </Typography>
        <form noValidate onSubmit={handleSubmit(submitHandler)}>
          <Stack spacing={2} paddingY={0} paddingX={8}>
            <TextField
              variant="standard"
              label="First Name"
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              variant="standard"
              label="Email"
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <FormControl variant="standard">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                {...register("password")}
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
                error={!!errors.password}
              />
              {!!errors.password && (
                <FormHelperText error>
                  {errors.password?.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl variant="standard">
              <InputLabel>Confirm Password</InputLabel>
              <Input
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
            <FormControl variant="standard">
              <InputLabel>Referral Code</InputLabel>
              <Input
                {...register("referralCode")}
                error={!!errors.referralCode}
              />
              {!!errors.referralCode && (
                <FormHelperText error>
                  {errors.referralCode?.message}
                </FormHelperText>
              )}
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Register"}
            </Button>
          </Stack>
          <DevTool control={control} />
        </form>
        <Typography variant="caption">
          Already registered?{" "}
          <Box
            component="span"
            sx={{
              textDecoration: "underline",
              "&:hover": { color: "primary.light" },
            }}
          >
            <Link to="/login">LOGIN</Link>
          </Box>
        </Typography>
      </Box>
    </>
  );
};
