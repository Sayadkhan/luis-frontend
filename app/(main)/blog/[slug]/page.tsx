import { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, ArrowLeft, ChevronRight, Clock, Tag, Share2 } from "lucide-react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  coverImage?: { url: string; publicId: string };
  author: string;
  category: string;
  tags: string[];
  publishedAt?: string;
  createdAt?: string;
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${backendUrl}/api/v1/blog/details/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

async function getRelatedBlogs(category: string, excludeSlug: string): Promise<Blog[]> {
  try {
    const res = await fetch(`${backendUrl}/api/v1/blog?status=published`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const all: Blog[] = json.data || [];
    return all.filter((b) => b.slug !== excludeSlug && b.category === category).slice(0, 3);
  } catch {
    return [];
  }
}

function estimateReadTime(content: string) {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Blog Post Not Found" };
  const description = blog.shortDescription || blog.content.replace(/<[^>]+>/g, "").slice(0, 160);
  return {
    title: `${blog.title} | Club Journal`,
    description,
    openGraph: {
      title: blog.title,
      description,
      images: blog.coverImage ? [{ url: blog.coverImage.url }] : [],
      type: "article",
    },
    twitter: { card: "summary_large_image", title: blog.title, description, images: blog.coverImage ? [blog.coverImage.url] : [] },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F5EF]">
        <p className="text-[#C6AC5E] text-xs uppercase tracking-widest mb-4 font-bold">404 — Not Found</p>
        <h1 className="text-5xl font-serif text-gray-900 mb-4">Post Not Found</h1>
        <p className="text-gray-500 mb-10">The blog post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link href="/blog" className="px-8 py-3 bg-[#C6AC5E] text-black font-bold text-sm uppercase tracking-widest rounded-full hover:bg-black hover:text-white transition-all duration-300">
          Back to Journal
        </Link>
      </div>
    );
  }

  const related = await getRelatedBlogs(blog.category, blog.slug);
  const readTime = estimateReadTime(blog.content);

  return (
    <main className="min-h-screen bg-[#F8F5EF] dark:bg-[#0A0A0A]">

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <div className="relative h-[70vh] min-h-[480px] overflow-hidden bg-slate-900">
        {blog.coverImage?.url ? (
          <img
            src={blog.coverImage.url}
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-[#1a1508]" />
        )}
        {/* Multi-layer gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-8 left-0 right-0 max-w-5xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-white/50 uppercase tracking-wider">
            <Link href="/" className="hover:text-[#C6AC5E] transition-colors">Home</Link>
            <ChevronRight size={11} />
            <Link href="/blog" className="hover:text-[#C6AC5E] transition-colors">Journal</Link>
            <ChevronRight size={11} />
            <span className="text-white/30 truncate max-w-xs">{blog.title}</span>
          </nav>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-12">
          <span className="inline-block bg-[#C6AC5E] text-black text-[10px] font-black uppercase tracking-[3px] px-4 py-1.5 rounded-full mb-6">
            {blog.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6 max-w-3xl">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-2"><User size={14} className="text-[#C6AC5E]" /> {blog.author}</span>
            {(blog.publishedAt || blog.createdAt) && (
              <span className="flex items-center gap-2">
                <Calendar size={14} className="text-[#C6AC5E]" />
                {new Date(blog.publishedAt || blog.createdAt!).toLocaleDateString("en-US", {
                  weekday: "long", year: "numeric", month: "long", day: "numeric",
                })}
              </span>
            )}
            <span className="flex items-center gap-2"><Clock size={14} className="text-[#C6AC5E]" /> {readTime} min read</span>
          </div>
        </div>
      </div>

      {/* ─── CONTENT LAYOUT ────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6">

        {/* Pull-quote / short description */}
        {blog.shortDescription && (
          <div className="relative -mt-6 mb-0 z-10">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-serif italic">
                &ldquo;{blog.shortDescription}&rdquo;
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 py-14">
          {/* Main content */}
          <div>
            <article
              className="prose prose-lg dark:prose-invert max-w-none
                prose-h1:text-4xl prose-h2:text-3xl prose-h2:font-serif prose-h2:text-gray-900 dark:prose-h2:text-white prose-h2:mt-10
                prose-h3:text-2xl prose-h3:font-serif
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-8
                prose-a:text-[#C6AC5E] prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-[#C6AC5E] prose-blockquote:bg-amber-50 dark:prose-blockquote:bg-amber-900/10 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
                prose-img:rounded-2xl prose-img:shadow-lg
                prose-strong:text-gray-900 dark:prose-strong:text-white
                prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:rounded prose-code:px-1.5 prose-code:text-[#C6AC5E]
                prose-pre:bg-gray-900 prose-pre:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <Tag size={14} className="text-gray-400" />
                {blog.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-full hover:border-[#C6AC5E] hover:text-[#C6AC5E] transition-colors cursor-default">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author card */}
            <div className="mt-12 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C6AC5E] to-amber-700 flex items-center justify-center text-white text-xl font-serif flex-shrink-0">
                {blog.author[0]}
              </div>
              <div>
                <p className="text-xs text-[#C6AC5E] font-bold uppercase tracking-widest mb-1">Written by</p>
                <p className="text-lg font-serif text-gray-900 dark:text-white">{blog.author}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Endless Vacations Hub — Club Journal</p>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-10">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-[#C6AC5E] transition-colors group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Journal
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {/* Share */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2"><Share2 size={12} /> Share</p>
                <div className="space-y-2">
                  {[
                    { label: "Copy Link", action: "copy" },
                    { label: "Share on X", action: "twitter" },
                    { label: "Share on LinkedIn", action: "linkedin" },
                  ].map((item) => (
                    <a key={item.label} href="#" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-[#C6AC5E] transition-colors py-1">
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Meta */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Article Info</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">Category</p>
                    <p className="text-gray-900 dark:text-white font-medium">{blog.category}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">Read Time</p>
                    <p className="text-gray-900 dark:text-white font-medium">{readTime} min</p>
                  </div>
                  {blog.tags?.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1.5">Tags</p>
                      <div className="flex flex-wrap gap-1">
                        {blog.tags.slice(0, 5).map((t) => (
                          <span key={t} className="text-[10px] bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-full">#{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ─── RELATED POSTS ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-white dark:bg-gray-900 py-20 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[#C6AC5E] text-xs font-bold uppercase tracking-[4px] mb-2">Continue Reading</p>
                <h3 className="text-3xl font-serif text-gray-900 dark:text-white">Related Stories</h3>
              </div>
              <Link href="/blog" className="text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-[#C6AC5E] transition-colors hidden sm:block">
                All Posts →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r._id} href={`/blog/${r.slug}`} className="group bg-[#F8F5EF] dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#C6AC5E]/30">
                  {r.coverImage?.url && (
                    <div className="overflow-hidden h-40">
                      <img src={r.coverImage.url} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C6AC5E]">{r.category}</span>
                    <h4 className="text-base font-serif text-gray-900 dark:text-white mt-1.5 mb-2 line-clamp-2 group-hover:text-[#C6AC5E] transition-colors">
                      {r.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2">{r.shortDescription}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA BANNER ────────────────────────────────────────── */}
      <section className="bg-[#1a1a2e] py-20 px-6 text-center">
        <p className="text-[#C6AC5E] text-xs font-bold uppercase tracking-[4px] mb-4">Endless Vacations Hub</p>
        <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">Ready to Own Your Dream Vacation?</h3>
        <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">Discover exclusive membership benefits and explore our vacation club destinations.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/#contact" className="px-8 py-3 bg-[#C6AC5E] text-black font-bold text-sm uppercase tracking-widest rounded-full hover:bg-white transition-colors duration-300">
            Get In Touch
          </Link>
          <Link href="/blog" className="px-8 py-3 border border-white/20 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:border-[#C6AC5E] hover:text-[#C6AC5E] transition-colors duration-300">
            More Stories
          </Link>
        </div>
      </section>
    </main>
  );
}
