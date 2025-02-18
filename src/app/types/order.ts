import { AddressType } from "./address";
import { ItemType, ProductPopulatedItem } from "./item";
import { ProductType } from "./product";

// SHARED TYPE: Sync with backend
export interface OrderType {
  _id: string;
  userId: string; // ObjectId
  items: ItemType[];
  coupon: string | null; // ObjectId
  discountType: "percentage" | "fixed" | null;
  discountValue: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  address: Pick<
    AddressType,
    "address_line" | "city" | "state" | "pincode" | "landmark"
  >;

  // Cancel & complete date
  cancelledAt?: string; // Date
  completedAt?: string; // Date

  // payment related fields
  paymentOrder: any;
  paymentStatus: PaymentStatus;

  // Virtual fields
  originalPrice: number;
  totalPrice: number;

  // Timestamp fields
  createdAt: string; //Date
  updatedAt: string; //Date
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
export const paymentMethods = ["cod", "online", "wallet"] as const;
export type PaymentMethod = (typeof paymentMethods)[number];

// SHARED TYPE: Sync with backend
export const paymentStatuses = ["incomplete", "paid", "refunded"] as const;
export type PaymentStatus = (typeof paymentStatuses)[number];

// SHARED TYPE: Sync with backend
export const orderStatuses = [
  "pending",
  "completed",
  "cancelled",
  "requesting return",
  "returned",
] as const;
export type OrderStatus = (typeof orderStatuses)[number];

// SHARED TYPE: Sync with backend
export type GetUserOrder = ProductPopulatedOrderType<
  Pick<
    ProductType,
    "name" | "description" | "images" | "_id" | "effectiveDiscount"
  >
>;
