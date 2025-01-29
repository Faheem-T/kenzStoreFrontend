import { useGetCategoriesQuery } from "@/app/api/categoriesApi";
import { PopulatedCategoryType } from "@/app/types/category";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

interface CategoriesAutocompleteProps {
  control: any;
  errors: any;
  name?: string;
  label?: string;
  multiple?: boolean;
}
export const CategoriesAutocomplete = ({
  control,
  errors,
  name = "categories",
  label = "Categories",
  multiple = true,
}: CategoriesAutocompleteProps) => {
  const [options, setOptions] = useState<PopulatedCategoryType[]>([]);
  const { data, isLoading } = useGetCategoriesQuery();

  useEffect(() => {
    if (data) {
      const categories = data.data;
      setOptions(categories);
    }
  }, [data]);
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            loading={isLoading}
            multiple={multiple}
            options={options}
            getOptionLabel={(option) => option.name}
            value={
              multiple
                ? value
                  ? options.filter((option) => value.includes(option._id))
                  : []
                : value
                ? options.find((option) => option._id === value) || null
                : null
            }
            isOptionEqualToValue={(option, value) => option._id === value._id}
            renderInput={(params) => (
              <TextField {...params} label={label} variant="standard" />
            )}
            onChange={(_, data) => {
              if (!data) return onChange(multiple ? [] : null);
              if (Array.isArray(data)) {
                onChange(data.map((item) => item._id));
              } else {
                onChange(data._id);
              }
            }}
          />
        )}
      />
      {errors?.[name] && (
        <FormHelperText error>{errors?.[name]?.message}</FormHelperText>
      )}
    </FormControl>
  );
};
