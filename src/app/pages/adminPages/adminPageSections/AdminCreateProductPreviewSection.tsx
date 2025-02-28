import { useCreateProductMutation } from "@/app/api/productsApi";
import { ProductDetailsSection } from "@/app/pages/adminPages/adminPageSections/ProductDetailsSection";
import { ImageViewComponent } from "@/app/components/ImageViewComponent";
import { selectCreateProduct } from "@/app/features/admin/adminCreateProductSlice";
import { useAppSelector } from "@/app/hooks";
import { ProductSpecificationType, ProductType } from "@/app/types/product";
import { uploadToCloudinary } from "@/app/uploadToCloudinary";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface AdminCreateProductPreviewSectionProps {
  prevTab: () => void;
}
export const AdminCreateProductPreviewSection = ({
  prevTab,
}: AdminCreateProductPreviewSectionProps) => {
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [uploadProgressCount, setUploadProgressCount] = useState(0);
  const navigate = useNavigate();

  const [createCreateProductMutation, { isLoading }] =
    useCreateProductMutation();

  const newProduct = useAppSelector(selectCreateProduct);

  const { features, physical, technical, imagePreviews, ...rest } = newProduct;

  // generating urls for image preview component
  const imageUrls = imagePreviews.map((image) => image.url);

  const specifications: ProductSpecificationType[] = [
    ...features.map(
      (feature) =>
        ({
          category: "feature",
          name: feature.name,
          value: feature.value,
        } as const)
    ),
    ...physical.map(
      (physical) =>
        ({
          category: "physical",
          name: physical.name,
          value: physical.value,
        } as const)
    ),
    ...technical.map(
      (technical) =>
        ({
          category: "technical",
          name: technical.name,
          value: technical.value,
        } as const)
    ),
  ];

  const handleConfirmClick = async () => {
    // upload images to cloudinary
    // save the generated urls
    setIsUploadLoading(true);
    const images: string[] = [];
    for (let i = 0; i < imagePreviews.length; i++) {
      try {
        let url = await uploadToCloudinary(imagePreviews[i].file);
        setUploadProgressCount((prev) => prev + 1);
        images.push(url);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    }
    setIsUploadLoading(false);
    // send create product request to backend
    const { data, error } = await createCreateProductMutation({
      specifications,
      images,
      ...rest,
    });
    // redirect to new product page
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      toast.success("Product created successfully");
      navigate(`/admin/products/${data.data._id}`);
    }
  };

  return (
    <Stack gap={2}>
      <Typography variant="h5">Product Details</Typography>
      <ProductDetailsSection
        product={
          {
            ...rest,
            specifications,
          } as any as ProductType
        }
        // TODO Make the product details section more flexible
      />
      <Typography variant="h5">Images</Typography>
      <Box>
        <ImageViewComponent images={imageUrls} />
      </Box>
      <Button
        variant="contained"
        disabled={isLoading || isUploadLoading}
        onClick={handleConfirmClick}
      >
        {isLoading
          ? "Loading..."
          : isUploadLoading
          ? "Uploading Images..." +
            `${uploadProgressCount} / ${imagePreviews.length}`
          : "Confirm"}
      </Button>
      <Button onClick={prevTab} disabled={isLoading || isUploadLoading}>
        Go back
      </Button>
    </Stack>
  );
};
