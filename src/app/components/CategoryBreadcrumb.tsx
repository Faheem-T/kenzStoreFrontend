import { Box, Typography } from "@mui/material"
import { CategoryType } from "../types/categories"
import { Link } from "react-router"

interface CategoryBreadCrumbProps {
    categories: CategoryType[]
}

export const CategoryBreadCrumb = ({ categories }: CategoryBreadCrumbProps) => {
    const category = categories[0]

    if (!category) return

    const categoryArray = [];

    let currentCategory = category
    while (true) {
        categoryArray.unshift({ name: currentCategory.name, _id: currentCategory._id })
        if (currentCategory.parentCategory) {
            currentCategory = currentCategory.parentCategory
        } else {
            break
        }

    }

    return (
        <Box sx={{ padding: 4, display: "flex", gap: 1 }}>
            {categoryArray.map((category, i) => (
                <Link to={`category/${category._id}`} key={category.name}>
                    <Box sx={{ display: "inline-flex", gap: 1 }}>
                        <Typography
                            variant="subtitle"
                            color="textDisabled"
                            sx={theme => ({
                                "&:hover": {
                                    textDecoration: "underline",
                                    color: theme.palette.text.primary
                                },
                                color: (i === categoryArray.length - 1) && theme.palette.text.primary
                            })}
                        >
                            {`${category.name}`}
                        </Typography>
                        {(i !== categoryArray.length - 1) && /*Omiting the > symbol for last item*/
                            <Typography variant="subtitle1" sx={theme => ({ color: theme.palette.text.secondary })}>
                                {">"}
                            </Typography>
                        }

                    </Box>
                </Link>
            ))}
        </Box>
    )
}
