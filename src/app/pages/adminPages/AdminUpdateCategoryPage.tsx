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
import LoadingComponent from "@/app/components/LoadingComponent";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { CategoryAutocomplete } from "@/app/components/adminComponents/CategoryAutocomplete";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  ChangeableImageCardComponent,
  ImageCardComponent,
} from "@/app/components/ImageCardComponent";
import { AddSingleImageFileInputButton } from "@/app/components/AddImageFileInputButton";
import { uploadToCloudinary } from "@/app/uploadToCloudinary";
import { UpdateCategoryType } from "@/app/types/category";

const updateCategorySchema = z.object({
  name: z.string().trim().nonempty("Category Name is required"),
  description: z.string().trim(),
  parentCategory: z.string().optional(),
});

type updateCategoryFormType = z.infer<typeof updateCategorySchema>;

const AdminUpdateCategoryPage = () => {
  const categoryId = useParams().categoryId;
  const { data, isLoading } = useGetCategoryQuery(categoryId || "");
  const navigate = useNavigate();
  const form = useForm<updateCategoryFormType>({
    resolver: zodResolver(updateCategorySchema),
  });
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = form;

  const [updateCategoryMutation, { isLoading: isUpdateLoading }] =
    useUpdateCategoryMutation();

  const [image, setImage] = useState<{
    url: string;
    file: FormDataEntryValue;
  }>();

  const [existingImage, setExistingImage] = useState<string | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (data) {
      console.log(data.data);
      setValue("name", data.data.name);
      if (data.data.description) {
        setValue("description", data.data.description);
      }
      if (data.data.parentCategory) {
        setValue("parentCategory", data.data.parentCategory._id);
      }
      if (data.data.image) {
        setExistingImage(data.data.image);
      }
    }
  }, [data]);

  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data || !categoryId) return <Box>Category Not Found!</Box>;

  const submitHandler = async (data: updateCategoryFormType) => {
    console.log(data);
    const { description, name, parentCategory } = data;
    const patch: UpdateCategoryType = { description, name, parentCategory };
    if (image) {
      try {
        setIsUploading(true);
        const imageUrl = await uploadToCloudinary(image.file);
        setIsUploading(false);
        patch.image = imageUrl;
      } catch (error) {
        if (error instanceof Error) {
          toast(error.message);
        } else {
          toast("Something went wrong");
          return;
        }
        setIsUploading(false);
        return;
      }
    } else if (!existingImage) {
      patch.image = null;
    }

    await updateCategoryMutation({
      categoryId,
      patch,
    });
    toast.success("Category updated successfully");
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
            Update Category
          </Typography>
        </FormLabel>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {image ? (
            <ImageCardComponent
              imageUrl={image.url}
              onDelete={() => setImage(undefined)}
            />
          ) : existingImage ? (
            // <ImageCardComponent imageUrl={existingImage} />
            <ChangeableImageCardComponent
              imageUrl={existingImage}
              setImage={setImage}
              onDelete={() => setExistingImage(null)}
            />
          ) : (
            <AddSingleImageFileInputButton setImage={setImage} />
          )}
        </Box>
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
        <Button
          variant="contained"
          type="submit"
          disabled={isUploading || isUpdateLoading}
        >
          {isUpdateLoading
            ? "Updating..."
            : isUploading
            ? "Uploading Image..."
            : "Update"}
        </Button>
      </Stack>
      <DevTool control={control} />
    </>
  );
};
export default AdminUpdateCategoryPage;
