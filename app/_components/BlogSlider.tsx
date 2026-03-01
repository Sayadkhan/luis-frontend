"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, MapPin, Sun, Calendar, User } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";

const BlogSlider = () => {
  const { data, isLoading } = useGetAllBlogsQuery("published");
  
  // Handle both possible response shapes: data.data (flat) or data.data.data (old double-wrap)
  const responseData = data?.data?.data || data?.data;
  const blogs: any[] = Array.isArray(responseData) ? responseData : [];

  if (isLoading) {
    return (
      <section className="py-20 sm:py-24 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-96 bg-slate-800/50 rounded-3xl animate-pulse" />
        </div>
      </section>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <section className="py-20 sm:py-24 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-amber-500 font-bold uppercase text-sm tracking-wider">
              Go Further
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2">
              More experiences to explore
            </h2>
          </div>

          <Link
            href="/blog"
            className="text-slate-400 hover:text-amber-500 font-medium flex items-center gap-2 transition group"
          >
            View all options <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-blog",
            prevEl: ".swiper-button-prev-blog",
          }}
          pagination={{ clickable: true, el: ".swiper-pagination-blog" }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="blog-swiper !pb-12"
        >
          {blogs.map((blog: any) => (
            <SwiperSlide key={blog._id}>
              <Link href={`/blog/${blog.slug}`} className="block group">
                <div className="relative h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl">
                  {blog.coverImage?.url ? (
                    <img
                      src={blog.coverImage.url}
                      alt={blog.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-800" />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-amber-500/90 backdrop-blur-md text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {blog.category || "Lifestyle"}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 p-8 transform transition-transform duration-500 group-hover:-translate-y-2 w-full">
                    <div className="bg-amber-500 w-12 h-12 rounded-full flex items-center justify-center mb-5 text-black shadow-lg shadow-amber-500/20 group-hover:bg-white group-hover:text-amber-500 transition-colors">
                      {blog.category?.toLowerCase().includes("cruise") ? <Compass size={24} /> : 
                       blog.category?.toLowerCase().includes("outdoor") ? <Sun size={24} /> : 
                       blog.category?.toLowerCase().includes("tour") ? <MapPin size={24} /> : 
                       <Compass size={24} />}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-amber-500 transition-colors">
                      {blog.title}
                    </h3>
                    
                    <p className="text-slate-300 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                      {blog.shortDescription}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5">
                        <User size={12} className="text-amber-500" /> {blog.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-amber-500" />
                        {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation & Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="swiper-pagination-blog !static !w-auto flex gap-2"></div>
          <div className="flex gap-3">
            <button className="swiper-button-prev-blog w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer">
              <ArrowRight size={20} className="rotate-180" />
            </button>
            <button className="swiper-button-next-blog w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-blog .swiper-pagination-bullet {
          background: #475569;
          opacity: 1;
          width: 8px;
          height: 8px;
          transition: all 0.3s;
        }
        .swiper-pagination-blog .swiper-pagination-bullet-active {
          background: #f59e0b;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default BlogSlider;
