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
export type PaymentMethod = "COD" | "Credit Card" | "Debit Card";

// SHARED TYPE: Sync with backend
export type OrderStatus = "pending" | "completed" | "cancelled";
