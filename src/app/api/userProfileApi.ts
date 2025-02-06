import { api } from "../api";
import { updateUserProfileResponse } from "../types/apiResponseTypes";
import { SafeUserType } from "../types/user";

const userProfileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation<
      updateUserProfileResponse,
      { body: Partial<SafeUserType>; userId: string }
    >({
      query: ({ body, userId }) => ({
        url: `v1/users/${userId}/profile/`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useUpdateUserProfileMutation } = userProfileApi;
