import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AddressType } from "../types/address";
import { AddAddressButton } from "./AddAddressButton copy";

export const SelectableAddressForm = ({
  addresses,
  selectedId,
  setSelectedId,
}: {
  addresses: AddressType[];
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const defaultAddressId = addresses.find((address) => address.isDefault)?._id;
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState("");
  useEffect(() => {
    if (defaultAddressId) {
      setSelectedId(defaultAddressId);
    }
  }, []);
  //   const [selectedId, setSelectedId] = useState(defaultAddressId);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedId((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <Box>
        {/* <Typography variant="h5">Select Address</Typography> */}
        <FormControl
          sx={{
            backgroundColor: "background.paper",
            p: 4,
            boxShadow: 3,
            display: "block",
          }}
        >
          <FormLabel id="selectAddressForm">
            <Typography variant="h6">Select Address</Typography>
          </FormLabel>
          <RadioGroup
            aria-labelledby="selectAddressForm"
            value={selectedId}
            onChange={handleChange}
            sx={{ gap: 1 }}
          >
            {addresses.map((address) => (
              <Box
                sx={{
                  p: 2,
                }}
                key={address._id}
              >
                <FormControlLabel
                  value={address._id}
                  label={
                    <Box sx={{ position: "relative" }}>
                      <Typography
                        variant="caption"
                        color="textDisabled"
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                            textDecoration: "underline",
                          },
                        }}
                        onClick={() => {
                          setIsEditing(true);
                          setEditingAddressId(address._id);
                        }}
                      >
                        Edit Address
                      </Typography>
                      <Typography fontSize={18} fontWeight={"bold"}>
                        {address.city}
                      </Typography>
                      <Typography sx={{ pl: 1 }}>
                        {`${address.address_line}, ${address.city}, ${address.state}`}
                      </Typography>
                    </Box>
                  }
                  control={<Radio />}
                />
                <Modal
                  open={isEditing && editingAddressId === address._id}
                  onClose={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    setIsEditing(false);
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
                    <AddAddressButton
                      address={address}
                      isAdding={true}
                      onAddClick={() => {}}
                      onCancelClick={() => {
                        setIsEditing(false);
                        setEditingAddressId("");
                      }}
                    />
                  </Box>
                </Modal>
              </Box>
            ))}
            {addresses.length === 0 && (
              <Typography sx={{ pl: 1 }} color="textDisabled">
                You do not have any addresses saved
              </Typography>
            )}
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};
