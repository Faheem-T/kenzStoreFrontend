import { Variant } from "@mui/material/styles/createTypography";
import { ProductType } from "../types/product";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router";

interface HeroProductComponentProps {
  product: ProductType;
}

export const HeroProductComponent = ({
  product,
}: HeroProductComponentProps) => {
  let heroTypographyVariant: Variant = "h3";
  if (product.name.length > 25) {
    heroTypographyVariant = "h4";
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: 8,
        alignItems: "center",
      }}
    >
      <Box sx={{ width: 1 / 2, flex: 1 }}>
        <Link
          to={`/products/${product._id}`}
          state={product}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <Typography variant={heroTypographyVariant}>
            {product.name}
          </Typography>
        </Link>
        {product?.category.name}
        <Typography variant="h4" color="secondary" fontWeight="800">
          ₹ {product.price}/-
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 1 / 2, flexShrink: 1 }}>
        <img src={product.images[0]} width="80%" />
      </Box>
    </Box>
  );
};
