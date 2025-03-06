import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { SiteLogo } from "./SiteLogo";
import { Link, useNavigate } from "react-router";
import { Modal, SxProps, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { selectUser } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks";
import { SafeUserType } from "../types/user";

// const pages = ["Products", "Pricing", "Blog"];
const pages = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Shop",
    url: "/search",
  },
  {
    title: "Webcams",
    url: "/categories/webcam",
  },
];

export const Navbar = ({ sx }: { sx?: SxProps }) => {
  const navigate = useNavigate();
  const [isSearchModalOpen, setSearchModalOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const user = useAppSelector(selectUser) as SafeUserType;

  const settings = React.useMemo(
    () =>
      user
        ? [
            {
              title: "Profile",
              url: "/user/profile",
            },
            {
              title: "Cart",
              url: "/user/cart",
            },
            {
              title: "Wallet",
              url: "/user/wallet",
            },
            {
              title: "Wishlist",
              url: "/user/wishlist",
            },
          ]
        : [{ title: "Login", url: "/login" }],
    [user]
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={sx}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <SiteLogo />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={() => navigate(page.url)}>
                  <Typography sx={{ textAlign: "center" }}>
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <SiteLogo full />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                // onClick={handleCloseNavMenu}
                onClick={() => navigate(page.url)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Search">
              <IconButton onClick={() => setSearchModalOpen(true)}>
                <Search sx={{ color: "background.default" }} />
              </IconButton>
            </Tooltip>
            <SearchModal
              isOpen={isSearchModalOpen}
              onClose={() => setSearchModalOpen(false)}
            />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={user?.picture ?? ""} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.title}
                  onClick={() => navigate(setting.url)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
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
          color: "white",
        }}
      >
        <TextField
          name="query"
          // label="Search for a product"
          placeholder="Search for a product"
          variant="standard"
          fullWidth
          sx={{ fontSize: 20, input: { color: "white" } }}
          autoFocus
        />

        <IconButton type="submit">
          <Search sx={{ color: "white" }} />
        </IconButton>

        <Box
          sx={{
            backgroundColor: "text.disabled",
            position: "absolute",
            right: "50%",
            top: "50%",
            zIndex: -1,
            borderRadius: "100%",
            boxShadow: "0 0 240px 150px #000000",
          }}
        />
      </Box>
    </Modal>
  );
};
