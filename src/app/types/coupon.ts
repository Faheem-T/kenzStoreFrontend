// SHARED TYPE: Sync with backend
export interface CouponType {
  _id: string;
  name: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
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
  "name" | "code" | "description" | "discountValue"
> & {
  limitPerUser?: number;
  validUntil?: Date;
  minOrderAmount?: number;
  discountType?: "percentage" | "fixed";
};
// SHARED TYPE: Sync with backend
export type UpdateCouponType = Partial<CreateCouponType>;

export type FetchCouponType = Pick<
  CouponType,
  | "_id"
  | "code"
  | "name"
  | "isValid"
  | "validUntil"
  | "description"
  | "discountType"
  | "discountValue"
  | "minOrderAmount"
>;
