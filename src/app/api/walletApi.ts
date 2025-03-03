import { api } from "../api";
import { BaseResponse } from "../types/apiResponseTypes";
import { WalletType } from "../types/wallet";

const walletApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWallet: builder.query<
      BaseResponse<Pick<WalletType, "balance" | "history">> & {
        currentPage: number;
        totalPages: number;
      },
      { page?: number; limit?: number }
    >({
      query: ({ page, limit }) =>
        "v1/wallets?" +
        (page ? `page=${page}` : "") +
        (limit ? `&limit=${limit}` : ""),
      providesTags: ["Wallet"],
    }),
  }),
});

export const { useGetWalletQuery } = walletApi;
