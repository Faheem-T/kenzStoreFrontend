import { Typography } from "@mui/material";
import { Link } from "react-router";

interface NavlinkProps {
  label: string;
  link: string;
}

export const Navlink = ({ label, link }: NavlinkProps) => {
  return (
    <>
      <Link to={link}>
        <Typography
          variant="body1"
          sx={{
            fontVariantCaps: "petite-caps",
            // fontSize: "1em",
            transition: "all .2s",
            "&:hover": {
              //   textDecoration: "underline",
              fontWeight: "bold",
              //   fontSize: "103%",
            },
            textShadow: "0px 0px 15px #000000",
          }}
          color="textPrimary"
        >
          {label}
        </Typography>
      </Link>
    </>
  );
};
