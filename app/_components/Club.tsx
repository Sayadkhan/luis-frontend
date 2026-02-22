"use client";

import React, { useState, useRef } from "react";
import {
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import type { Swiper as SwiperType } from "swiper";
import { useGetAllClubQuery } from "@/redux/features/club/clubApi";

interface ClubData {
  _id: string;
  clubTitle: string;
  slug: string;
  shortDescription: string;
  clubDescription: string;
  clubLogo: { url: string; publicId: string }[];
  locationImages: {
    url: string;
    publicId: string;
    images: [{ url: string; publicId: string }];
  }[];
  clubCategory: string;
  totalMembers: number;
}

const CATEGORY_IMAGES: Record<string, string> = {
  Beach:
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
  Golf: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  Luxury:
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
  Sports:
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop",
  Mountain:
    "https://images.unsplash.com/photo-1585544314038-a0d3769d0193?q=80&w=1974&auto=format&fit=crop",
  City: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
  default:
    "https://images.unsplash.com/photo-1535262412227-85541e910204?q=80&w=2069&auto=format&fit=crop",
};

export default function Club() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const { data, isLoading } = useGetAllClubQuery(undefined);
  const clubs: ClubData[] = data?.data?.data ?? data?.data ?? [];
  console.log("Fetched clubs:", clubs);

  const getImage = (club: ClubData) =>
    club.clubLogo?.[0]?.url ||
    CATEGORY_IMAGES[club.clubCategory] ||
    CATEGORY_IMAGES.default;

  const image = (club: ClubData) => club?.locationImages?.[0].images?.[0]?.url;

  console.log("Image for first club:");

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center py-12">
        <div className="text-center max-w-4xl mx-auto px-4 space-y-4 mb-12">
          <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
          <div className="h-12 w-80 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
        </div>
        <div className="flex gap-4 px-8 w-full max-w-5xl">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`rounded-3xl bg-gray-200 dark:bg-gray-700 animate-pulse flex-shrink-0 ${i === 0 ? "h-[500px] w-[600px]" : "h-[500px] w-[100px]"}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!clubs.length) {
    return (
      <div className="w-full min-h-[60vh] bg-white dark:bg-gray-900 flex flex-col items-center justify-center py-12">
        <p className="text-[#C6AC5E] font-medium text-xs tracking-[0.3em] uppercase mb-4">
          The World Awaits
        </p>
        <h1 className="text-4xl md:text-6xl font-serif text-black dark:text-white tracking-tight mb-4">
          Discover{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#fce198] to-[#C6AC5E]">
            Luxury
          </span>{" "}
          Living
        </h1>
        <p className="text-slate-400 text-sm mt-4">
          No clubs available yet. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center py-12 overflow-hidden transition-colors">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto px-4 space-y-4 z-10 mb-8">
        <p className="text-[#e1c264] font-medium text-xs md:text-sm tracking-[0.3em] uppercase">
          The World Awaits
        </p>
        <h1 className="text-4xl md:text-6xl font-serif text-black dark:text-white tracking-tight">
          Discover{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#fce198] to-[#C6AC5E]">
            Luxury
          </span>{" "}
          Living
        </h1>
        <p className="text-slate-400 dark:text-slate-500 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto">
          Explore our curated collection of distinctive vacation club brands.
        </p>
      </div>

      {/* Nav Controls */}
      <div className="w-full max-w-[95%] mx-auto flex justify-end gap-3 mb-4 px-4">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={activeIndex === 0}
          className="p-3 rounded-full bg-[#C6AC5E]/5 border border-[#C6AC5E] hover:bg-white dark:hover:bg-gray-800 text-black dark:text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all z-20"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          disabled={activeIndex === clubs.length - 1}
          className="p-3 rounded-full bg-[#C6AC5E]/5 border border-[#C6AC5E] hover:bg-white dark:hover:bg-gray-800 text-black dark:text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all z-20"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Swiper */}
      <div className="w-full px-4 md:px-8">
        <Swiper
          modules={[Navigation]}
          onBeforeInit={(swiper: SwiperType) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper: SwiperType) =>
            setActiveIndex(swiper.activeIndex)
          }
          centeredSlides
          initialSlide={0}
          slidesPerView="auto"
          spaceBetween={16}
          className="w-full !overflow-visible"
        >
          {clubs.map((club, index) => {
            const isActive = activeIndex === index;
            return (
              <SwiperSlide
                key={club._id}
                className="!w-auto !flex items-center"
              >
                <div
                  onClick={() => swiperRef.current?.slideTo(index)}
                  className={`relative flex-shrink-0 h-[450px] md:h-[550px] rounded-3xl bg-slate-900 shadow-2xl cursor-pointer transition-[width,opacity] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border border-white/10 overflow-hidden 
                  ${isActive ? "w-[85vw] md:w-[700px] ring-1 ring-white/20 opacity-100" : "w-[60px] md:w-[120px] opacity-50 hover:opacity-80"}`}
                >
                  <img
                    src={image(club)}
                    alt={club.clubTitle}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isActive ? "scale-100" : "scale-[2.5]"}`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/20 ${isActive ? "to-black/90" : "to-black/80"}`}
                  />

                  <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end overflow-hidden">
                    {/* Active content */}
                    <div
                      className={`transition-all duration-500 delay-100 flex flex-col justify-end h-full w-full ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 invisible"}`}
                    >
                      <div className="space-y-3 md:space-y-4 w-full">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
                          <h2 className="text-2xl md:text-5xl font-bold text-white font-serif leading-tight drop-shadow-lg">
                            {club.clubTitle}
                          </h2>
                          <div className="self-start md:self-auto bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg">
                            <span className="text-orange-400 font-bold text-xs">
                              {club.clubCategory}
                            </span>
                          </div>
                        </div>

                        <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-md line-clamp-2 md:line-clamp-none">
                          {club.shortDescription ||
                            club.clubDescription
                              ?.replace(/<[^>]+>/g, "")
                              .slice(0, 120)}
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                          <span className="text-orange-100/80 text-xs uppercase tracking-widest flex items-center gap-1">
                            {club.totalMembers > 0 ? (
                              <>
                                <Users size={12} />{" "}
                                {club.totalMembers.toLocaleString()} Members
                              </>
                            ) : (
                              <>
                                <MapPin size={12} /> {club.clubCategory}
                              </>
                            )}
                          </span>
                          <Link
                            href={`/clubs/${club.slug}`}
                            className="ml-auto group flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:bg-[#C6AC5E] transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="text-xs font-bold uppercase">
                              Explore
                            </span>
                            <ArrowRight
                              size={16}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Vertical text for inactive */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isActive ? "opacity-0 invisible" : "opacity-100 visible delay-300"}`}
                    >
                      <h3
                        className="text-white/70 text-lg md:text-xl font-bold tracking-[0.3em] uppercase whitespace-nowrap"
                        style={{
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {club.clubTitle}
                      </h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
