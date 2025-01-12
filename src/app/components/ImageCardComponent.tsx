import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";

interface ImageCardComponentProps {
  imageUrl: string;
  onDelete?: () => void;
  markedForDeletion?: boolean;
  handleDeleteCancel?: () => void;
}

export const ImageCardComponent = ({
  imageUrl,
  onDelete = () => {},
  markedForDeletion = false,
  handleDeleteCancel = () => {},
}: ImageCardComponentProps) => {
  return (
    <Box
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
      {!markedForDeletion && (
        <Tooltip title="Delete image">
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            //   onClick={() =>
            //     setImages(images.filter((img) => img.url !== image.url))
            //   }
            onClick={onDelete}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
