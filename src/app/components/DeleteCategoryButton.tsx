import { Button, Tooltip } from "@mui/material";
import {
  useDeleteCategoryOfferMutation,
  useDeleteProductOfferMutation,
} from "../api/offerApi";

export const DeleteOfferButton = ({
  id,
  type,
}: {
  id: string;
  type: "category" | "product";
}) => {
  const [deleteProductOffer, { isLoading: isDeletingProductOffer }] =
    useDeleteProductOfferMutation();
  const [deleteCategoryOffer, { isLoading: isDeletingCategoryOffer }] =
    useDeleteCategoryOfferMutation();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (type === "category") {
      await deleteCategoryOffer(id);
    } else if (type === "product") {
      await deleteProductOffer(id);
    }
  };

  return (
    <Tooltip title="Delete offer">
      <Button
        onClick={handleDelete}
        disabled={isDeletingProductOffer || isDeletingCategoryOffer}
      >
        Delete
      </Button>
    </Tooltip>
  );
};
