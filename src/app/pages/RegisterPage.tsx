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
import { useRegisterMutation } from "../api/authApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

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
});

export type registerFormValues = {
    firstName: string;
    password: string;
    confirmPassword: string;
    email: string;
};
export const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const form = useForm<registerFormValues>({
        defaultValues: {
            firstName: "",
            email: "",
            password: "",
            confirmPassword: "",
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
            await createRegisterMutation(data).unwrap();
            toast.success("Registered Successfully!");
            navigate("/login");
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
                            label="First Name"
                            {...register("firstName")}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        {/* <TextField label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} /> */}
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
                        <FormControl variant="outlined">
                            <InputLabel>Confirm Password</InputLabel>
                            <OutlinedInput
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
                    Already registered? <Link to="/login">LOGIN</Link>
                </Typography>
            </Box>
        </>
    );
};
