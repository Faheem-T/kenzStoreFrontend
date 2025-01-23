import { ItemType, ProductPopulatedItem } from "./item";

// SHARED TYPE: Sync with backend
export interface CartType {
  _id: string; // ObjectID
  userId: string; // ObjectID
  items: ItemType[];
}
// SHARED TYPE: Sync with backend
export interface ProductPopulatedCartType extends Omit<CartType, "items"> {
  items: ProductPopulatedItem[];
}
export interface ProductAndTotalPopulatedCartType
  extends ProductPopulatedCartType {
  cartTotal: number;
}
