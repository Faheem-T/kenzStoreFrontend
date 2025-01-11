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
    <Box
      key={image.url}
      sx={{
        // border: 1
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: 250,
        height: 150,
        boxShadow: 3,
        overflow: "hidden",
      }}
      bgcolor="background.paper"
    >
      <img src={image.url} width="100%" />
      <Tooltip title="Delete image">
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={() =>
            setImages(images.filter((img) => img.url !== image.url))
          }
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
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
        <Tooltip
          title={images.length > 0 ? "Upload another image" : "Upload an Image"}
        >
          <IconButton
            component="label"
            sx={{
              width: 250,
              height: 150,
              backgroundColor: "background.paper",
              borderRadius: 0,
            }}
          >
            <Add fontSize="large" />
            <input
              type="file"
              multiple
              hidden
              onChange={(e) => {
                // console.log(e.target.files[0]);
                if (e.target?.files?.length) {
                  const newImages = images.slice();
                  for (const file of e.target.files) {
                    newImages.push({
                      url: URL.createObjectURL(file),
                      file: file,
                    });
                  }
                  setImages([...newImages]);
                  console.log(images);
                }
              }}
            />
          </IconButton>
        </Tooltip>
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
