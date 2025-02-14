import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAddToCartMutation, useGetMinimalCartQuery } from "../api/cartApi";
import { useEffect, useRef, useState } from "react";
import { LoadingComponent } from "./LoadingComponent";
import { Add, Delete, Remove } from "@mui/icons-material";
import toast from "react-hot-toast";
import { ServerError } from "../types/serverErrorType";

export const AddToCartButton = ({
  productId,
  productStock,
}: {
  productId: string;
  productStock: number;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [foundQuantity, setFoundQuantity] = useState<number>(0);
  const timerId = useRef<NodeJS.Timeout>();
  const [addToCart, { isLoading: isAddToCartLoading }] = useAddToCartMutation();
  const { data, isLoading } = useGetMinimalCartQuery();

  // Effect to set quantity if product already in cart
  useEffect(() => {
    if (data) {
      const fetchedQuantity = data.data.items.find(
        (item) => item.productId === productId
      )?.quantity;
      setFoundQuantity(fetchedQuantity ?? 0);
    }
  }, [data, productId]);

  if (isLoading) return <LoadingComponent fullScreen />;

  const handleQuantityChange = (amount: number) => {
    setFoundQuantity((prev) => {
      const nextAmount = prev + amount <= 0 ? 0 : prev + amount;
      clearTimeout(timerId.current);
      timerId.current = setTimeout(async () => {
        const { data, error } = await addToCart({
          productId,
          quantity: nextAmount,
        });
        if (data) {
          toast.success(data.message);
        }
        if (error) {
          const serverError = error as ServerError;
          console.log(error);
          toast.error(serverError.data.message);
          setFoundQuantity(prev);
        }
      }, 1500);
      return nextAmount;
    });
  };
  const handleAddToCart = async ({
    productId,
    quantity,
  }: {
    productId: string;
    quantity: number;
  }) => {
    const { data, error } = await addToCart({ productId, quantity });
    if (data) {
      toast.success(data.message);
    }
    if (error) {
      const serverError = error as ServerError;
      console.log(error);
      toast.error(serverError.data.message);
      //   setFoundQuantity(prev);
    }
  };

  return (
    <>
      {foundQuantity && foundQuantity > 0 ? (
        <Box>
          <Typography variant="caption">In Cart:</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: 1,
              borderColor: "primary.main",
              maxWidth: 200,
            }}
          >
            <Tooltip
              title={
                foundQuantity > 1 ? "Remove from cart" : "Delete from cart"
              }
            >
              <IconButton onClick={() => handleQuantityChange(-1)}>
                {foundQuantity > 1 ? <Remove /> : <Delete />}
              </IconButton>
            </Tooltip>
            <Typography sx={{ mx: "auto" }}>{foundQuantity}</Typography>
            <Tooltip title="Add to cart">
              <IconButton
                onClick={() => handleQuantityChange(1)}
                disabled={productStock <= foundQuantity}
              >
                <Add />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              label="Qty"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              type="number"
              sx={{ width: 80 }}
              size="small"
            />
            <Button
              variant="contained"
              sx={{ width: 1 }}
              onClick={() => handleAddToCart({ productId, quantity })}
              disabled={isAddToCartLoading}
            >
              <Typography variant="button" sx={{ textTransform: "uppercase" }}>
                {isAddToCartLoading ? "Adding..." : "add to cart"}
              </Typography>
            </Button>
          </Box>
        </>
      )}
    </>
  );
};
