import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useForgotPasswordMutation } from "../api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ServerError } from "../types/serverErrorType";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router";

const formSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
});

type FormType = z.infer<typeof formSchema>;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });
  const [createForgotPasswordMutation, {}] = useForgotPasswordMutation();
  const submitHandler = async (data: FormType) => {
    const { email } = data;
    const { data: response, error } = await createForgotPasswordMutation({
      email,
    });
    if (response) {
      toast(response.message);
    }
    if (error) {
      if ("data" in error) {
        toast((error as ServerError)?.data.message);
      }
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
export default ForgotPasswordPage;
