import { ProductType } from "./product";

// SHARED TYPE: Sync with frontend
export interface CartType {
  _id: string; // ObjectID
  userId: string; // ObjectID
  items: {
    _id: string; // ObjectID
    productId: string; // ObjectID
    price: number;
    quantity: number;
  }[];
}
// SHARED TYPE: Sync with frontend
export interface ProductPopulatedCartType extends Omit<CartType, "items"> {
  items: {
    _id: string; // ObjectID
    productId: Partial<ProductType>;
    price: number;
    quantity: number;
  }[];
}
