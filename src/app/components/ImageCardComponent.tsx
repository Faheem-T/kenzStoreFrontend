import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { allowedFileTypes } from "./AddImageFileInputButton";
import toast from "react-hot-toast";
import { SetStateAction } from "react";

interface ImageCardComponentProps {
  imageUrl: string;
  onDelete?: () => void;
  markedForDeletion?: boolean;
  handleDeleteCancel?: () => void;
}

export const ImageCardComponent = ({
  imageUrl,
  onDelete,
  markedForDeletion = false,
  handleDeleteCancel = () => {},
}: ImageCardComponentProps) => {
  return (
    <Box
      sx={{
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
      <img src={imageUrl} width="70%" />
      {markedForDeletion && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: 1,
            height: 1,
            position: "absolute",
            opacity: 0.5,
          }}
          bgcolor="gray"
        >
          <Typography variant="button" color="black">
            Marked for deletion
          </Typography>
          <Button variant="outlined" size="small" onClick={handleDeleteCancel}>
            Cancel
          </Button>
        </Box>
      )}
      {!markedForDeletion && onDelete && (
        <Tooltip title="Delete image">
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={onDelete}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

interface ChangeableImageCardComponentProps extends ImageCardComponentProps {
  setImage: React.Dispatch<
    SetStateAction<{ url: string; file: FormDataEntryValue } | undefined>
  >;
}
export const ChangeableImageCardComponent = ({
  imageUrl,
  setImage,
  handleDeleteCancel,
  markedForDeletion,
  onDelete,
}: ChangeableImageCardComponentProps) => {
  return (
    <Box>
      <ImageCardComponent
        imageUrl={imageUrl}
        handleDeleteCancel={handleDeleteCancel}
        markedForDeletion={markedForDeletion}
        onDelete={onDelete}
      />
      <Box
        component="label"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          justifyContent: "center",
        }}
      >
        <ImageInput setImage={setImage} />
        <Typography
          variant="caption"
          sx={{ "&:hover": { cursor: "pointer", textDecoration: "underline" } }}
        >
          Change Image
        </Typography>
      </Box>
    </Box>
  );
};

const ImageInput = ({
  setImage,
}: {
  setImage: React.Dispatch<
    SetStateAction<{ url: string; file: FormDataEntryValue } | undefined>
  >;
}) => (
  <input
    type="file"
    multiple
    hidden
    onChange={(e) => {
      if (e.target?.files?.length) {
        const file = e.target.files[0];
        if (allowedFileTypes.includes(file.type)) {
          setImage({ url: URL.createObjectURL(file), file: file });
        } else {
          toast.error("Please choose image files only");
        }
      }
    }}
  />
);
