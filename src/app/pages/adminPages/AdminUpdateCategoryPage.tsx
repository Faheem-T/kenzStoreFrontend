import {
  Box,
  Button,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "@/app/api/categoriesApi";
import { LoadingComponent } from "@/app/components/LoadingComponent";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { CategoryAutocomplete } from "@/app/components/adminComponents/CategoryAutocomplete";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { useEffect } from "react";

const updateCategorySchema = z.object({
  name: z.string().trim().nonempty("Category Name is required"),
  description: z.string().trim(),
  parentCategory: z.string().optional(),
  // TODO: Add images
});

type updateCategoryType = z.infer<typeof updateCategorySchema>;

export const AdminUpdateCategoryPage = () => {
  const categoryId = useParams().categoryId;
  const { data, isLoading } = useGetCategoryQuery(categoryId || "");
  const navigate = useNavigate();
  const form = useForm<updateCategoryType>({
    resolver: zodResolver(updateCategorySchema),
  });
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = form;

  const [updateCategoryMutation, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();

  useEffect(() => {
    if (data) {
      setValue("name", data.data.name);
      if (data.data.description) {
        setValue("description", data.data.description);
      }
      if (data.data.parentCategory) {
        setValue("parentCategory", data.data.parentCategory._id);
      }
    }
  }, [data]);

  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data || !categoryId) return <Box>Category Not Found!</Box>;

  const submitHandler = async (data: updateCategoryType) => {
    console.log(data);
    await updateCategoryMutation({ categoryId, patch: data });
    toast.success("Category updated successfully");
    navigate(-1);
  };

  return (
    <>
      <Stack
        gap={1}
        component="form"
        noValidate
        sx={{ width: 1, p: 12 }}
        onSubmit={handleSubmit(submitHandler)}
      >
        <FormLabel>
          <Typography variant="h5" textAlign="center">
            Create New Category
          </Typography>
        </FormLabel>
        <TextField
          {...register("name")}
          label="Category Name"
          variant="standard"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          {...register("description")}
          label="Category Description"
          variant="standard"
          multiline
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <CategoryAutocomplete
          control={control}
          name="parentCategory"
          label="Parent Category"
          multiple={false}
        />
        <Button variant="contained" type="submit">
          {isLoading ? "Loading..." : "Create"}
        </Button>
      </Stack>
      <DevTool control={control} />
    </>
  );
};
