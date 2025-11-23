"use client";

import React, { useState, useRef } from "react";
import {
  MapPin,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import type { Swiper as SwiperType } from "swiper";


interface Club {
  id: number;
  title: string;
  location: string;
  description: string;
  image: string;
  rating: number;
}


const CLUBS: Club[] = [
  {
    id: 1,
    title: "Sheraton Vacation Club",
    location: "South Carolina",
    description:
      "Experience the charm of the lowcountry with classic southern hospitality.",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Westin Vacation Club",
    location: "Cancún, Mexico",
    description:
      "Rejuvenate your spirit on the white sandy beaches of the Caribbean.",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Marriott Vacation Club",
    location: "Palm Desert",
    description:
      "A desert oasis designed for family fun and relaxation under the sun.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    rating: 4.7,
  },
  {
    id: 4,
    title: "St. Regis Residence Club",
    location: "Aspen, Colorado",
    description:
      "Exquisite luxury nestled in the heart of the majestic Rocky Mountains.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
    rating: 5.0,
  },
  {
    id: 5,
    title: "Ritz-Carlton Club",
    location: "Lake Tahoe",
    description:
      "Legendary service meets the rugged beauty of the Sierra Nevada mountains.",
    image:
      "https://images.unsplash.com/photo-1585544314038-a0d3769d0193?q=80&w=1974&auto=format&fit=crop",
    rating: 4.9,
  },
  {
    id: 6,
    title: "Hyatt Residence Club",
    location: "Maui, Hawaii",
    description:
      "Immerse yourself in the aloha spirit with breathtaking ocean views.",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: 7,
    title: "Four Seasons Residence",
    location: "Seychelles",
    description:
      "Unrivaled privacy in a tropical paradise of turquoise waters.",
    image:
      "https://images.unsplash.com/photo-1535262412227-85541e910204?q=80&w=2069&auto=format&fit=crop",
    rating: 5.0,
  },
  {
    id: 8,
    title: "Wyndham Destinations",
    location: "Orlando, Florida",
    description:
      "The ultimate family playground in the heart of the theme park capital.",
    image:
      "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?q=80&w=2069&auto=format&fit=crop",
    rating: 4.6,
  },
];



export default function Club() {
  const [activeIndex, setActiveIndex] = useState<number>(4);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center py-12 overflow-hidden">
      {/* --- header --- */}
      <div className="text-center max-w-4xl mx-auto px-4 space-y-4 z-10 mb-8">
        <p className="text-[#e1c264] font-medium text-xs md:text-sm tracking-[0.3em] uppercase animate-fade-in">
          The World Awaits
        </p>
        <h1 className="text-4xl md:text-6xl font-serif text-black tracking-tight">
          Discover{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#fce198] to-[#C6AC5E]">
            Luxury
          </span>{" "}
          Living
        </h1>
        <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto">
          Explore our curated collection of distinctive vacation club brands.
        </p>
      </div>

      {/* --- button controls --- */}
      <div className="w-full max-w-[95%] mx-auto flex justify-end gap-3 mb-4 px-4">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={activeIndex === 0}
          className="p-3 rounded-full bg-[#C6AC5E]/5 border border-[#C6AC5E] hover:bg-white text-black cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all z-20"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          disabled={activeIndex === CLUBS.length - 1}
          className="p-3 rounded-full bg-[#C6AC5E]/5 border border-[#C6AC5E] hover:bg-white text-black cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all z-20"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* --- Swiper --- */}
      <div className="w-full px-4 md:px-8">
        <Swiper
          modules={[Navigation]}
          onBeforeInit={(swiper: any) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper: any) => setActiveIndex(swiper.activeIndex)}
          centeredSlides
          initialSlide={4}
          slidesPerView="auto"
          spaceBetween={16}
          className="w-full !overflow-visible"
        >
          {CLUBS.map((slide, index) => {
            const isActive = activeIndex === index;

            return (
              <SwiperSlide
                key={slide.id}
                className="!w-auto !flex items-center"
              >
                <div
                  onClick={() => swiperRef.current?.slideTo(index)}
                  className={`relative flex-shrink-0 h-[450px] md:h-[550px] rounded-3xl bg-slate-900 shadow-2xl cursor-pointer transition-[width,opacity] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border border-white/10 overflow-hidden 
                  ${
                    isActive
                      ? "w-[85vw] md:w-[700px] ring-1 ring-white/20 opacity-100"
                      : "w-[60px] md:w-[120px] opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${
                      isActive ? "scale-100" : "scale-[2.5]"
                    }`}
                  />

                  <div
                    className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/20 ${
                      isActive ? "to-black/90" : "to-black/80"
                    }`}
                  />

                  <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end overflow-hidden">
                    <div
                      className={`transition-all duration-500 delay-100 flex flex-col justify-end h-full w-full ${
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-10 invisible"
                      }`}
                    >
                      <div className="space-y-3 md:space-y-4 w-full">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
                          <h2 className="text-2xl md:text-5xl font-bold text-white font-serif leading-tight drop-shadow-lg">
                            {slide.title}
                          </h2>

                          <div className="self-start md:self-auto bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg">
                            <div className="flex items-center gap-1 text-orange-400 font-bold text-sm">
                              <Star size={14} fill="currentColor" />{" "}
                              {slide.rating}
                            </div>
                          </div>
                        </div>

                        <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-md line-clamp-2 md:line-clamp-none">
                          {slide.description}
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                          <span className="text-orange-100/80 text-xs uppercase tracking-widest flex items-center gap-1">
                            <MapPin size={12} /> {slide.location}
                          </span>

                          <Link
                            href={"/1/clubdetails"}
                            className="ml-auto group flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:bg-orange-200 transition-all"
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

                    {/* Vertical text for inactive slides */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                        isActive
                          ? "opacity-0 invisible"
                          : "opacity-100 visible delay-300"
                      }`}
                    >
                      <h3
                        className="text-white/70 text-lg md:text-xl font-bold tracking-[0.3em] uppercase whitespace-nowrap"
                        style={{
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {slide.title}
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
