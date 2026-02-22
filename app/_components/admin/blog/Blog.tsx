"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { MdAdd, MdClose, MdCloudUpload, MdDelete, MdEdit, MdPublish, MdVisibility } from "react-icons/md";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { useGetAllBlogsQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } from "@/redux/features/blog/blogApi";
import RichTextEditor from "@/components/RichTextEditor";
import Link from "next/link";

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
  return title.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

const inputCls = "w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm";

export default function BlogDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const coverInputRef = React.useRef<HTMLInputElement>(null);
  const { uploadToCloudinary } = useCloudinaryUpload();

  const { data, refetch } = useGetAllBlogsQuery(undefined);
  const [createBlog, { isLoading: creating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: updating }] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const blogs: any[] = data?.data?.data || data?.data || [];

  const { register, control, handleSubmit, setValue, watch, reset } = useForm<BlogForm>({
    defaultValues: {
      title: "", slug: "", shortDescription: "", content: "", author: "Admin",
      category: "General", tags: "", status: "draft", coverImage: undefined,
    },
  });

  const coverImage = watch("coverImage");
  const title = watch("title");

  const handleTitleBlur = () => {
    if (!watch("slug") && title) setValue("slug", generateSlug(title));
  };

  const uploadCover = async (files: FileList | null) => {
    if (!files) return;
    const tid = toast.loading("Uploading...");
    try {
      const uploaded = await uploadToCloudinary(files[0]);
      setValue("coverImage", uploaded);
      toast.success("Uploaded!", { id: tid });
    } catch { toast.error("Failed", { id: tid }); }
  };

  const onSubmit = async (data: BlogForm) => {
    const payload = { ...data, tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean) };
    try {
      if (editId) {
        await updateBlog({ id: editId, payload }).unwrap();
        toast.success("Blog updated!");
      } else {
        await createBlog(payload).unwrap();
        toast.success("Blog created!");
      }
      reset();
      setShowForm(false);
      setEditId(null);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await deleteBlog(id).unwrap();
      toast.success("Deleted!");
      refetch();
    } catch { toast.error("Delete failed"); }
  };

  const handleEdit = (blog: any) => {
    setEditId(blog._id);
    reset({
      title: blog.title, slug: blog.slug, shortDescription: blog.shortDescription,
      content: blog.content, author: blog.author, category: blog.category,
      tags: (blog.tags || []).join(", "), status: blog.status, coverImage: blog.coverImage,
    });
    setShowForm(true);
  };

  return (
    <div className="p-6 space-y-6">
      <Toaster position="top-right" />

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Blog Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Create and manage blog posts with rich content</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditId(null); reset(); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
          <MdAdd /> New Post
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Total Posts" value={String(blogs.length)} />
        <StatCard title="Published" value={String(blogs.filter((b) => b.status === "published").length)} color="green" />
        <StatCard title="Drafts" value={String(blogs.filter((b) => b.status === "draft").length)} color="yellow" />
      </div>

      {/* BLOG LIST */}
      {!showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {blogs.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <MdAdd className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No blog posts yet. Create your first post!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {blogs.map((blog) => (
                <div key={blog._id} className="p-4 flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  {blog.coverImage?.url && (
                    <img src={blog.coverImage.url} alt={blog.title} className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">{blog.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${blog.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {blog.status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm truncate">{blog.shortDescription}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span>{blog.category}</span>
                      <span>·</span>
                      <span>{blog.author}</span>
                      <span>·</span>
                      <span>/blog/{blog.slug}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Link href={`/blog/${blog.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                      <MdVisibility size={18} />
                    </Link>
                    <button onClick={() => handleEdit(blog)} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors">
                      <MdEdit size={18} />
                    </button>
                    <button onClick={() => handleDelete(blog._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                      <MdDelete size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BLOG FORM */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {editId ? "Edit Blog Post" : "Create Blog Post"}
            </h2>
            <button onClick={() => { setShowForm(false); setEditId(null); }} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <MdClose size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Title *</label>
                <input {...register("title", { required: true })} onBlur={handleTitleBlur} className={inputCls} placeholder="Blog post title" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Slug * <span className="text-gray-400">(auto-generated)</span></label>
                <input {...register("slug", { required: true })} className={inputCls} placeholder="my-blog-post" />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Short Description <span className="text-gray-400">(shown in blog cards)</span></label>
              <textarea {...register("shortDescription")} rows={2} maxLength={200} className={inputCls} placeholder="Brief description..." />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Content * <span className="text-gray-400">(rich text with image upload)</span></label>
              <Controller
                name="content"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RichTextEditor value={field.value} onChange={field.onChange} placeholder="Write your blog content here..." minHeight="350px" />
                )}
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Cover Image</label>
              {coverImage?.url ? (
                <div className="relative inline-block">
                  <img src={coverImage.url} alt="Cover" className="h-32 w-auto rounded-xl border object-cover" />
                  <button type="button" onClick={() => setValue("coverImage", undefined)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center">
                    <MdClose size={12} />
                  </button>
                </div>
              ) : (
                <div onClick={() => coverInputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition-all">
                  <MdCloudUpload size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload cover image</p>
                </div>
              )}
              <input ref={coverInputRef} type="file" accept="image/*" hidden onChange={(e) => uploadCover(e.target.files)} />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Author</label>
                <input {...register("author")} className={inputCls} placeholder="Author name" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Category</label>
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
                <label className="text-xs text-gray-500 mb-1 block">Status</label>
                <select {...register("status")} className={inputCls}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Tags <span className="text-gray-400">(comma separated)</span></label>
              <input {...register("tags")} className={inputCls} placeholder="vacation, luxury, travel" />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="px-4 py-2 text-gray-600 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button type="submit" disabled={creating || updating} className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-lg font-medium">
                {creating || updating ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <MdPublish size={18} />}
                {editId ? "Update" : "Publish"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

const StatCard = ({ title, value, color = "blue" }: { title: string; value: string; color?: string }) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-100 dark:bg-blue-900/30",
    green: "bg-green-100 dark:bg-green-900/30",
    yellow: "bg-yellow-100 dark:bg-yellow-900/30",
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow dark:shadow-gray-900/50 p-6 flex justify-between items-center border border-gray-100 dark:border-gray-700">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h2>
      </div>
      <div className={`h-12 w-12 rounded-full ${colors[color]}`} />
    </div>
  );
};
