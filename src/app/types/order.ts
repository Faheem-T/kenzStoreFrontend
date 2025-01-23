import { AddressType } from "./address";
import { ItemType } from "./item";

// SHARED TYPE: Sync with backend
export interface OrderType {
  _id: string;
  userId: string; // ObjectId
  items: ItemType[];
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  address: Pick<
    AddressType,
    "address_line" | "city" | "state" | "pincode" | "landmark"
  >;

  // Virtual fields
  totalPrice: number;

  // Timestamp fields
  createdAt: Date;
  updatedAt: Date;
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
