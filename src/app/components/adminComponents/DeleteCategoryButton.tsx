import { useDeleteCategoryMutation } from "@/app/api/categoriesApi";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export const DeleteCategoryButton = ({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createDeleteCategoryMutation, { isLoading }] =
    useDeleteCategoryMutation();

  return (
    <>
      <Tooltip title="Delete Category">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          <Delete />
        </IconButton>
      </Tooltip>
      <Modal
        open={isModalOpen}
        onClose={(e: React.MouseEvent) => {
          e.stopPropagation();
          setIsModalOpen(false);
        }}
        sx={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: "fit-content",
          top: "50%",
          left: "50%",
          boxShadow: 24,
          bgcolor: "background.paper",
          p: 4,
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" textAlign="center">
            Are you sure you want to delete this category?
          </Typography>
          <Typography>{categoryName}</Typography>
          {isLoading ? (
            <Typography variant="caption" color="textDisabled">
              Deleting Category...
            </Typography>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                }}
              >
                No
              </Button>
              <Button
                variant="outlined"
                onClick={async (e) => {
                  e.stopPropagation();
                  await createDeleteCategoryMutation(categoryId);
                  setIsModalOpen(false);
                }}
              >
                Yes
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};
