import { AddImageFileInputButton } from "@/app/components/AddImageFileInputButton";
import { ImageCardComponent } from "@/app/components/ImageCardComponent";
import { savedNewProductImages } from "@/app/features/admin/adminCreateProductSlice";
import { useAppDispatch } from "@/app/hooks";
import { Add, Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

interface CreateProductImagesSectionProps {
  nextTab: () => void;
  prevTab: () => void;
}

export const CreateProductImagesSection = ({
  nextTab,
  prevTab,
}: CreateProductImagesSectionProps) => {
  //   const [images, setImages] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const [images, setImages] = useState<
    { url: string; file: FormDataEntryValue }[]
  >([]);

  const imageComponents = images.map((image) => (
    <ImageCardComponent
      imageUrl={image.url}
      onDelete={() => {
        setImages(images.filter((img) => img.url !== image.url));
      }}
    />
  ));

  const handleNextClick = () => {
    if (images.length < 3) {
      toast.error("A minimum of 3 images must be provided");
      return;
    }
    dispatch(savedNewProductImages({ imagePreviews: images }));
    nextTab();
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {imageComponents}
        <AddImageFileInputButton images={images} setImages={setImages} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pt: 20,
          gap: 2,
        }}
      >
        <Button onClick={() => prevTab()} variant="contained">
          Go back
        </Button>
        <Button onClick={handleNextClick} variant="contained" sx={{ px: 20 }}>
          Next
        </Button>
      </Box>
    </>
  );
};
