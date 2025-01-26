import { useGetCategoriesQuery } from "@/app/api/categoriesApi";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

interface CategoryAutoCompleteProps {
  control: any;
  name?: string;
  label?: string;
  multiple?: boolean;
}

export const CategoryAutocomplete = ({
  control,
  name = "category",
  label = "Category",
  multiple = true,
}: CategoryAutoCompleteProps) => {
  const [options, setOptions] = useState<{ _id: string; name: string }[]>([]);
  const { data: categoryData, isLoading } = useGetCategoriesQuery();

  useEffect(() => {
    if (categoryData) {
      setOptions(
        categoryData.data.map((category) => ({
          _id: category._id,
          name: category.name,
        }))
      );
    }
  }, [categoryData]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          multiple={multiple}
          filterSelectedOptions
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
            if (!data) return onChange(null);
            if (Array.isArray(data)) {
              onChange(data.map((item) => item._id));
            } else {
              onChange(data._id);
            }
          }}
          loading={isLoading}
        />
      )}
    />
  );
};
