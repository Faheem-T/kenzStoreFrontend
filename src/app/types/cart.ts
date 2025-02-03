import { CouponType } from "./coupon";
import { ItemType, ProductPopulatedItem } from "./item";

// SHARED TYPE: Sync with backend
export interface CartType {
  _id: string; // ObjectID
  userId: string; // ObjectID
  items: ItemType[];
  coupon: string | null; // ObjectID
  discountValue: number;
  discountType: "percentage" | "fixed" | null;
  // virtual
  cartTotal: number;
}
// SHARED TYPE: Sync with backend
export interface PopulatedCartType extends Omit<CartType, "items" | "coupon"> {
  items: ProductPopulatedItem[];
  coupon?: Pick<CouponType, "_id" | "name" | "code">;
}
// export interface ProductPopulatedCartType extends ProductPopulatedCartType {
//   cartTotal: number;
// }
