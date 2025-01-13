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

export interface PopulatedCategoryType
  extends Omit<CategoryType, "parentCategory"> {
  parentCategory: CategoryType | null;
}
