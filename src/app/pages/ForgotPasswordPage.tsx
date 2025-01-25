import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useForgotPasswordMutation } from "../api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
});

type FormType = z.infer<typeof formSchema>;

export const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });
  const [createForgotPasswordMutation, { isLoading }] =
    useForgotPasswordMutation();
  const submitHandler = async (data: FormType) => {
    const { email } = data;
    const { data: response, error } = await createForgotPasswordMutation({
      email,
    });
    if (response) {
      toast(response.message);
    }
  };
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3">Reset Password</Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(submitHandler)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            {...register("email")}
            label="Email"
            variant="standard"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button variant="contained" type="submit">
            Reset Password
          </Button>
        </Box>
      </Box>
    </>
  );
};
