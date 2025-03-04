import {
  TextField,
  Box,
  Button,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  FormHelperText,
  Input,
  Tooltip,
} from "@mui/material";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLoginMutation } from "../api/authApi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { selectUser, userLoggedIn } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { GoogleLogin } from "@react-oauth/google";
import { Navbar } from "../components/Navbar";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Email format is not valid"),
  password: z.string().nonempty("Password is required"),
});

export type loginFormValues = {
  firstName: string;
  password: string;
  confirmPassword: string;
  email: string;
};

// TODO Route to otp verification if error is `not verified
export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  // redirecting if user already exists
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const form = useForm<loginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { register, handleSubmit, control, formState } = form;

  const { errors } = formState;

  const [createLoginMutation, { isLoading }] = useLoginMutation();

  const submitHandler = async (data: loginFormValues) => {
    try {
      const { data: loginData } = await createLoginMutation(data).unwrap();
      dispatch(userLoggedIn(loginData));
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "8px",
          position: "relative",
        }}
      >
        <Tooltip title="Go back">
          <IconButton
            sx={{ position: "absolute", left: 20, top: 20 }}
            onClick={() => navigate("/")}
          >
            <ArrowBack fontSize="large" />
          </IconButton>
        </Tooltip>
        <Typography margin={4} variant="h2" fontWeight={800}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit(submitHandler)}>
          <Stack spacing={2} paddingY={0} paddingX={8}>
            <TextField
              label="Email"
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="standard"
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </Stack>
        </form>
        <Typography variant="caption">
          <Box
            component="span"
            sx={{
              textDecoration: "underline",
              "&:hover": { color: "primary.light" },
            }}
          >
            <Link to="/forgot-password">Forgot password?</Link>
          </Box>
        </Typography>
        <Typography variant="caption">
          Not registered?{" "}
          <Box
            component="span"
            sx={{
              textDecoration: "underline",
              "&:hover": { color: "primary.light" },
            }}
          >
            <Link to="/register">Register</Link>
          </Box>
        </Typography>
      </Box>
      <GoogleLogin onSuccess={console.log} onError={console.log} />
    </>
  );
};
