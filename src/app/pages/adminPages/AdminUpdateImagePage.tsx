import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/app/api/productsApi";
import { AddImageFileInputButton } from "@/app/components/AddImageFileInputButton";
import { ImageCardComponent } from "@/app/components/ImageCardComponent";
import { LoadingComponent } from "@/app/components/LoadingComponent";
import { uploadToCloudinary } from "@/app/uploadToCloudinary";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export const AdminUpdateImagePage = () => {
  const productId = useParams().productId;
  const navigate = useNavigate();

  const [newImages, setNewImages] = useState<
    { url: string; file: FormDataEntryValue }[]
  >([]);

  // existing images that are to be deleted
  const [toDelete, setToDelete] = useState<string[]>([]);

  const [isUploading, setIsUploading] = useState(false);

  const { data, isLoading } = useGetProductQuery(productId || "");

  const [createUpdateProductMutation, { isLoading: isUpdateLoading, isError }] =
    useUpdateProductMutation();
  //   const [currentImages, setCurrentImages] = useState<string[]>([]);
  //   let images: string[] = [];
  //   useEffect(() => {
  //     setCurrentImages(images);
  //   }, [images]);

  if (isLoading) return <LoadingComponent fullScreen />;
  if (!productId) return <Box>Product ID Not Found!</Box>;
  if (!data) return <Box>Product Not Found</Box>;

  //   images = data.data.images;
  const { images } = data.data;

  const currentImageComponents = images.map((image) => (
    <ImageCardComponent
      key={image}
      imageUrl={image}
      onDelete={() => {
        setToDelete([...toDelete, image]);
      }}
      markedForDeletion={toDelete.includes(image)}
      handleDeleteCancel={() => {
        setToDelete(toDelete.filter((img) => img !== image));
      }}
    />
  ));

  const newImageComponents = newImages.map((image) => (
    <ImageCardComponent
      key={image.url}
      imageUrl={image.url}
      onDelete={() =>
        setNewImages(newImages.filter((img) => img.url !== image.url))
      }
    />
  ));

  const handleSaveClick = async () => {
    const oldImages = images.filter((image) => !toDelete.includes(image));
    // validate number of images more than 3
    if (newImages.length + oldImages.length < 3) {
      toast.error("Product must have at least 3 images");
      return;
    }
    // upload new images to cloudinary

    setIsUploading(true);
    const updatedImages: string[] = [];
    for (let i = 0; i < newImages.length; i++) {
      let url = await uploadToCloudinary(newImages[i].file);
      updatedImages.push(url);
    }
    setIsUploading(false);
    // send update product request to backend
    //      send back the old images minus the deleted ones
    //      and the new ones
    await createUpdateProductMutation({
      id: productId,
      patch: { images: [...updatedImages, ...oldImages] },
    });
    // navigate to the product details page
    if (isError) {
      toast.error("That did not work...");
      return;
    }
    toast.success("Images updated successfully!");
    navigate(-1);
  };

  return (
    <Stack gap={2} sx={{ width: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          m: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ textTransform: "uppercase", ml: "auto" }}
        >
          Update Product Image
        </Typography>
        <Button
          variant="contained"
          sx={{ ml: "auto", minWidth: 150 }}
          onClick={handleSaveClick}
          disabled={isUploading || isUpdateLoading}
        >
          {isUploading
            ? "Uploading Images..."
            : isUpdateLoading
            ? "Updating Product"
            : "Save"}
        </Button>
      </Box>
      {/* Current Images Section */}
      <Box>
        <Typography variant="h5">Current Images</Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", p: 2 }}>
          {currentImageComponents}
        </Box>
      </Box>
      {/* Add New Images Section */}
      <Box>
        <Typography variant="h5">New Images</Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", p: 2 }}>
          {newImageComponents}
          <AddImageFileInputButton
            images={newImages}
            setImages={setNewImages}
          />
        </Box>
      </Box>
    </Stack>
  );
};
