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

export const AddToCartButton = ({ productId }: { productId: string }) => {
  const [quantity, setQuantity] = useState(1);
  const [foundQuantity, setFoundQuantity] = useState(0);
  const timerId = useRef<NodeJS.Timeout>();
  const [addToCart, { isLoading: isAddToCartLoading }] = useAddToCartMutation();
  const { data, isLoading } = useGetMinimalCartQuery();

  // Effect to set quantity if product already in cart
  useEffect(() => {
    if (data) {
      const fetchedQuantity = data.data.items.find(
        (item) => item.productId === productId
      )?.quantity;
      if (!fetchedQuantity) return;
      setFoundQuantity(fetchedQuantity);
    }
  }, [data]);

  // TODO see if it's possible to reduce the number of useEffects
  // Effect to send request to add to cart on qty change
  //   useEffect(() => {
  //     clearTimeout(timerId.current);
  //     timerId.current = setTimeout(async () => {
  //       const { data } = await addToCart({ productId, quantity: foundQuantity });
  //       if (data) {
  //         toast.success(data.data.message);
  //       }
  //     }, 1500);
  //   }, [foundQuantity]);

  if (isLoading) return <LoadingComponent fullScreen />;
  //   if (!data) return <Box>Couldn't fetch minimal cart</Box>;

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
          toast.error(serverError.message);
        }
      }, 1500);
      return nextAmount;
    });

    // clearTimeout(timerId.current);
    // timerId.current = setTimeout(async () => {
    //   await addToCart({ productId, quantity: foundQuantity });
    //   toast.success(`Added ${foundQuantity} to cart`);
    // }, 2500);
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
      toast.error(serverError.message);
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
              <IconButton onClick={() => handleQuantityChange(1)}>
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
