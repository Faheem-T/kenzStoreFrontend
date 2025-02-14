import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { PopulatedCategoryType } from "../types/category";
import { Link } from "react-router";

interface CategoryCardProps {
  category: PopulatedCategoryType;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Card
      component={Link}
      to={`/search?category=${category._id}`}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={category.image || "/placeholder.svg?height=140&width=280"}
        alt={category.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {category.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {category.description}
        </Typography>
      </CardContent>
    </Card>
  );
};
