import { baseApi } from "@/redux/api/baseApi";
const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        method: "GET",
        url: "/user/get-me",
      }),
    }),
    requestEmailChange: builder.mutation({
      query: (payload) => ({
        method: "POST",
        url: "/user/request-email-change",
        body: payload,
      }),
    }),
    verifyEmailChange: builder.mutation({
      query: (payload) => ({
        method: "POST",
        url: "/user/verify-email-change",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useRequestEmailChangeMutation,
  useVerifyEmailChangeMutation,
} = userApi;
