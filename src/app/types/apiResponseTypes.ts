import { SafeAdminType } from "./admin";
import { PopulatedCategoryType } from "./category";
import { ProductType } from "./product";
import { ReviewType, UserPopulatedReviewType } from "./reviews";
import { SafeUserType } from "./user";

export interface BaseResponse<T> {
  success: boolean;
  data: T;
}

export interface baseResponseWithMessage {
  success: boolean;
  message: string;
}

interface baseResponseWithMessageAndData<T> {
  success: boolean;
  message: string;
  data: T;
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

export type getProductResponse = BaseResponse<ProductType>;

export type getMultipleProductsResponse = BaseResponse<ProductType[]> & {
  currentPage: number;
  totalPages: number;
};

export type getReviewResponse = BaseResponse<ReviewType>;

export interface getProductReviewsResponse {
  success: boolean;
  data: {
    ratingsCount: number;
    averageRating: number;
    productReviews: UserPopulatedReviewType[];
  };
}

export type AdminLoginResponse = BaseResponse<{
  admin: SafeAdminType;
  accessToken: string;
}>;

export type getCategoryResponse = BaseResponse<PopulatedCategoryType>;

export type getCategoriesResponse = BaseResponse<PopulatedCategoryType[]>;

export type getUsersResponse = BaseResponse<SafeUserType[]>;

export type getUserResponse = BaseResponse<SafeUserType>;

export type blockUserResponse = baseResponseWithMessageAndData<SafeUserType>;

export type updateUserProfileResponse = BaseResponse<
  Pick<SafeUserType, "firstName" | "lastName" | "email">
>;
