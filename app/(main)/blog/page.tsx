import { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Endless Vacations Hub",
  description: "Read the latest news, travel tips, and stories from our vacation club community.",
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

async function getBlogs() {
  try {
    const res = await fetch(`${backendUrl}/api/v1/blog?status=published`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    
    // Handle both flat and double-wrapped data
    const data = json.data?.data || json.data;
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function BlogListPage() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C6AC5E] text-xs uppercase tracking-widest mb-4 font-bold">Our Stories</p>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">The Club Journal</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
            Travel inspiration, member stories, destination guides, and exclusive lifestyle content.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {blogs.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-stone-400 text-lg">No blog posts published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any) => (
              <article key={blog._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-stone-100 flex flex-col h-full">
                <Link href={`/blog/${blog.slug}`} className="block overflow-hidden h-48">
                  {blog.coverImage?.url ? (
                    <img
                      src={blog.coverImage.url}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-300">
                      No Image
                    </div>
                  )}
                </Link>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[#C6AC5E]/10 text-[#C6AC5E] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                  </div>

                  <Link href={`/blog/${blog.slug}`} className="group/title">
                    <h2 className="text-xl font-serif text-stone-900 mb-3 group-hover/title:text-[#C6AC5E] transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                  </Link>

                  {blog.shortDescription && (
                    <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-3">
                      {blog.shortDescription}
                    </p>
                  )}

                  <div className="mt-auto">
                    <div className="flex items-center gap-4 text-xs text-stone-400 mb-4">
                      <span className="flex items-center gap-1"><User size={12} /> {blog.author}</span>
                      {blog.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {new Date(blog.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      )}
                    </div>

                    {blog.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {blog.tags.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">#{tag}</span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-900 hover:text-[#C6AC5E] transition-colors group/link"
                    >
                      Read More <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
