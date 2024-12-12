import { TextField, Box, Button, Stack, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DevTool } from "@hookform/devtools"
import { z } from "zod"

const registerSchema = z.object({
    firstName: z.string().nonempty("First name is required").min(3, "Name cannot be less than 3 characters"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().nonempty("Email is required").email("Email format is not valid"),
    DOB: z.date(),
    password: z.string().nonempty("Password is required")
})

type registerFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    DOB: Date;
    password: string;
}

export const RegisterPage = () => {
    const form = useForm<registerFormValues>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            DOB: new Date(),
            password: "",

        }, resolver: zodResolver(registerSchema)
    });
    const { register, handleSubmit, control, formState } = form;

    const { errors } = formState;

    const submitHandler = (data: registerFormValues) => {
        console.log(data)
    }

    return (
        <Box sx={{ height: '100vh', display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <Typography margin={4} variant="h2" fontWeight={800}>Register</Typography>
            <form noValidate onSubmit={handleSubmit(submitHandler)}>
                <Stack spacing={2} paddingY={0} paddingX={50}>
                    <TextField label="First Name" {...register("firstName")} error={!!errors.firstName} helperText={errors.firstName?.message} />
                    <TextField label="Last Name" {...register("lastName")} error={!!errors.lastName} helperText={errors.lastName?.message} />
                    <TextField label="Email" type="email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
                    <TextField label="DOB" type="date" {...register("DOB", { valueAsDate: true })} error={!!errors.DOB} helperText={errors.DOB?.message} />
                    <TextField label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
                    <Button type="submit" variant="contained" color="primary">Register</Button>
                </Stack>
                <DevTool control={control} />
            </form>
        </Box>
    )
}
