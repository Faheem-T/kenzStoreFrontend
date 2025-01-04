import { CategoryType } from "./categories";

// SHARED TYPE: Sync with backend
export interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categories: CategoryType[];
  specifications: Record<string, string | number>;
  isHero: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}