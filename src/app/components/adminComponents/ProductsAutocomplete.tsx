import { useGetProductsQuery } from "@/app/api/productsApi";
import { ProductType } from "@/app/types/product";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

interface ProductsAutocompleteProps {
  control: any;
  errors: any;
  name?: string;
  label?: string;
  multiple?: boolean;
}
export const ProductsAutocomplete = ({
  control,
  errors,
  name = "products",
  label = "Products",
  multiple = true,
}: ProductsAutocompleteProps) => {
  const [options, setOptions] = useState<ProductType[]>([]);
  const { data, isLoading } = useGetProductsQuery({});

  useEffect(() => {
    if (data) {
      const products = data.data;
      setOptions(products);
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
