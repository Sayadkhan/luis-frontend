"use client";

import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";

export default function BlogHighlights() {
  const { data, isLoading } = useGetAllBlogsQuery("published");
  const blogs: any[] = data?.data || [];
  const featured = blogs.slice(0, 4);

  if (isLoading) {
    return (
      <section className="py-20 bg-[#F8F5EF] dark:bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!featured.length) return null;

  const [hero, ...rest] = featured;

  return (
    <section className="py-20 bg-[#F8F5EF] dark:bg-[#0F0F0F] transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-[#C6AC5E] text-xs font-bold uppercase tracking-[4px] mb-3">The Club Journal</p>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white leading-tight">
              More Experiences<br />
              <span className="italic text-[#C6AC5E]">to Explore</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white hover:text-[#C6AC5E] dark:hover:text-[#C6AC5E] transition-colors group"
          >
            View All Stories
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Layout: hero left + 3 cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hero card — spans 2 cols */}
          <Link href={`/blog/${hero.slug}`} className="lg:col-span-2 group relative overflow-hidden rounded-3xl bg-black block min-h-[420px]">
            {hero.coverImage?.url ? (
              <img
                src={hero.coverImage.url}
                alt={hero.title}
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="inline-block bg-[#C6AC5E] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-black mb-4">
                {hero.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-3 leading-snug group-hover:text-[#C6AC5E] transition-colors">
                {hero.title}
              </h3>
              {hero.shortDescription && (
                <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-4 max-w-lg">
                  {hero.shortDescription}
                </p>
              )}
              <div className="flex items-center gap-4 text-white/50 text-xs">
                <span className="flex items-center gap-1.5"><User size={11} /> {hero.author}</span>
                {hero.publishedAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={11} />
                    {new Date(hero.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                )}
              </div>
            </div>
            {/* Arrow overlay */}
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <ArrowRight size={16} className="text-white" />
            </div>
          </Link>

          {/* Right column — 3 stacked cards */}
          <div className="flex flex-col gap-6">
            {rest.map((blog: any) => (
              <Link
                key={blog._id}
                href={`/blog/${blog.slug}`}
                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-[#C6AC5E]/30 dark:hover:border-[#C6AC5E]/30 transition-all duration-300 flex gap-0"
              >
                {blog.coverImage?.url && (
                  <div className="w-28 flex-shrink-0 overflow-hidden">
                    <img
                      src={blog.coverImage.url}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C6AC5E]">{blog.category}</span>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mt-1 line-clamp-2 group-hover:text-[#C6AC5E] transition-colors leading-snug">
                      {blog.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-2">
                    <span>{blog.author}</span>
                    {blog.publishedAt && (
                      <>
                        <span>·</span>
                        <span>{new Date(blog.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
