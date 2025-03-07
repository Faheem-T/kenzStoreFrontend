import { Box, Typography } from "@mui/material";
import { PopulatedCategoryType } from "../types/category";
import { Link } from "react-router";

interface CategoryBreadCrumbProps {
  categories: PopulatedCategoryType[];
}

export const CategoryBreadCrumb = ({ categories }: CategoryBreadCrumbProps) => {
  const category = categories[0];

  if (!category) return;

  const categoryArray = [];

  let currentCategory = category;
  while (true) {
    categoryArray.unshift({
      name: currentCategory.name,
      slug: currentCategory.slug,
      _id: currentCategory._id,
    });
    if (currentCategory.parentCategory) {
      currentCategory = currentCategory.parentCategory;
    } else {
      break;
    }
  }

  return (
    <Box sx={{ padding: 4, display: "flex", gap: 1 }}>
      {categoryArray.map((category, i) => (
        <Link to={`/categories/${category.slug}`} key={category.name}>
          <Box sx={{ display: "inline-flex", gap: 1 }}>
            <Typography
              sx={{
                color:
                  i === categoryArray.length - 1
                    ? "text.primary"
                    : "text.disabled",
                "&:hover": {
                  textDecoration: "underline",
                  color: "text.primary",
                },
              }}
            >
              {`${category.name}`}
            </Typography>
            {i !==
              categoryArray.length -
                1 /*Omiting the > symbol for last item*/ && (
              <Typography
                variant="subtitle1"
                sx={(theme) => ({ color: theme.palette.text.secondary })}
              >
                {">"}
              </Typography>
            )}
          </Box>
        </Link>
      ))}
    </Box>
  );
};
