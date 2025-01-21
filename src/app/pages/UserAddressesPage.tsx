import { useGetUserAddressesQuery } from "../api/addressesApi";
import { LoadingComponent } from "../components/LoadingComponent";
import { Box, Stack, Typography } from "@mui/material";
import { AddressCard } from "../components/AddressCard";
import { AddAddressButton } from "../components/AddAddressButton";
import { useState } from "react";
import { MapPin } from "lucide-react";

export const UserAddressesPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const { data, isLoading } = useGetUserAddressesQuery();

  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Couldn't fetch addresses</Box>;

  // DONE Create "Add Address" button
  // DONE Create Address Card component
  const addresses = data.data;
  return (
    <Stack gap={2} sx={{ p: 4 }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <MapPin size={40} />
        <Typography variant="h5">Your Addresses</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          // alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {addresses.map((address) => (
          <AddressCard address={address} key={address._id} />
        ))}
        <AddAddressButton
          isAdding={isAdding}
          onAddClick={() => setIsAdding(true)}
          onCancelClick={() => setIsAdding(false)}
        />
      </Box>
    </Stack>
  );
};
