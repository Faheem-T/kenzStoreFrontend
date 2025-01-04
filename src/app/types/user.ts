// SHARED TYPE: Sync with backend
export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  DOB: Date;
  password: string;
  createdAt: Date;
  updatedAt: Date
}

// SHARED TYPE: Sync with backend
// without the password
export type SafeUserType = Omit<UserType, "password">
