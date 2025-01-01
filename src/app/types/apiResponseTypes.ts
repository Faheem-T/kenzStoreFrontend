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
