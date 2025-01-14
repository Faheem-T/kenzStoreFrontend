import { SafeAdminType } from "./admin";
import { PopulatedCategoryType } from "./categories";
import { ProductType } from "./product";
import { ReviewType, UserPopulatedReviewType } from "./reviews";
import { SafeUserType } from "./user";

interface baseResponse<T> {
  success: boolean;
  data: T;
}

export interface baseResponseWithMessage {
  success: boolean;
  message: string;
}

export interface loginResponse {
  success: boolean;
  data: {
    accessToken: string;
    user: SafeUserType;
  };
}

export interface refreshResponse {
  success: boolean;
  data: {
    accessToken: string;
  };
}

export interface meResponse {
  success: boolean;
  data: {
    accessToken: string;
    user: SafeUserType | SafeAdminType;
    isAdmin: boolean;
  };
}

export type getProductResponse = baseResponse<ProductType>;

export type getMultipleProductsResponse = baseResponse<ProductType[]>;

export type getReviewResponse = baseResponse<ReviewType>;

export interface getProductReviewsResponse {
  success: boolean;
  data: {
    ratingsCount: number;
    averageRating: number;
    productReviews: UserPopulatedReviewType[];
  };
}

export type AdminLoginResponse = baseResponse<{
  admin: SafeAdminType;
  accessToken: string;
}>;

export type getCategoryResponse = baseResponse<PopulatedCategoryType>;

export type getCategoriesResponse = baseResponse<PopulatedCategoryType[]>;
