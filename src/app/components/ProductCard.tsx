import {
  Box,
  IconButton,
  Rating,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { ProductType } from "../types/product";
import { Link } from "react-router";
import { CategoryChipGroup } from "./CategoryChipGroup";
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "../api/wishlistApi";
import { useMemo } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useAppSelector } from "../hooks";
import { selectUser } from "../features/auth/authSlice";
import { BaseResponse } from "../types/apiResponseTypes";
import { dummyProduct } from "../utils/dummyData";

interface ProductCardProps {
  product: ProductType;
}
export const ProductCard = ({ product }: ProductCardProps) => {
  const user = useAppSelector(selectUser);
  const isProductDiscountActive = product.finalPrice !== product.price;

  const [addToWishlist, { isLoading: addingToWishlist }] =
    useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: removingFromWishlist }] =
    useRemoveFromWishlistMutation();

  let wishlistData: BaseResponse<ProductType[]> | undefined;
  let isLoading = true;
  if (user) {
    const { data, isLoading: wishlistLoading } = useGetWishlistQuery();
    wishlistData = useMemo(() => data, [data]);
    isLoading = useMemo(() => wishlistLoading, [wishlistLoading]);
  } else {
    isLoading = false;
  }
  const wishlistProducts = useMemo(
    () => (wishlistData ? wishlistData.data : []),
    [wishlistData]
  );

  const inWishlist = useMemo(
    () => !!wishlistProducts.find((wProduct) => wProduct._id === product._id),
    [product, wishlistProducts]
  );
  // if (isLoading) return <LoadingComponent />;
  if (isLoading)
    return (
      <Skeleton>
        <ProductCard product={dummyProduct} />
      </Skeleton>
    );
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
        height: "100%",
        maxWidth: {
          xs: "100%",
          sm: "220px",
          md: "250px",
          lg: "280px",
        },
        minHeight: { xs: 280, sm: 320, md: 350 },
        position: "relative",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        borderRadius: 1,
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 2,
        },
        mx: "auto", // This centers the card if it's smaller than its container
      }}
    >
      {/* Wishlist Button */}
      {wishlistData && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 2,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "50%",
          }}
        >
          {inWishlist ? (
            <Tooltip title="Remove from wishlist">
              <IconButton
                onClick={handleRemoveFromWishlist}
                disabled={removingFromWishlist}
                size="small"
                sx={{
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                }}
              >
                <Heart fill="#1f0808" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Add to wishlist">
              <IconButton
                onClick={handleAddToWishlist}
                disabled={addingToWishlist}
                size="small"
                sx={{
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                }}
              >
                <Heart />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}

      {/* Product Image */}
      <Box
        sx={{
          position: "relative",
          pt: "100%", // 1:1 aspect ratio
          overflow: "hidden",
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Link
          to={`/products/${product._id}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            style={{
              width: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        </Link>
      </Box>

      {/* Product Details */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          p: { xs: 1, sm: 1.5 },
        }}
      >
        {/* Price Section */}
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 0.5 }}>
          <Typography
            variant="body1"
            fontWeight="bold"
            color={isProductDiscountActive ? "accent.main" : ""}
            sx={{ fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" } }}
          >
            ₹ {Math.floor(product.finalPrice * 100) / 100}/-
          </Typography>

          {isProductDiscountActive && (
            <Typography
              sx={{
                textDecoration: "line-through",
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
              }}
              variant="caption"
              color="textDisabled"
            >
              ₹ {Math.floor(product.price * 100) / 100}/-
            </Typography>
          )}
        </Box>

        {/* Rating */}
        <Rating
          size="small"
          value={product.avgRating}
          precision={0.5}
          readOnly
          sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}
        />

        {/* Product Name */}
        <Link
          to={`/products/${product._id}`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="body1"
            sx={{
              mt: 0.5,
              fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem" },
              fontWeight: 500,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: { xs: "2.5rem", sm: "3rem" },
              color: "text.primary",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            {product.name}
          </Typography>
        </Link>

        {/* Category Chips */}
        <Box
          sx={{
            mt: "auto",
            pt: 1,
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
  );
};
