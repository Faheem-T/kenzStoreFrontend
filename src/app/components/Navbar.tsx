import { Badge, Box, IconButton, Typography } from "@mui/material";
import { Navlink } from "./Navlink";
import theme from "../../theme";
import { useAppSelector } from "../hooks";
import { selectUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router";
import { SafeUserType } from "../types/user";
import { NavbarUserIcon } from "./NavbarUserIcon";
import { ShoppingCart } from "lucide-react";
import { useGetMinimalCartQuery } from "../api/cartApi";
import { LoadingComponent } from "./LoadingComponent";
import { SiteLogo } from "./SiteLogo";

export const Navbar = () => {
  const user = useAppSelector(selectUser) as SafeUserType;
  const navigate = useNavigate();
  let CartIcon: () => React.ReactElement;
  const { data: cartData, isLoading: cartLoading } = useGetMinimalCartQuery();
  if (cartLoading) CartIcon = () => <LoadingComponent />;
  else {
    CartIcon = () => {
      return (
        <Badge badgeContent={cartData?.data.items.length}>
          <IconButton onClick={() => navigate("/user/cart")}>
            <ShoppingCart size={20} />
          </IconButton>
        </Badge>
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
      }}
      bgcolor={theme.palette.background.paper}
    >
      <Link to="/home">
        <SiteLogo />
      </Link>
      <Box sx={{ display: "flex", gap: "4px" }}>
        <Navlink link="/home" label="Home" />
        <Navlink link="/connectors" label="Connectors" />
        <Navlink link="/adapters" label="Adapters" />
      </Box>
      <Box sx={{ display: "flex", gap: "4px" }}>
        {user ? (
          <>
            <CartIcon />
            <NavbarUserIcon />
          </>
        ) : (
          <Navlink link="/login" label="Login" />
        )}
      </Box>
    </Box>
  );
};
