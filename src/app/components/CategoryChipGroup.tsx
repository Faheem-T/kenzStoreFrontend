import { Box, Chip } from "@mui/material";
import { CategoryType, PopulatedCategoryType } from "../types/categories";

interface CategoryChipGroupProps {
  categories: CategoryType[] | PopulatedCategoryType[];
  chipSize?: "small" | "medium";
  maxChips?: number;
}

export const CategoryChipGroup: React.FC<CategoryChipGroupProps> = ({
  categories,
  chipSize = "small",
  maxChips = 2,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {categories.slice(0, maxChips).map((category) => (
        <Chip size={chipSize} label={category.name} key={category._id} />
      ))}
      {categories.length > maxChips && (
        <Chip size={chipSize} label={`+${categories.length - maxChips}`} />
      )}
    </Box>
  );
};
