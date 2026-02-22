import { baseApi } from "@/redux/api/baseApi";

const uiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUIData: builder.query({
      query: () => ({
        method: "GET",
        url: "/ui",
      }),
    }),

    updateUIData: builder.mutation({
      query: (payload) => ({
        method: "PUT",
        url: "/ui/update-ui-data",
        body: payload, // <-- backend accepts raw payload
      }),
    }),

    createUIData: builder.mutation({
      query: (payload) => ({
        method: "POST",
        url: "/ui/create-ui-data",
        body: payload, // <-- raw payload works
      }),
    }),
  }),
});

export const {
  useGetUIDataQuery,
  useUpdateUIDataMutation,
  useCreateUIDataMutation,
} = uiApi;
