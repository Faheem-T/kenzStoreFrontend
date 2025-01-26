import { RootState } from "@/app/store";
import { CreateProductType } from "@/app/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType
  extends Omit<CreateProductType, "specifications" | "images"> {
  features: { name: string; value: string }[];
  physical: { name: string; value: string }[];
  technical: { name: string; value: string }[];
  imagePreviews: { url: string; file: FormDataEntryValue }[];
}

const initialState: initialStateType = {
  name: "",
  description: "",
  brand: "",
  price: 0,
  stock: 0,
  category: "",
  features: [],
  physical: [],
  technical: [],
  imagePreviews: [],
};

const adminCreateProductSlice = createSlice({
  name: "adminCreateProduct",
  initialState,
  reducers: {
    savedNewProductDetails: (
      state,
      action: PayloadAction<Omit<initialStateType, "imagePreviews">>
    ) => {
      return { ...state, ...action.payload };
    },
    savedNewProductImages: (
      state,
      action: PayloadAction<Pick<initialStateType, "imagePreviews">>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export default adminCreateProductSlice.reducer;

export const { savedNewProductDetails, savedNewProductImages } =
  adminCreateProductSlice.actions;

// selectors
export const selectCreateProduct = (state: RootState) => state.createProduct;
export const selectCreateProductDetails = (state: RootState) => {
  const {
    name,
    description,
    brand,
    price,
    stock,
    category,
    features,
    technical,
    physical,
  } = state.createProduct;
  return {
    name,
    description,
    brand,
    price,
    stock,
    category,
    features,
    technical,
    physical,
  };
};

export const selectCreateProductImages = (state: RootState) =>
  state.createProduct.imagePreviews;
