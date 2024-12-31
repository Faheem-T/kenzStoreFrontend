import { UserType } from "./user";

export interface loginResponse {
  success: boolean;
  data: {
    accessToken: string;
    user: Omit<UserType, "password">;
  };
}
