import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface CategoryAutoCompleteProps {
  categories: { _id: string; name: string }[];
  control: any;
  onChange?: any;
  defaultValue?: { _id: string; name: string }[];
  isLoading: boolean;
}

export const CategoryAutocomplete = ({
  categories,
  control,
  defaultValue = [],
  isLoading,
}: CategoryAutoCompleteProps) => {
  return (
    <Controller
      render={({ field: { onChange }, formState, fieldState, ...props }) => (
        <Autocomplete
          multiple
          filterSelectedOptions
          options={categories}
          getOptionLabel={(option) => option.name}
          defaultValue={[...defaultValue]}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          renderInput={(params) => (
            <TextField {...params} label="Categories" variant="standard" />
          )}
          onChange={(_, data) => onChange(data.map((item) => item._id))}
          {...props}
          loading={isLoading}
        />
      )}
      name="categories"
      control={control}
    />
  );
};
