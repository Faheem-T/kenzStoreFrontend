import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFieldArray } from "react-hook-form";

interface SpecificationsArrayFieldProps {
  control: any;
  register: any;
  name: string;
  label: string;
}

export const SpecificationsArrayField = ({
  control,
  register,
  name,
  label,
}: SpecificationsArrayFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });

  return (
    <Box sx={{ width: "content-box" }}>
      <FormLabel sx={{ fontSize: "16px", fontWeight: "bold", mb: 1 }}>
        {label}
      </FormLabel>
      {fields.map((field, index) => (
        <Box sx={{ display: "flex", gap: 2, mb: 2 }} key={field.id}>
          <TextField
            {...register(`${name}.${index}.name` as const)}
            label="Name"
            variant="standard"
          />
          <TextField
            {...register(`${name}.${index}.value` as const)}
            label="Value"
            variant="standard"
          />
          <Tooltip title="Delete" placement="top">
            <IconButton onClick={() => remove(index)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ))}
      {fields.length === 0 && (
        <Box>
          <Typography variant="caption" color="textDisabled">
            No Specifications
          </Typography>
        </Box>
      )}
      <Button
        onClick={() => append({ name: "", value: "" })}
        variant="outlined"
        size="small"
      >
        Add Specification
      </Button>
    </Box>
  );
};
