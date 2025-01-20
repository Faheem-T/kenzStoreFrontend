// SHARED TYPE: Sync with backend
export interface AddressType {
  _id: string;
  userId: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}
