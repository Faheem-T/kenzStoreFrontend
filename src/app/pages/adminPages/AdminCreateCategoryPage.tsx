import { useCreateCategoryMutation } from "@/app/api/categoriesApi";
import { CategoryAutocomplete } from "@/app/components/adminComponents/CategoryAutocomplete";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormLabel, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().trim().nonempty("Category Name is required"),
  description: z.string().trim().nonempty("Category Description is required"),
  parentCategory: z.string().optional(),
  // TODO: Add images
  //   image: z.object({
  //     url: z.string().url("Url is not valid"),
  //     file: z.any(),
  //   }),
});

type createCategoryType = z.infer<typeof createCategorySchema>;

export const AdminCreateCategoryPage = () => {
  const navigate = useNavigate();
  const form = useForm<createCategoryType>({
    defaultValues: {
      description: "",
      name: "",
      parentCategory: undefined,
    },
    resolver: zodResolver(createCategorySchema),
  });
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = form;
  const [createCategoryMutation, { isLoading }] = useCreateCategoryMutation();

  const submitHandler = async (data: createCategoryType) => {
    console.log(data);
    await createCategoryMutation(data);
    toast.success("Category created successfully");
    navigate("/admin/categories");
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
