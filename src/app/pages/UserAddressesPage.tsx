import { useGetUserAddressesQuery } from "../api/addressesApi";
import LoadingComponent from "../components/LoadingComponent";
import { Box, Stack, Typography } from "@mui/material";
import { AddressCard } from "../components/AddressCard";
import { AddAddressButton } from "../components/AddAddressButton";
import { useState } from "react";
import { MapPin } from "lucide-react";

const UserAddressesPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const { data, isLoading } = useGetUserAddressesQuery();

  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Couldn't fetch addresses</Box>;

  // DONE Create "Add Address" button
  // DONE Create Address Card component
  const addresses = data.data;
  return (
    <Stack gap={2} sx={{ p: { xs: 2, md: 4 } }}>
      <Box
        sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}
      >
        <MapPin size={32} />
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
        >
          Your Addresses
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          // alignItems: "center",
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
export default UserAddressesPage;
