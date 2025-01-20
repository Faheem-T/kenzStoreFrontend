import { Box, TextField, Typography } from "@mui/material";
import { FieldValues, UseFormRegister } from "react-hook-form";
export const EditableField = ({
  label,
  value,
  name,
  type = "text",
  isEditing = false,
  register,
  errors,
}: {
  label: string;
  value: string;
  name: string;
  type?: string;
  isEditing?: boolean;
  register: any;
  errors: any;
}) => {
  if (isEditing) {
    return (
      <Box>
        <TextField
          {...register(name, { valueAsNumber: type === "number" })}
          label={label}
          variant="standard"
          error={!!errors[name]}
          helperText={errors[name]?.message}
          type={type}
        />
      </Box>
    );
  }
  if (!value) return null;
  return (
    <Box>
      <Typography variant="caption" color="textDisabled">
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};
