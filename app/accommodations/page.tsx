"use client";

import React, { useState } from "react";
import { MapPin, LayoutGrid } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";


interface SubSection {
  title: string;
  text: string;
}

interface ContentSection {
  mainTitle: string;
  image: string;
  imageCaption: string;
  subSections: SubSection[];
}


const SECTIONS: ContentSection[] = [
  {
    mainTitle: "INSPIRED VACATION SPACES",
  
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    imageCaption:
      "THE WESTIN ST. JOHN RESORT VILLAS | ST. JOHN, U.S. VIRGIN ISLANDS",
    subSections: [
      {
        title: "MORE SPACE TO SHARE",
        text: "Designed to encourage reconnection, 1-, 2-, 3-, and even 4-bedroom resort vacation villas offer a haven to come together with the comforts of home. And stylish guestrooms in the heart of it all are your home base for exploring the city.",
      },
      {
        title: "FLEXIBILITY TO VACATION YOUR WAY",
        text: "From a balcony with beach views to a mountain retreat, your Marriott®, Sheraton®, or Westin® timeshare accommodations deliver the space for you to take the break you deserve for your most fulfilling life.",
      },
    ],
  },
  {
    mainTitle: "YOUR SPACIOUS SANCTUARY",

    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    imageCaption:
      "MARRIOTT VACATION CLUB® AT LOS SUEÑOS | HERRADURA, COSTA RICA",
    subSections: [
      {
        title: "WHERE STYLE MEETS COMFORT",
        text: "Spread out in spacious villas with like-home comforts, most with amenities like kitchens, balconies, washers and dryers, and separate living areas to relax and unwind.",
      },
      {
        title: "FAMILY VACATIONS ENHANCED",
        text: "From shared meals to game nights, your villa is a hub for family activity, so you can cherish moments with those who matter the most.",
      },
    ],
  },
  {
    mainTitle: "VACATIONS FOR ALL OCCASIONS",
   
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
    imageCaption: "VACATION HOME IN MONTEGO BAY, JAMAICA",
    subSections: [
      {
        title: "ROOM FOR A REUNION",
        text: "Gather your extended family or a group of close friends for a rewarding retreat. Eligible Owners can reserve luxury vacation homes in sought-after destinations.",
      },
      {
        title: "A PLACE TO RECONNECT",
        text: "Rekindle a love for adventure – and each other. Your vacation villa provides the space to grow closer in some of the world's most romantic cities.",
      },
    ],
  },
];

const HERO_GALLERY: string[] = [
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
];


const CirclePattern = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={`opacity-10 pointer-events-none ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke="#C6AC5E"
      strokeWidth="0.5"
    />
    <circle
      cx="50"
      cy="50"
      r="40"
      fill="none"
      stroke="#C6AC5E"
      strokeWidth="0.5"
    />
    <circle
      cx="50"
      cy="50"
      r="35"
      fill="none"
      stroke="#C6AC5E"
      strokeWidth="0.5"
    />
    <circle
      cx="50"
      cy="50"
      r="30"
      fill="none"
      stroke="#C6AC5E"
      strokeWidth="0.5"
    />
    <circle
      cx="50"
      cy="50"
      r="25"
      fill="none"
      stroke="#C6AC5E"
      strokeWidth="0.5"
    />
    <circle
      cx="50"
      cy="50"
      r="20"
      fill="none"
      stroke="#C6AC5E"
      strokeWidth="0.5"
    />
    <circle
      cx="50"
      cy="50"
      r="15"
      fill="none"
      stroke="#C6AC5E"
      strokeWidth="0.5"
    />
    <circle
      cx="50"
      cy="50"
      r="10"
      fill="none"
      stroke="#C6AC5E"
      strokeWidth="0.5"
    />
  </svg>
);

export default function Accommodations() {
  const [activeImage, setActiveImage] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleImageChange = (index: number) => {
    if (activeImage === index) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveImage(index);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] font-sans text-stone-900 overflow-x-hidden">
      {/* ----------------- hero section ----------------- */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-black">
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            isAnimating ? "opacity-50" : "opacity-100"
          }`}
        >
          <img
            src={HERO_GALLERY[activeImage]}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 max-w-[1900px] mx-auto">
          <div></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end z-20 pb-8">
            <div className="lg:col-span-5 space-y-6 text-white relative">
              <div className="absolute -left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C6AC5E] to-transparent opacity-50 hidden md:block" />
              <div className="flex items-center gap-3 text-[#C6AC5E] uppercase tracking-[0.2em] text-xs font-bold">
                <MapPin size={14} /> Kalapaki Beach, Hawai'i
              </div>
              <h1 className="text-5xl md:text-7xl font-serif leading-[0.9] tracking-tight drop-shadow-2xl">
                Marriott's <br />
                <span className="italic text-white/90">Kaua'i Beach</span>
              </h1>
              <button className="px-8 py-4 bg-[#C6AC5E] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors mt-6">
                Check Availability
              </button>
            </div>

            <div className="lg:col-span-7 w-full overflow-hidden">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="bg-[#00385f] text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                  <LayoutGrid size={12} /> Select View
                </div>
                <div className="text-white/50 text-xs uppercase tracking-widest">
                  {activeImage + 1} / {HERO_GALLERY.length}
                </div>
              </div>

              <Swiper
                slidesPerView={1.5}
                spaceBetween={16}
                freeMode={true}
                modules={[FreeMode, Navigation]}
                breakpoints={{
                  640: { slidesPerView: 2.5, spaceBetween: 20 },
                  1024: { slidesPerView: 3.2, spaceBetween: 24 },
                }}
                className="w-full !overflow-hidden"
              >
                {HERO_GALLERY.map((img, idx) => (
                  <SwiperSlide key={idx} className="!h-auto">
                    <div
                      onClick={() => handleImageChange(idx)}
                      className={`relative w-full aspect-[16/9] rounded-sm overflow-hidden transition-all duration-300 group border-2 ${
                        activeImage === idx
                          ? "border-[#C6AC5E] opacity-100 scale-[1.02] shadow-xl"
                          : "border-transparent cursor-pointer opacity-60 hover:opacity-100 hover:scale-[1.02]"
                      }`}
                    >
                      <img
                        src={img}
                        className="w-full h-full object-cover"
                        alt={`View ${idx}`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- content section ----------------- */}
      <div className="relative py-20 overflow-hidden">
       
        <CirclePattern className="absolute top-0 left-[-20%] w-[800px] h-[800px] text-[#C6AC5E]" />
        <CirclePattern className="absolute bottom-0 right-[-20%] w-[900px] h-[900px] text-[#C6AC5E]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-32">
          {SECTIONS.map((section, idx) => {
            const isReverse = idx % 2 !== 0; 

            return (
              <div
                key={idx}
                className={`flex flex-col lg:flex-row ${
                  isReverse ? "lg:flex-row-reverse" : ""
                } gap-12 lg:gap-24 items-center relative z-10`}
              >
                
                <div className="w-full lg:w-1/2">
                  <div className="relative group">
                    <div className="overflow-hidden rounded-sm shadow-xl">
                      <img
                        src={section.image}
                        alt={section.mainTitle}
                        className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  
                    <div className="mt-3">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-stone-400 font-medium">
                        {section.imageCaption}
                      </p>
                    </div>
                  </div>
                </div>

               
                <div className="w-full lg:w-1/2 space-y-10">
                  <h2 className="text-3xl md:text-4xl text-[#00385f] font-sans font-normal tracking-wide uppercase">
                    {section.mainTitle}
                  </h2>

                  <div className="space-y-8">
                    {section.subSections.map((sub, subIdx) => (
                      <div key={subIdx} className="space-y-3">
                        <h3 className="text-xs font-bold text-[#00385f] uppercase tracking-[0.1em]">
                          {sub.title}
                        </h3>
                        <p className="text-stone-600 leading-relaxed text-[15px] font-light">
                          {sub.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
