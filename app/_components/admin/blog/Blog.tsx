"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {
  MdAdd,
  MdClose,
  MdCloudUpload,
  MdDelete,
  MdEdit,
  MdPublish,
  MdVisibility,
  MdSettings,
  MdDrafts,
  MdChevronLeft,
} from "react-icons/md";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "@/redux/features/blog/blogApi";
import dynamic from "next/dynamic";
import Link from "next/link";

const RichTextEditor = dynamic(() => import("@/components/BlogEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-gray-50 dark:bg-gray-800 animate-pulse rounded-2xl flex items-center justify-center">
      <p className="text-gray-400">Loading editor...</p>
    </div>
  ),
});

interface BlogForm {
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  author: string;
  category: string;
  tags: string;
  status: "draft" | "published";
  coverImage?: { url: string; publicId: string };
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all";
const labelCls =
  "text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block uppercase tracking-wider";

export default function BlogDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const coverInputRef = React.useRef<HTMLInputElement>(null);
  const { uploadToCloudinary } = useCloudinaryUpload();

  const { data, refetch, isLoading } = useGetAllBlogsQuery(undefined);
  const [createBlog, { isLoading: creating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: updating }] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  // Handle both possible response shapes: data.data (flat) or data.data.data (old double-wrap)
  const responseData = data?.data?.data || data?.data;
  const blogs: any[] = Array.isArray(responseData) ? responseData : [];

  const { register, control, handleSubmit, setValue, watch, reset } =
    useForm<BlogForm>({
      defaultValues: {
        title: "",
        slug: "",
        shortDescription: "",
        content: "",
        author: "Admin",
        category: "General",
        tags: "",
        status: "draft",
        coverImage: undefined,
      },
    });

  const coverImage = watch("coverImage");
  const title = watch("title");
  const slug = watch("slug");

  // Auto-generate slug from title if slug is empty
  useEffect(() => {
    if (title && !editId && !slug) {
      setValue("slug", generateSlug(title));
    }
  }, [title, editId, setValue, slug]);

  const uploadCover = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const tid = toast.loading("Uploading cover image...");
    try {
      const uploaded = await uploadToCloudinary(files[0]);
      setValue("coverImage", uploaded);
      toast.success("Cover image uploaded!", { id: tid });
    } catch {
      toast.error("Upload failed", { id: tid });
    }
  };

  const onSubmit = async (formData: BlogForm) => {
    const payload = {
      ...formData,
      tags: (formData.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (editId) {
        await updateBlog({ id: editId, payload }).unwrap();
        toast.success("Blog updated successfully!");
      } else {
        await createBlog(payload).unwrap();
        toast.success("Blog published successfully!");
      }
      handleCloseForm();
      refetch();
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Something went wrong. Please check your inputs.",
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this blog post? This action cannot be undone.",
      )
    )
      return;
    try {
      await deleteBlog(id).unwrap();
      toast.success("Post deleted permanently.");
      refetch();
    } catch {
      toast.error("Failed to delete post.");
    }
  };

  const handleEdit = (blog: any) => {
    setEditId(blog._id);
    reset({
      title: blog.title || "",
      slug: blog.slug || "",
      shortDescription: blog.shortDescription || "",
      content: blog.content || "",
      author: blog.author || "Admin",
      category: blog.category || "General",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
      status: blog.status || "draft",
      coverImage: blog.coverImage,
    });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditId(null);
    reset();
  };

  if (showForm) {
    return (
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
        <Toaster position="top-right" />

        {/* WORDPRESS STYLE TOPBAR */}
        <div className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCloseForm}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <MdChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {editId ? "Edit Post" : "Add New Post"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setValue("status", "draft")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                watch("status") === "draft"
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Save Draft
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={creating || updating}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/20 transition-all"
            >
              {creating || updating ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <MdPublish size={18} />
              )}
              {editId ? "Update" : "Publish"}
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA (SIDEBAR LAYOUT) */}
        <div className="flex-1 flex overflow-hidden">
          {/* EDITOR (LEFT) */}
          <div className="flex-1 overflow-y-auto p-8 lg:p-12">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Title input (WP style) */}
              <input
                {...register("title", { required: true })}
                placeholder="Add Title"
                className="w-full bg-transparent text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white border-none focus:ring-0 placeholder:text-gray-300 dark:placeholder:text-gray-700"
              />

              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                <Controller
                  name="content"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder="Start writing your masterpiece..."
                      minHeight="500px"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* SETTINGS SIDEBAR (RIGHT) */}
          <aside className="w-80 lg:w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 overflow-y-auto hidden md:block">
            <div className="p-6 space-y-8">
              {/* Post Settings Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold pb-2 border-b border-gray-100 dark:border-gray-800">
                  <MdSettings size={20} className="text-blue-500" />
                  <span>Post Settings</span>
                </div>

                <div>
                  <label className={labelCls}>Status</label>
                  <select {...register("status")} className={inputCls}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label className={labelCls}>Permalink / Slug</label>
                  <div className="relative">
                    <input
                      {...register("slug", { required: true })}
                      className={inputCls}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setValue("slug", generateSlug(watch("title")))
                      }
                      className="absolute right-2 top-1.5 p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded text-xs font-medium"
                    >
                      Reset
                    </button>
                  </div>
                  <p className="mt-1 text-[10px] text-gray-400">
                    /blog/{watch("slug")}
                  </p>
                </div>

                <div>
                  <label className={labelCls}>Author</label>
                  <input
                    {...register("author")}
                    className={inputCls}
                    placeholder="Admin"
                  />
                </div>
              </section>

              {/* Categorization Section */}
              <section className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <label className={labelCls}>Category</label>
                  <select {...register("category")} className={inputCls}>
                    <option>General</option>
                    <option>Travel</option>
                    <option>Lifestyle</option>
                    <option>Membership</option>
                    <option>Destinations</option>
                    <option>Tips</option>
                  </select>
                </div>

                <div>
                  <label className={labelCls}>Tags</label>
                  <input
                    {...register("tags")}
                    className={inputCls}
                    placeholder="vacation, luxury, travel"
                  />
                  <p className="mt-1 text-[10px] text-gray-400">
                    Separate with commas
                  </p>
                </div>
              </section>

              {/* Featured Image Section */}
              <section className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <label className={labelCls}>Featured Image</label>
                {coverImage?.url ? (
                  <div className="group relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <img
                      src={coverImage.url}
                      alt="Cover"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <button
                        type="button"
                        onClick={() => setValue("coverImage", undefined)}
                        className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => coverInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all"
                  >
                    <MdCloudUpload
                      size={40}
                      className="mx-auto text-gray-300 dark:text-gray-600 mb-2"
                    />
                    <p className="text-sm font-medium text-gray-400">
                      Set featured image
                    </p>
                  </div>
                )}
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => uploadCover(e.target.files)}
                />
              </section>

              {/* Excerpt Section */}
              <section className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <label className={labelCls}>
                    Excerpt / Short Description
                  </label>
                  <textarea
                    {...register("shortDescription")}
                    rows={4}
                    maxLength={200}
                    className={`${inputCls} resize-none`}
                    placeholder="Briefly describe this post for search results and social sharing..."
                  />
                  <div className="flex justify-end mt-1">
                    <span className="text-[10px] text-gray-400">
                      {(watch("shortDescription") || "").length}/200
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <Toaster position="top-right" />

      {/* LIST HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Blog Posts
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Create, edit and manage your content strategy
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            reset();
          }}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5"
        >
          <MdAdd size={24} /> Write New Post
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Posts"
          value={String(blogs.length)}
          icon={<MdVisibility className="text-blue-500" />}
        />
        <StatCard
          title="Published"
          value={String(blogs.filter((b) => b.status === "published").length)}
          color="green"
          icon={<MdPublish className="text-green-500" />}
        />
        <StatCard
          title="Drafts"
          value={String(blogs.filter((b) => b.status === "draft").length)}
          color="yellow"
          icon={<MdDrafts className="text-yellow-600" />}
        />
      </div>

      {/* CONTENT LIST */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none overflow-hidden">
        {isLoading ? (
          <div className="p-20 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-500 font-medium">Loading your content...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              📝
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No posts found
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-8">
              Ready to share some knowledge? Start by creating your first blog
              post today.
            </p>
            <button
              onClick={() => {
                setShowForm(true);
                setEditId(null);
                reset();
              }}
              className="px-8 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
            >
              Create First Post
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="group p-6 flex flex-col md:flex-row md:items-center gap-6 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-all"
              >
                {/* Image */}
                <div className="w-full md:w-40 h-28 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 border border-gray-100 dark:border-gray-700">
                  {blog.coverImage?.url ? (
                    <img
                      src={blog.coverImage.url}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600 font-bold text-xs uppercase">
                      No Image
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center flex-wrap gap-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate pr-4">
                      {blog.title}
                    </h3>
                    <span
                      className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest ${
                        blog.status === "published"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                          : "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
                    {blog.shortDescription || "No description provided."}
                  </p>
                  <div className="flex items-center flex-wrap gap-4 text-xs font-bold text-gray-400 uppercase tracking-tighter">
                    <span className="text-blue-500">{blog.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <span>By {blog.author}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <span suppressHydrationWarning>
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all"
                    title="View Post"
                  >
                    <MdVisibility size={22} />
                  </Link>
                  <button
                    onClick={() => handleEdit(blog)}
                    className="p-3 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-xl transition-all"
                    title="Edit Post"
                  >
                    <MdEdit size={22} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all"
                    title="Delete Post"
                  >
                    <MdDelete size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const StatCard = ({
  title,
  value,
  color = "blue",
  icon,
}: {
  title: string;
  value: string;
  color?: string;
  icon?: React.ReactNode;
}) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 dark:bg-blue-950/20",
    green: "bg-green-50 dark:bg-green-950/20",
    yellow: "bg-orange-50 dark:bg-orange-950/20",
  };
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 flex flex-col justify-between border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">
          {title}
        </p>
        <div className={`p-2 rounded-xl ${colors[color]}`}>{icon}</div>
      </div>
      <h2 className="text-4xl font-black text-gray-900 dark:text-white">
        {value}
      </h2>
    </div>
  );
};
