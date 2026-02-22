import { baseApi } from "@/redux/api/baseApi";

const blogApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (status?: string) => ({
        method: "GET",
        url: status ? `/blog?status=${status}` : "/blog",
      }),
      providesTags: ["Blog"],
    }),
    getBlogBySlug: builder.query({
      query: (slug: string) => ({ method: "GET", url: `/blog/details/${slug}` }),
      providesTags: (_result, _error, slug) => [{ type: "Blog", id: slug }],
    }),
    createBlog: builder.mutation({
      query: (payload) => ({ method: "POST", url: "/blog/create", body: payload }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, payload }) => ({ method: "PUT", url: `/blog/update/${id}`, body: payload }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlog: builder.mutation({
      query: (id: string) => ({ method: "DELETE", url: `/blog/delete/${id}` }),
      invalidatesTags: ["Blog"],
    }),
    // Inquiry endpoints
      createInquiry: builder.mutation({
        query: (payload: Record<string, any>) => ({
          method: "POST",
          url: "/inquiry",
          body: payload,
        }),
        invalidatesTags: ["Inquiry"],
      }),
    getAllInquiries: builder.query({
      query: () => ({ method: "GET", url: "/inquiry" }),
      providesTags: ["Inquiry"],
    }),
    markInquiryRead: builder.mutation({
      query: (id: string) => ({ method: "PATCH", url: `/inquiry/${id}/read` }),
      invalidatesTags: ["Inquiry"],
    }),
    deleteInquiry: builder.mutation({
      query: (id: string) => ({ method: "DELETE", url: `/inquiry/${id}` }),
      invalidatesTags: ["Inquiry"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogBySlugQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useCreateInquiryMutation,
  useGetAllInquiriesQuery,
  useMarkInquiryReadMutation,
  useDeleteInquiryMutation,
} = blogApi;

