import { useGetCategoriesQuery } from "@/app/api/categoriesApi";
import { useCreateProductMutation } from "@/app/api/productsApi";
import { CategoryAutocomplete } from "@/app/components/adminComponents/CategoryAutocomplete";
import { SpecificationsArrayField } from "@/app/components/adminComponents/SpecificationsArrayField";
import {
  savedNewProductDetails,
  selectCreateProductDetails,
} from "@/app/features/admin/adminCreateProductSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { ProductSpecificationType } from "@/app/types/product";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormLabel,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";

const createProductDetailsSchema = z.object({
  name: z
    .string()
    .nonempty("Product Name is required")
    .min(2, "Name cannot be less than 2 characters"),
  description: z.string().nonempty("Product Description is required"),
  brand: z.string(),
  price: z.number().min(0, "Price cannot be less than 0"),
  stock: z.number().min(0, "Stock cannot be less than 0"),
  category: z.string().nonempty("Category is required"),
  features: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    })
  ),
  physical: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    })
  ),
  technical: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    })
  ),
});

type CreateProductDetailsType = z.infer<typeof createProductDetailsSchema>;

interface CreateProductDetailsSectionProps {
  nextTab: () => void;
}

export const CreateProductDetailsSection = ({
  nextTab,
}: CreateProductDetailsSectionProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const savedProductDetails = useAppSelector(selectCreateProductDetails);

  const defaultValues = {
    ...savedProductDetails,
  };

  let categories: { _id: string; name: string }[] = [];

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  if (categoriesData) {
    categories = categoriesData.data.map((category) => ({
      _id: category._id,
      name: category.name,
    }));
  }

  const form = useForm<CreateProductDetailsType>({
    resolver: zodResolver(createProductDetailsSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const submitHandler = (formData: CreateProductDetailsType) => {
    console.log(formData);
    dispatch(savedNewProductDetails({ ...formData }));
    nextTab();
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit(submitHandler)}
        noValidate
        id="createProductForm"
      >
        <FormLabel sx={{ fontSize: "16px", fontWeight: "bold" }}>
          Product Details
        </FormLabel>
        <Stack spacing={1}>
          {/* Name */}
          <TextField
            {...register("name")}
            label="Product Name"
            error={!!errors.name}
            helperText={errors.name?.message}
            variant="standard"
          />
          {/* Description */}
          <TextField
            {...register("description")}
            label="Product Description"
            error={!!errors.description}
            helperText={errors.description?.message}
            variant="standard"
            multiline
          />
          {/* Brand */}
          <TextField
            {...register("brand")}
            label="Product Brand"
            error={!!errors.brand}
            helperText={errors.brand?.message}
            variant="standard"
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Price */}
            <TextField
              {...register("price", { valueAsNumber: true })}
              label="Product Price"
              error={!!errors.price}
              helperText={errors.price?.message}
              variant="standard"
              type="number"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">QR</InputAdornment>
                  ),
                },
              }}
            />
            {/* Stock */}
            <TextField
              {...register("stock", { valueAsNumber: true })}
              label="Product Stock"
              error={!!errors.stock}
              helperText={errors.stock?.message}
              variant="standard"
              type="number"
            />
          </Box>
          {/* Categories */}
          <CategoryAutocomplete multiple={false} control={control} />
          {/* Specifications */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormLabel sx={{ fontSize: "16px", fontWeight: "bold", mt: 2 }}>
              Product Specifications
            </FormLabel>
            {/* Features */}
            <SpecificationsArrayField
              control={control}
              register={register}
              name="features"
              label="Features"
            />

            {/* Physical */}
            <SpecificationsArrayField
              control={control}
              register={register}
              name="physical"
              label="Physical"
            />

            {/* Technical */}
            <SpecificationsArrayField
              control={control}
              register={register}
              name="technical"
              label="Technical"
            />
          </Box>

          {/* Submit & Cancel Buttons */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              type="submit"
              form="createProductForm"
              variant="contained"
              sx={{ width: "fit-content", px: 20 }}
            >
              Next
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{ width: "fit-content" }}
              onClick={() => navigate(`/admin/products`)}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </form>
      <DevTool control={control} />
    </Box>
  );
};
