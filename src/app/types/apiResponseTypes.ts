import { ProductType } from "./product";
import { SafeUserType } from "./user";

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
    user: SafeUserType;
  };
}

export interface getProductResponse {
  success: boolean;
  data: ProductType;
}

export interface getHeroProductsResponse {
  success: boolean;
  data: ProductType[];
}
