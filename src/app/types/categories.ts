// SHARED TYPE: Sync with backend
export interface CategoryType {
  _id: string;
  name: string;
  slug: string; // URL friendly category name
  description?: string;
  // parentCategory?: string; // ObjectId of parent category
  parentCategory?: CategoryType;
  image?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
