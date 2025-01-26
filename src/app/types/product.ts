import { PopulatedCategoryType } from "./category";

// SHARED TYPE: Sync with backend
export interface ProductType {
  _id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  stock: number;
  images: string[];
  // category: CategoryType;
  category: PopulatedCategoryType;
  listed: boolean;
  isHero?: boolean;

  specifications: ProductSpecificationType[];

  //for soft deletion
  isDeleted: boolean;

  // discount related fields
  discountType?: "percentage" | "fixed";
  discountValue?: number;
  discountStartDate?: Date;
  discountEndDate?: Date;
  // discount virtuals
  isDiscountActive: boolean;
  finalPrice: number;

  // ratings related fields
  ratingsCount: number;
  avgRating: number;

  // auto generated by DB
  createdAt?: Date;
  updatedAt?: Date;
}

// SHARED TYPE: Sync with backend
export interface ProductSpecificationType {
  name: string;
  value: string;
  category: "technical" | "physical" | "feature";
  isHighlight?: boolean;
}

// SHARED TYPE: Sync with backend
export interface CreateProductType
  extends Omit<
    ProductType,
    | "_id"
    | "createdAt"
    | "updatedAt"
    | "discountPrice"
    | "isDiscountActive"
    | "finalPrice"
    | "listed"
    | "isHero"
    | "category" // changing from populated to id
    | "isDeleted"
  > {
  category: string;
}

// SHARED TYPE: Sync with backend
export interface UpdateProductType
  extends Partial<Omit<CreateProductType, "category">> {
  category?: string;
}
