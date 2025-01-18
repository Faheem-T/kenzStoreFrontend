import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "../hooks";
import { selectUser } from "../features/auth/authSlice";
import { SafeUserType } from "../types/user";
import { LogoutButton } from "./logoutButton";
import { Link as RouterLink } from "react-router";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Box, Link, Typography } from "@mui/material";

export const NavbarUserIcon = () => {
  const user = useAppSelector(selectUser) as SafeUserType;
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>{user.firstName}</Typography>
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Box>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            component={RouterLink}
            to="/user/profile"
            sx={{
              height: "100%",
              width: "100%",
            }}
            color="textPrimary"
          >
            Profile
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>Log out</DropdownMenuItem> */}
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
