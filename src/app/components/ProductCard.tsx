import { Box, IconButton, Rating, Tooltip, Typography } from "@mui/material";
import { ProductType } from "../types/product";
import { Link } from "react-router";
import { CategoryChipGroup } from "./CategoryChipGroup";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "../api/wishlistApi";
import { LoadingComponent } from "./LoadingComponent";
import { useMemo } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: ProductType;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const isProductDiscountActive = product.finalPrice !== product.price;
  const [addToWishlist, { isLoading: addingToWishlist }] =
    useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: removingFromWishlist }] =
    useRemoveFromWishlistMutation();
  const { data: wishlistData, isLoading } = useGetWishlistQuery();
  const wishlistProducts = useMemo(
    () => (wishlistData ? wishlistData.data : []),
    [wishlistData]
  );

  const inWishlist = useMemo(
    () => !!wishlistProducts.find((wProduct) => wProduct._id === product._id),
    [product, wishlistProducts]
  );
  if (isLoading) return <LoadingComponent />;
  // if (!wishlistData) {
  //   return <Box>Couldn't fetch wishlist</Box>;
  // }

  const handleAddToWishlist = async () => {
    try {
      await addToWishlist({ productId: product._id }).unwrap();
      toast.success("Product has been added to wishlist successfully");
    } catch (error) {
      console.log(error);
      toast.error("That did not work");
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      await removeFromWishlist({ productId: product._id }).unwrap();
      toast.success("Product has been removed from wishlist successfully");
    } catch (error) {
      console.log(error);
      toast.error("That did not work");
    }
  };

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
          // bgcolor: "background.paper",
          // padding: 4,
          position: "relative",
          // borderRadius: 1,
          // boxShadow: 8,
        }}
      >
        {wishlistData && (
          <Box sx={{ position: "absolute", top: 2, right: 2 }}>
            {inWishlist ? (
              <Tooltip title="Remove from wishlist">
                <IconButton
                  onClick={handleRemoveFromWishlist}
                  disabled={removingFromWishlist}
                >
                  <Heart fill="#1f0808" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Add to wishlist">
                <IconButton
                  onClick={handleAddToWishlist}
                  disabled={addingToWishlist}
                >
                  <Heart />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
        <Box
          sx={{
            height: 0.7,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.paper",
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
