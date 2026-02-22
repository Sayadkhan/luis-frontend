import { baseApi } from "@/redux/api/baseApi";

const clubApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllClub: builder.query({
      query: () => ({ method: "GET", url: "/club" }),
      providesTags: ["Club"],
    }),
    getClubBySlug: builder.query({
      query: (slug: string) => ({ method: "GET", url: `/club/details/${slug}` }),
      providesTags: (_result, _error, slug) => [{ type: "Club", id: slug }],
    }),
    // Legacy - keep for backward compat
    getSingleClub: builder.query({
      query: (slug: string) => ({ method: "GET", url: `/club/details/${slug}` }),
    }),
    createClub: builder.mutation({
      query: (payload) => ({ method: "POST", url: "/club/create-club", body: payload }),
      invalidatesTags: ["Club"],
    }),
    updateClub: builder.mutation({
      query: ({ id, payload }) => ({ method: "PUT", url: `/club/update/${id}`, body: payload }),
      invalidatesTags: ["Club"],
    }),
    deleteClub: builder.mutation({
      query: (id) => ({ method: "DELETE", url: `/club/delete/${id}` }),
      invalidatesTags: ["Club"],
    }),
  }),
});

export const {
  useGetAllClubQuery,
  useGetClubBySlugQuery,
  useGetSingleClubQuery,
  useCreateClubMutation,
  useUpdateClubMutation,
  useDeleteClubMutation,
} = clubApi;
