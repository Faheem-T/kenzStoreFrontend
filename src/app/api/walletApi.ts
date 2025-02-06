import { api } from "../api";
import { BaseResponse } from "../types/apiResponseTypes";
import { WalletType } from "../types/wallet";

const walletApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWallet: builder.query<BaseResponse<Pick<WalletType, "balance">>, void>({
      query: () => "v1/wallets",
      providesTags: ["Wallet"],
    }),
  }),
});

export const { useGetWalletQuery } = walletApi;
