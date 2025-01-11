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
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { selectUser, userLoggedIn } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useAdminLoginMutation } from "../../api/adminApi";

const adminLoginSchema = z.object({
    username: z.string().nonempty("Username is required"),
    password: z.string().nonempty("Password is required"),
});

export type loginFormValues = {
    username: string;
    password: string;
};

export const AdminLoginPage = () => {
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
            username: "",
            password: "",
        },
        resolver: zodResolver(adminLoginSchema),
    });

    const { register, handleSubmit, control, formState } = form;

    const { errors } = formState;

    const [createAdminLoginMutation, { isLoading }] = useAdminLoginMutation();

    const submitHandler = async (data: loginFormValues) => {
        try {
            const { data: loginData } = await createAdminLoginMutation(data).unwrap();
            dispatch(userLoggedIn({ user: loginData.admin, accessToken: loginData.accessToken, isAdmin: true }));
            toast.success("Logged in successfully!");
            navigate("/admin/dashboard");
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
                    Admin Login
                </Typography>
                <form noValidate onSubmit={handleSubmit(submitHandler)}>
                    <Stack spacing={2} paddingY={0} paddingX={8}>
                        <TextField
                            label="Username"
                            type="text"
                            {...register("username")}
                            error={!!errors.username}
                            helperText={errors.username?.message}
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
            </Box>
        </>
    );
};
