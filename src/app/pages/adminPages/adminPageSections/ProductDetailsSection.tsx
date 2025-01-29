import { ProductType } from "@/app/types/product";
import { Box, Chip, Typography } from "@mui/material";
import { SpecificationSection } from "../../pageSections/SpecificationSection";
import { CategoryChipGroup } from "../../../components/CategoryChipGroup";

export const ProductDetailsSection = ({
  product,
}: {
  product: ProductType;
}) => {
  const isDiscountActive = product.finalPrice < product.price;

  return (
    <>
      <Box>
        <Typography variant="caption" color="textDisabled">
          Product Name:
        </Typography>
        <Typography variant="h6">{product.name}</Typography>
      </Box>
      <Box>
        <Typography variant="caption" color="textDisabled">
          Product Brand:
        </Typography>
        <Typography variant="h6">{product.brand}</Typography>
      </Box>
      <Box>
        <Typography variant="caption" color="textDisabled">
          Product Price:
        </Typography>
        <Typography variant="h6">QR {product.price}/-</Typography>
      </Box>
      {isDiscountActive && product.effectiveDiscount && (
        <Box>
          <Typography variant="caption" color="textDisabled">
            Discounted Price:
          </Typography>
          <Chip
            label={`-${product.effectiveDiscount.value} ${
              product.discountType === "percentage" ? "%" : "QR"
            }`}
            size="small"
            sx={{ color: "primary" }}
          />
          <Typography variant="h6" color="accent">
            QR {product.finalPrice}/-
          </Typography>
        </Box>
      )}
      <Box>
        <Typography variant="caption" color="textDisabled">
          Stock
        </Typography>
        <Typography variant="body1" color={product.stock === 0 ? "error" : ""}>
          {product.stock}
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption" color="textDisabled">
          Product Description:
        </Typography>
        <Typography variant="body1">{product.description}</Typography>
      </Box>
      <Box>
        <Typography variant="caption" color="textDisabled">
          Product Categories
        </Typography>
        <CategoryChipGroup categories={[product.category]} maxChips={100} />
      </Box>
      <Box>
        <SpecificationSection
          specifications={product.specifications}
          marginRight={"10rem"}
        />
      </Box>
    </>
  );
};
