import { baseApi } from "@/redux/api/baseApi";
const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        method: "GET",
        url: "/user/get-me",
      }),
    }),
  }),
});

export const { useGetMeQuery } = userApi;
