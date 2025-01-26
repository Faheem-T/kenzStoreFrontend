export interface CategoryType {
  _id: string;
  name: string;
  slug: string; // URL friendly category name
  description?: string;
  parentCategory?: string; // ObjectId of parent category
  image?: string;
  isActive: boolean;
  // deletion indicator
  isDeleted: boolean;
  // timestamp fields
  createdAt?: Date;
  updatedAt?: Date;
}

// SHARED TYPE: Sync with backend
export interface PopulatedCategoryType
  extends Omit<CategoryType, "parentCategory"> {
  parentCategory: PopulatedCategoryType | null;
}

// SHARED TYPE: Sync with backend
// Type for creating a new category
export type CreateCategoryType = Omit<
  CategoryType,
  "_id" | "createdAt" | "updatedAt" | "slug" | "isActive" | "isDeleted"
>;

// SHARED TYPE: Sync with backend
// Type for updating an existing category
export type UpdateCategoryType = Partial<CreateCategoryType>;
