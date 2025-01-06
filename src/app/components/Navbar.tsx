import { Box, Typography } from "@mui/material"
import { Navlink } from "./Navlink"
import theme from "../../theme"
import { useAppSelector } from "../hooks"
import { selectUser } from "../features/auth/authSlice"
import { Link } from "react-router"

export const Navbar = () => {
    const user = useAppSelector(selectUser)
    return (
        <Box sx={{ justifyContent: "space-between", alignItems: "center", display: "flex", padding: "8px 40px" }} bgcolor={theme.palette.background.paper}>
            <Link to="/home"><Typography variant="h4">K</Typography></Link>
            <Box sx={{ display: "flex", gap: "4px" }}>
                <Navlink link="/home" label="Home" />
                <Navlink link="/connectors" label="Connectors" />
                <Navlink link="/adapters" label="Adapters" />
            </Box>
            <Box sx={{ display: "flex", gap: "4px" }}>
                {user ?
                    <Typography sx={{ fontVariantCaps: "all-petite-caps" }}>{`Hello ${user.firstName}`}</Typography>
                    :
                    <Navlink link="/login" label="Login" />
                }
            </Box>
        </Box>
    )
}
