// SHARED TYPE: Sync with backend
export interface CouponType {
  _id: string;
  name: string;
  code: string;
  discountPercentage: number;
  limitPerUser: number;
  minOrderAmount: number;
  description?: string;
  validUntil?: string; // Date
  totalUsedCount: number;
  redeemedUsers: string[]; // ObjectIds

  // deletion indicator
  isDeleted: boolean;

  // virtuals
  isValid: boolean;
  // timestamps
  createdAt: Date;
  updatedAt: Date;
}
// SHARED TYPE: Sync with backend
export type CreateCouponType = Pick<
  CouponType,
  | "name"
  | "code"
  | "description"
  | "discountPercentage"
  | "limitPerUser"
  | "validUntil"
  | "minOrderAmount"
>;
// SHARED TYPE: Sync with backend
export type UpdateCouponType = Partial<CreateCouponType>;
