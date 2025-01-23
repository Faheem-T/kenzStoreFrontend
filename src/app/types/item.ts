import { ProductType } from "./product";

// SHARED TYPE: Sync with backend
export interface ItemType {
  _id: string; // ObjectID
  productId: string; // ObjectID
  price: number;
  quantity: number;
}
// SHARED TYPE: Sync with backend
export interface ProductPopulatedItem extends Omit<ItemType, "productId"> {
  productId: ProductType;
}
