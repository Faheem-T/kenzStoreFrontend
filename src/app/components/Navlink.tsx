import { Typography } from "@mui/material"
import { Link } from "react-router"

interface NavlinkProps {
    label: string,
    link: string
}

export const Navlink = ({ label, link }: NavlinkProps) => {
    return (
        <>
            <Link to={link}>
                <Typography variant="body1" sx={{ fontVariantCaps: "petite-caps" }} color="textPrimary">
                    {label}
                </Typography>
            </Link>
        </>
    )
}
