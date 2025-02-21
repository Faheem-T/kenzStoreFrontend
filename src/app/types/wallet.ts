// SHARED
export interface WalletType {
  user: string; // ObjectId
  balance: number;
  history: {
    _id: string; // ObjectId
    amount: number;
    logType: WalletHistoryType;
    notes?: string;
    timestamp: string; //Date
  }[];
  // timestamps
  createdAt: Date;
  updatedAt: Date;
}

//SHARED
export const walletHistoryTypes = [
  "order payment",
  "order cancellation",
  "refund",
  "referral reward",
  "other",
] as const;
type WalletHistoryType = (typeof walletHistoryTypes)[number];
