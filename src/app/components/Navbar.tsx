import {
  Badge,
  Box,
  IconButton,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import { Navlink } from "./Navlink";
import { useAppSelector } from "../hooks";
import { selectUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router";
import { SafeUserType } from "../types/user";
import { NavbarUserIcon } from "./NavbarUserIcon";
import { useGetMinimalCartQuery } from "../api/cartApi";
import { LoadingComponent } from "./LoadingComponent";
import { SiteLogo } from "./SiteLogo";
import { useState } from "react";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";

export const Navbar = ({ transparent }: { transparent?: boolean }) => {
  const user = useAppSelector(selectUser) as SafeUserType;
  const navigate = useNavigate();
  let CartIcon: () => React.ReactElement;
  const { data: cartData, isLoading: cartLoading } = useGetMinimalCartQuery();
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  if (cartLoading) CartIcon = () => <LoadingComponent />;
  else {
    CartIcon = () => {
      return (
        <Tooltip title="Cart">
          <Badge badgeContent={cartData?.data.items.length}>
            <IconButton onClick={() => navigate("/user/cart")}>
              <ShoppingCartOutlined />
            </IconButton>
          </Badge>
        </Tooltip>
      );
    };
  }

  return (
    <Box
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        padding: "8px 40px",
        backgroundColor: transparent ? "" : "background.paper",
      }}
    >
      <Link to="/home">
        <SiteLogo />
      </Link>
      <Box sx={{ display: "flex", gap: "4px" }}>
        <Navlink link="/home" label="Home" />
        <Navlink link="/connectors" label="Connectors" />
        <Navlink link="/adapters" label="Adapters" />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        {user ? (
          <>
            {/* Search button */}
            <Tooltip title="Search">
              <IconButton onClick={() => setSearchModalOpen(true)}>
                <Search />
              </IconButton>
            </Tooltip>
            <CartIcon />
            <NavbarUserIcon />
          </>
        ) : (
          <Navlink link="/login" label="Login" />
        )}
      </Box>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </Box>
  );
};

const SearchModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = (e.target as any).query.value;
    navigate(`/search/?q=${query}`);
    onClose();
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{
          width: 350,
          display: "flex",
          gap: 1,
          alignItems: "center",
          position: "relative",
        }}
      >
        <TextField
          name="query"
          // label="Search for a product"
          placeholder="Search for a product"
          variant="standard"
          fullWidth
          sx={{ fontSize: 20 }}
          autoFocus
        />
        <IconButton type="submit">
          <Search />
        </IconButton>
        <Box
          sx={{
            // width: 20,
            // height: 20,
            backgroundColor: "text.disabled",
            position: "absolute",
            right: "50%",
            top: "50%",
            zIndex: -1,
            borderRadius: "100%",
            boxShadow: "0 0 140px 100px #000000",
          }}
        />
      </Box>
    </Modal>
  );
};
