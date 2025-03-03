import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { AddressType } from "../types/address";
import { CancelOutlined, Delete, Edit, Save } from "@mui/icons-material";
import {
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
  useUpdateAddressMutation,
} from "../api/addressesApi";
import { EditableField } from "./EditableField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddressFormType, addressSchema } from "./AddAddressButton";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ServerError } from "../types/serverErrorType";

export const AddressCard = ({ address }: { address: AddressType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteAddress, { isLoading: isDeleteLoading }] =
    useDeleteAddressMutation();
  const [updateAddress, { isLoading: isUpdateLoading }] =
    useUpdateAddressMutation();
  const [setDefaultAddress, { isLoading: isSetDefaultLoading }] =
    useSetDefaultAddressMutation();

  const form = useForm<AddressFormType>({
    defaultValues: {
      address_line: address.address_line,
      city: address.city,
      state: address.state,
      pincode: Number(address.pincode),
      landmark: address.landmark,
    },
    resolver: zodResolver(addressSchema),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const deleteHandler = async (addressId: string) => {
    const { data, error } = await deleteAddress(addressId);
    if (data) toast.success("Address has been deleted");
    if (error && "data" in error) {
      toast.error((error as ServerError).data.message);
    }
  };

  const setDefaultHandler = async (addressId: string) => {
    if (isSetDefaultLoading) return;
    const { data, error } = await setDefaultAddress(addressId);
    if (data) toast.success("Address has been set as default");
    if (error && "data" in error) {
      toast.error((error as ServerError).data.message);
    }
  };

  const submitHandler = async (data: AddressFormType) => {
    const { data: updateResponse, error } = await updateAddress({
      addressId: address._id,
      patch: data,
    });
    if (updateResponse) {
      toast.success("Address updated successfully");
      setIsEditing(false);
    } else {
      toast.error("Failed to update address");
    }
    if (error && "data" in error) {
      toast.error((error as ServerError).data.message);
    }
  };

  return (
    <Box
      bgcolor="background.paper"
      component="form"
      noValidate
      onSubmit={handleSubmit(submitHandler)}
      sx={{
        width: { xs: 300, sm: 350 },
        // maxWidth: { xs: "90%", sm: "500px" },
        // minWidth: 300,
        // mx: "auto",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        border: 1,
        borderColor: address.isDefault ? "primary.main" : "transparent",
        boxShadow: 2,
        p: 2,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="caption"
        color="textDisabled"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          "&:hover": address.isDefault
            ? {}
            : { cursor: "pointer", textDecoration: "underline" },
        }}
        onClick={() => !address.isDefault && setDefaultHandler(address._id)}
      >
        {address.isDefault
          ? "Default Address"
          : isSetDefaultLoading
          ? "Setting as default..."
          : "Set as Default"}
      </Typography>

      <Box sx={{ px: { xs: 2, sm: 4 }, pt: { xs: 2, sm: 4 } }}>
        <EditableField
          label="Address Line"
          value={address.address_line}
          name="address_line"
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="City"
          value={address.city}
          name="city"
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="State"
          value={address.state}
          name="state"
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
        <EditableField
          label="Pincode"
          value={address.pincode.toString()}
          name="pincode"
          type="number"
          isEditing={isEditing}
          register={register}
          errors={errors}
        />
      </Box>

      <Box sx={{ alignSelf: "flex-end", display: "flex", gap: 1, p: 2 }}>
        {!isEditing ? (
          <>
            <Tooltip title="Edit Address">
              <IconButton onClick={() => setIsEditing(true)}>
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete address">
              <IconButton
                onClick={() => deleteHandler(address._id)}
                disabled={isDeleteLoading}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Cancel">
              <IconButton onClick={() => setIsEditing(false)}>
                <CancelOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save">
              <IconButton
                onClick={handleSubmit(submitHandler)}
                disabled={isUpdateLoading}
              >
                <Save fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>
    </Box>
  );
};
