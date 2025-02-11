import { Tooltip, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { SetStateAction } from "react";
import toast from "react-hot-toast";

interface AddImageFileInputButtonProps {
  tooltipTitle?: string;
  images: { url: string; file: FormDataEntryValue }[];
  setImages: React.Dispatch<
    SetStateAction<{ url: string; file: FormDataEntryValue }[]>
  >;
}

export const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];
export const AddImageFileInputButton = ({
  images,
  tooltipTitle = images.length > 0 ? "Upload another image" : "Upload an Image",
  setImages,
}: AddImageFileInputButtonProps) => {
  return (
    <Tooltip title={tooltipTitle}>
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
            if (e.target?.files?.length) {
              const newImages = images.slice();
              for (const file of e.target.files) {
                if (allowedFileTypes.includes(file.type)) {
                  newImages.push({
                    url: URL.createObjectURL(file),
                    file: file,
                  });
                } else {
                  toast.error("Please choose image files only");
                }
              }
              setImages([...newImages]);
            }
          }}
        />
      </IconButton>
    </Tooltip>
  );
};
