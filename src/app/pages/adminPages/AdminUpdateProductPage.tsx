import { useGetCategoriesQuery } from "@/app/api/categoriesApi";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/app/api/productsApi";
import { CategoryAutocomplete } from "@/app/components/adminComponents/CategoryAutocomplete";
import { SpecificationsArrayField } from "@/app/components/adminComponents/SpecificationsArrayField";
import { LoadingComponent } from "@/app/components/LoadingComponent";
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

const updateProductSchema = z.object({
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

type UpdateProductFormValues = z.infer<typeof updateProductSchema>;

export const AdminUpdateProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  // let categories: { _id: string; name: string }[] = [];

  const { data, isLoading } = useGetProductQuery(productId || "");
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  if (categoriesData) {
    // categories = categoriesData.data.map((category) => ({
    //   _id: category._id,
    //   name: category.name,
    // }));
  }

  const form = useForm<UpdateProductFormValues>({
    resolver: zodResolver(updateProductSchema),
  });

  const { register, handleSubmit, formState, setValue, control } = form;
  const { errors } = formState;

  const [createUpdateProductMutation, { isLoading: updateLoading, isError }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (data?.data) {
      setValue("name", data.data.name);
      setValue("description", data.data.description);
      setValue("brand", data.data.brand);
      setValue("price", data.data.price);
      setValue("stock", data.data.stock);
      setValue(
        "features",
        data.data.specifications.filter(
          (specification) => specification.category === "feature"
        )
      );
      setValue(
        "physical",
        data.data.specifications.filter(
          (specification) => specification.category === "physical"
        )
      );
      setValue(
        "technical",
        data.data.specifications.filter(
          (specification) => specification.category === "technical"
        )
      );
      setValue("category", data.data.category._id);
    }
  }, [data]);

  if (!productId) return <Box>No product ID found!</Box>;
  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Product Not Found</Box>;

  // const productCategory = {
  //   _id: data.data.category._id,
  //   name: data.data.category.name,
  // };
  const submitHandler = async (formData: UpdateProductFormValues) => {
    console.log(formData);
    const { features, physical, technical, ...patchData } = formData;
    const specifications: ProductSpecificationType[] = [
      ...features.map((spec) => ({ ...spec, category: "feature" } as const)),
      ...physical.map((spec) => ({ ...spec, category: "physical" } as const)),
      ...technical.map((spec) => ({ ...spec, category: "technical" } as const)),
    ];
    await createUpdateProductMutation({
      id: productId,
      patch: { ...patchData, specifications },
    });
    if (!isError) {
      toast.success("Product updated successfully!");
      navigate(`/admin/products/${productId}`);
    } else {
      toast.error("Failed to update product!");
    }
  };

  return (
    <Box sx={{ padding: 4, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Update Product
        </Typography>
      </Box>
      <form
        onSubmit={handleSubmit(submitHandler)}
        noValidate
        id="updateProductForm"
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
                    <InputAdornment position="start">₹</InputAdornment>
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
          <CategoryAutocomplete
            control={control}
            multiple={false}
            // defaultValue={productCategory || []}
          />
          {/* Specifications */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormLabel sx={{ fontSize: "16px", fontWeight: "bold", mt: 2 }}>
              Product Specifications
            </FormLabel>
            <SpecificationsArrayField
              control={control}
              register={register}
              name="features"
              label="Features"
            />
            <SpecificationsArrayField
              control={control}
              register={register}
              name="physical"
              label="Physical"
            />
            <SpecificationsArrayField
              control={control}
              register={register}
              name="technical"
              label="Technical"
            />
            {/* Features */}

            {/* Physical */}

            {/* Technical */}
          </Box>

          {/* Submit & Cancel Buttons */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 2,
              mt: 2,
            }}
          >
            <Button
              type="submit"
              form="updateProductForm"
              disabled={updateLoading}
              variant="contained"
              sx={{ width: "100%" }}
            >
              {updateLoading ? "Updating..." : "Update Product"}
            </Button>
            <Button
              type="button"
              disabled={updateLoading}
              variant="contained"
              sx={{ width: "fit-content", px: 4 }}
              onClick={() => navigate(`/admin/products/${productId}`)}
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
