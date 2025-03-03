import { Box, IconButton, TextField, Tooltip } from "@mui/material";
import { useCreateUserAddressMutation } from "../api/addressesApi";
import { Add, CancelOutlined, Save } from "@mui/icons-material";
import { LoadingComponent } from "./LoadingComponent";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ServerError } from "../types/serverErrorType";

interface AddAddressButtonProps {
  onAddClick: () => void;
  onCancelClick: () => void;
  isAdding: boolean;
}

export const addressSchema = z.object({
  address_line: z.string().trim().nonempty("Address line is required"),
  city: z.string().trim().nonempty("City is required"),
  state: z.string().trim().nonempty("State is required"),
  pincode: z
    .number()
    .min(100000, "Pincode should be a 6-digit number")
    .max(999999, "Pincode should be a 6-digit number"),
  landmark: z.string().trim().optional(),
});

export type AddressFormType = z.infer<typeof addressSchema>;
export const AddAddressButton = ({
  onAddClick,
  onCancelClick,
  isAdding,
}: AddAddressButtonProps) => {
  const [createUserAddressMutation, { isLoading }] =
    useCreateUserAddressMutation();

  // RHF
  const form = useForm<AddressFormType>({
    resolver: zodResolver(addressSchema),
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = form;

  const submitHandler = async (data: AddressFormType) => {
    const { data: response, error } = await createUserAddressMutation(data);
    if (response) {
      toast.success("Address added successfully");
      reset();
      onCancelClick();
    }
    if (error) {
      if ("data" in error) {
        const serverError = error as ServerError;
        toast.error(serverError.data.message);
      }
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        width: { xs: 300, sm: 350 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        boxShadow: 2,
      }}
      bgcolor="background.paper"
    >
      {isAdding ? (
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(submitHandler)}
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          <TextField
            {...register("address_line")}
            error={!!errors.address_line}
            helperText={errors.address_line?.message}
            label="Address Line"
            variant="standard"
          />
          <TextField
            {...register("city")}
            error={!!errors.city}
            helperText={errors.city?.message}
            label="City"
            variant="standard"
          />
          <TextField
            {...register("state")}
            error={!!errors.state}
            helperText={errors.state?.message}
            label="State"
            variant="standard"
          />
          <TextField
            {...register("pincode", { valueAsNumber: true })}
            type="number"
            error={!!errors.pincode}
            helperText={errors.pincode?.message}
            label="Pincode"
            variant="standard"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              p: 2,
            }}
          >
            <Tooltip title="Add Address">
              <IconButton type="submit">
                <Save />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
              <IconButton onClick={onCancelClick}>
                <CancelOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ) : (
        <Tooltip title="Add New Address">
          <IconButton onClick={onAddClick} sx={{}}>
            {isLoading ? <LoadingComponent /> : <Add />}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
