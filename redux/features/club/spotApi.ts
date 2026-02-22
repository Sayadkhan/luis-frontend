import { baseApi } from "@/redux/api/baseApi";

const spotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSpot: builder.query({
      query: () => ({
        method: "GET",
        url: "/spot",
      }),
    }),
    getSingleSpot: builder.query({
      query: (name: string) => ({
        method: "GET",
        url: `/spot/details/${name}`,
      }),
    }),
    getAllLocations: builder.query({
      query: () => ({
        method: "GET",
        url: "/spot/locations",
      }),
    }),
    getSpotByLocation: builder.query({
      query: (location: string) => ({
        method: "GET",
        url: `/spot/${location}`,
      }),
    }),
    createSpot: builder.mutation({
      query: (payload) => ({
        method: "POST", // ✅ Must be POST
        url: "/spot/create-spot",
        body: payload,
      }),
    }),
    deleteSpot: builder.mutation({
      query: (id) => ({
        method: "DELETE", // ✅ Must be POST
        url: `/spot/delete/${id}`,
      }),
    }),
    updateSpot: builder.mutation({
      query: ({ id, payload }) => ({
        method: "PUT", // ✅ Must be POST
        url: `/spot/update/${id}`,
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetAllSpotQuery,
  useCreateSpotMutation,
  useGetAllLocationsQuery,
  useGetSpotByLocationQuery,
  useGetSingleSpotQuery,
  useDeleteSpotMutation,
  useUpdateSpotMutation,
} = spotApi;
