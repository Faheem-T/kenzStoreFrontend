import { AddressType } from "./address";
import { ItemType, ProductPopulatedItem } from "./item";
import { ProductType } from "./product";

// SHARED TYPE: Sync with backend
export interface OrderType {
  _id: string;
  userId: string; // ObjectId
  items: ItemType[];
  coupon: string; // ObjectId
  discountType: "percentage" | "fixed" | null;
  discountValue: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  address: Pick<
    AddressType,
    "address_line" | "city" | "state" | "pincode" | "landmark"
  >;

  // Cancel date
  cancelledAt: Date;

  // Virtual fields
  totalPrice: number;

  // Timestamp fields
  createdAt: Date;
  updatedAt: Date;
}

// SHARED TYPE: Sync with backend
export interface ProductPopulatedOrderType<T = ProductType>
  extends Omit<OrderType, "items"> {
  items: ProductPopulatedItem<T>[];
}

// SHARED TYPE: Sync with backend
export interface PlaceOrderType extends Pick<OrderType, "paymentMethod"> {
  cartId: string; // Cart ID
  addressId: string; // Address ID
}

// SHARED TYPE: Sync with backend
export const paymentMethods = ["COD", "Credit Card", "Debit Card"] as const;
export type PaymentMethod = (typeof paymentMethods)[number];

// SHARED TYPE: Sync with backend
export const orderStatuses = ["pending", "completed", "cancelled"] as const;
export type OrderStatus = (typeof orderStatuses)[number];

// SHARED TYPE: Sync with backend
export type GetUserOrder = ProductPopulatedOrderType<
  Pick<ProductType, "name" | "description" | "images" | "_id">
>;
