import { ProductType } from "./product";

// SHARED TYPE: Sync with backend
export interface CartType {
  userId: string;
  items: { productId: string; quantity: number }[];
}

// SHARED TYPE: Sync with backend
export interface ProductPopulatedCartType extends Omit<CartType, "items"> {
  items: { productId: ProductType; quantity: number }[];
}
