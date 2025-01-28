import { Box, Chip, Rating, Typography } from "@mui/material";
import { ProductType } from "../types/product";
import { Link } from "react-router";
import { CategoryChipGroup } from "./CategoryChipGroup";

interface ProductCardProps {
  product: ProductType;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const isProductDiscountActive = product.finalPrice !== product.price;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          flex: 1,
          maxWidth: 250,
          minHeight: 350,
          bgcolor: "background.paper",
          padding: 4,
        }}
      >
        <Box
          sx={{
            height: 0.7,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to={`/products/${product._id}`}>
            <img src={product.images[0]} width="100%" />
          </Link>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Typography
            variant="body1"
            fontWeight="bold"
            color={isProductDiscountActive ? "accent.main" : ""}
          >
            QR {product.finalPrice}/-
          </Typography>
          {isProductDiscountActive && (
            <Typography
              sx={{ textDecoration: "line-through" }}
              variant="caption"
              color="textDisabled"
            >
              QR {product.price}/-
            </Typography>
          )}
          <Rating
            size="small"
            value={product.avgRating}
            precision={0.5}
            readOnly
          />
          <Link to={`/products/${product._id}`}>
            <Typography variant="body1">{product.name}</Typography>
          </Link>
          <Box
            sx={{
              mt: "auto",
              py: 1,
              display: "flex",
              gap: 0.5,
              flexWrap: "wrap",
            }}
          >
            <CategoryChipGroup
              categories={[product.category]}
              maxChips={2}
              chipSize="small"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
