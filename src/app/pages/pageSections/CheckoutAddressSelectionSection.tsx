import { useGetUserAddressesQuery } from "@/app/api/addressesApi";
import LoadingComponent from "@/app/components/LoadingComponent";
import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { SelectableAddressForm } from "@/app/components/SelectableAddressForm";
import { AddAddressButton } from "@/app/components/AddAddressButton";

export const CheckoutAddressSelectionSection = ({
  addressId,
  setAddressId,
}: {
  addressId: string;
  setAddressId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data, isLoading } = useGetUserAddressesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (isLoading) return <LoadingComponent />;
  if (!data) return <Box>You do not have any addresses saved</Box>;

  const addresses = data.data;

  return (
    <>
      <SelectableAddressForm
        addresses={addresses}
        selectedId={addressId}
        setSelectedId={setAddressId}
      />
      <Button variant="contained" onClick={() => setIsModalOpen(true)}>
        Add address
      </Button>
      <AddAddressModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

const AddAddressModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={(e: React.MouseEvent) => {
          e.stopPropagation();
          setIsModalOpen(false);
        }}
      >
        <Box
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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">Add Address</Typography>
          <AddAddressButton
            isAdding={true}
            onAddClick={() => {}}
            onCancelClick={() => {
              setIsModalOpen(false);
            }}
          />
        </Box>
      </Modal>
    </>
  );
};
