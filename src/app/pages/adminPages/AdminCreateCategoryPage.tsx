import { useCreateCategoryMutation } from "@/app/api/categoriesApi";
import { AddSingleImageFileInputButton } from "@/app/components/AddImageFileInputButton";
import { CategoryAutocomplete } from "@/app/components/adminComponents/CategoryAutocomplete";
import { ImageCardComponent } from "@/app/components/ImageCardComponent";
import { uploadToCloudinary } from "@/app/uploadToCloudinary";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormLabel, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().trim().nonempty("Category Name is required"),
  description: z.string().trim().nonempty("Category Description is required"),
  parentCategory: z.string().optional(),
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

  const [image, setImage] = useState<{
    url: string;
    file: FormDataEntryValue;
  }>();

  const [uploadLoading, setUploadLoading] = useState(false);

  const submitHandler = async (data: createCategoryType) => {
    const { description, name, parentCategory } = data;

    let imgLink;
    if (image) {
      setUploadLoading(true);
      imgLink = await uploadToCloudinary(image.file);
      setUploadLoading(false);
    }

    await createCategoryMutation({
      description,
      name,
      parentCategory,
      image: imgLink,
    });
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
        {image?.url ? (
          <ImageCardComponent imageUrl={image.url} />
        ) : (
          <AddSingleImageFileInputButton setImage={setImage} />
        )}
        <Button variant="contained" type="submit">
          {isLoading
            ? "Loading..."
            : uploadLoading
            ? "Uploading image..."
            : "Create"}
        </Button>
      </Stack>
      <DevTool control={control} />
    </>
  );
};
