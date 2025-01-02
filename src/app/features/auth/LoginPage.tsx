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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { useLoginMutation } from "../../api/authApi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { selectUser, userLoggedIn } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

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

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  // redirecting if user already exists
  useEffect(() => {
    if (user) {
      navigate("/home");
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
      navigate("/home");
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
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
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
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
          <DevTool control={control} />
        </form>
        <Typography variant="caption">
          Not registered? <Link to="/register">REGISTER</Link>
        </Typography>
      </Box>
    </>
  );
};
