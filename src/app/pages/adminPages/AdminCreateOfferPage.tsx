import {
  useCreateCategoriesOfferMutation,
  useCreateProductsOfferMutation,
} from "@/app/api/offerApi";
import { CategoriesAutocomplete } from "@/app/components/adminComponents/CategoriesAutocomplete";
import { ProductsAutocomplete } from "@/app/components/adminComponents/ProductsAutocomplete";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";

const baseCreateOfferSchema = z.object({
  name: z.string().trim().nonempty("Name is required"),
  discountType: z.enum(["percentage", "fixed"]).default("percentage"),
  discountValue: z.number().min(0),
  startDate: z.date(),
  endDate: z.date().refine((date) => date > new Date(), {
    message: "End date cannot be in the past",
  }),
});

const createProductOfferSchema = baseCreateOfferSchema.extend({
  products: z.array(z.string()),
});

const createCategoryOfferSchema = baseCreateOfferSchema.extend({
  categories: z.array(z.string()),
});

// type createOfferForm = z.infer<typeof baseCreateOfferSchema>;

export const AdminCreateOfferPage = ({
  type,
}: {
  type: "product" | "category";
}) => {
  const navigate = useNavigate();
  const offerSchema =
    type === "product" ? createProductOfferSchema : createCategoryOfferSchema;
  type createOfferForm = z.infer<typeof offerSchema>;

  const form = useForm<createOfferForm>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      name: "",
      discountType: "percentage",
      discountValue: 0,
      startDate: new Date(), // Set default date
      endDate: new Date(), // Set default date
    },
  });
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    control,
    watch,
  } = form;

  const discountType = watch("discountType");

  const [
    createProductOffer,
    { isLoading: isCreatingProductOffer, error: productOfferError },
  ] = useCreateProductsOfferMutation();
  const [
    createCategoryOffer,
    { isLoading: isCreatingCategoryOffer, error: categoryOfferError },
  ] = useCreateCategoriesOfferMutation();

  const submitHandler = async (data: createOfferForm) => {
    const { name, discountType, discountValue, startDate, endDate } = data;
    if (endDate < startDate) {
      return setError("endDate", {
        type: "value",
        message: "End date must be after start date",
      });
    }

    if (discountType === "percentage" && discountValue > 100) {
      return setError("discountValue", {
        type: "value",
        message: "Discount percentage cannot be greater than 100%",
      });
    }

    if ("products" in data) {
      // Handle product offer
      const products = data.products;
      await createProductOffer({
        discountType,
        discountValue,
        name,
        startDate,
        endDate,
        products,
      });
      if (productOfferError) {
        toast.error("That did not work...");
      } else {
        toast.success("Offer created successfully");
        navigate("/admin/offers/products");
      }
    } else {
      // Handle category offer
      const categories = data.categories;
      await createCategoryOffer({
        discountType,
        discountValue,
        name,
        startDate,
        endDate,
        categories,
      });
      if (categoryOfferError) {
        toast.error("That did not work...");
      } else {
        toast.success("Offer created successfully");
        navigate("/admin/offers/categories");
      }
    }
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        sx={{ display: "flex", flexDirection: "column", width: 1, p: 4 }}
        gap={3}
      >
        <FormControl>
          <FormLabel>Offer Name</FormLabel>
          <TextField
            {...register("name")}
            //   label="Name"
            placeholder="Eg: 10% off select products"
            variant="standard"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </FormControl>

        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
          <FormControl>
            <FormLabel>Discount Type</FormLabel>
            <Controller
              name="discountType"
              control={control}
              defaultValue="percentage"
              render={({ field }) => (
                <Select {...field} label="Discount Type" variant="standard">
                  <MenuItem value="percentage">Percentage</MenuItem>
                  <MenuItem value="fixed">Fixed</MenuItem>
                </Select>
              )}
            />
            {errors.discountType && (
              <FormHelperText error>
                {errors.discountType.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Discount Value</FormLabel>
            <TextField
              {...register("discountValue", { valueAsNumber: true })}
              type="number"
              variant="standard"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      {discountType === "percentage" ? "%" : "₹"}
                    </InputAdornment>
                  ),
                },
              }}
            />
            {errors.discountValue && (
              <FormHelperText error>
                {errors.discountValue.message}
              </FormHelperText>
            )}
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl>
            <FormLabel>Discount Start Date</FormLabel>
            <Controller
              name="startDate"
              control={control}
              render={({ field: { value, onChange, ...field } }) => (
                <Input
                  {...field}
                  type="date"
                  value={value ? value.toISOString().split("T")[0] : ""}
                  onChange={(e) =>
                    onChange(e.target.value ? new Date(e.target.value) : null)
                  }
                />
              )}
            />
            {errors.startDate && (
              <FormHelperText error>{errors.startDate.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Discount End Date</FormLabel>
            <Controller
              name="endDate"
              control={control}
              render={({ field: { value, onChange, ...field } }) => (
                <Input
                  {...field}
                  type="date"
                  value={value ? value.toISOString().split("T")[0] : ""}
                  onChange={(e) =>
                    onChange(e.target.value ? new Date(e.target.value) : null)
                  }
                />
              )}
            />
            {errors.endDate && (
              <FormHelperText error>{errors.endDate.message}</FormHelperText>
            )}
          </FormControl>
        </Box>

        {type === "product" ? (
          <ProductsAutocomplete errors={errors} control={control} />
        ) : (
          <CategoriesAutocomplete errors={errors} control={control} />
        )}

        <Button
          variant="contained"
          type="submit"
          disabled={isCreatingProductOffer || isCreatingCategoryOffer}
        >
          {isCreatingProductOffer || isCreatingCategoryOffer
            ? "Creating Offer..."
            : "Create Offer"}
        </Button>
        <DevTool control={control} />
      </Box>
    </>
  );
};
