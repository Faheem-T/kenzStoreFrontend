import { useGetUserAddressesQuery } from "@/app/api/addressesApi";
import { LoadingComponent } from "@/app/components/LoadingComponent";
import { AddressType } from "@/app/types/address";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export const CheckoutAddressSelectionSection = ({
  addressId,
  setAddressId,
}: {
  addressId: string;
  setAddressId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data, isLoading } = useGetUserAddressesQuery();
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
    </>
  );
};

const SelectableAddressForm = ({
  addresses,
  selectedId,
  setSelectedId,
}: {
  addresses: AddressType[];
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const defaultAddressId = addresses.find((address) => address.isDefault)?._id;
  if (defaultAddressId) {
    setSelectedId(defaultAddressId);
  }
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
              >
                <FormControlLabel
                  value={address._id}
                  label={
                    <Box>
                      <Typography fontSize={18} fontWeight={"bold"}>
                        {address.city}
                      </Typography>
                      {/* <Box sx={{ pl: 1 }}>
                        <Typography>{address.state}</Typography>
                        <Typography>{address.address_line}</Typography>
                        <Typography>{address.landmark}</Typography>
                      </Box> */}
                      <Typography sx={{ pl: 1 }}>
                        {`${address.address_line}, ${address.city}, ${address.state}`}
                      </Typography>
                    </Box>
                  }
                  control={<Radio />}
                />
              </Box>
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};
