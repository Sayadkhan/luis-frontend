"use client";

import React, { useState } from "react";
import { MapPin, Quote, ChevronRight, LayoutGrid } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

// Define the shape of a Feature object
interface Feature {
  title: string;
  desc: string;
  image: string;
}

const GALLERY: string[] = [
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
];

const FEATURES: Feature[] = [
  {
    title: "Create Your Best Vacation Life",
    desc: "Explore inspiring adventures around the globe with destinations and experiences as diverse as your desires.",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Marriott Quality",
    desc: "Dependability you reserve. Enjoy titanium standards of excellence when you stay at any Marriott Vacation Club villa resort or city property.",
    image:
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Villa Vacations",
    desc: "Spread out and grow closer. Your spacious accommodations include room for everyone, plus a kitchen or kitchenette and other homelike amenities.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function ClubDetailsPage() {
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
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* hero section */}
      <section className="relative h-[95vh] w-full overflow-hidden bg-black">
        {/* Main Background Image */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            isAnimating ? "opacity-50" : "opacity-100"
          }`}
        >
          <img
            src={GALLERY[activeImage]}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

        {/* Hero Content Container */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 max-w-[1900px] mx-auto">
          <div></div>

          {/* Bottom Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end z-20 pb-8">
            {/*Main Titles */}
            <div className="lg:col-span-5 space-y-6 text-white relative">
              {/* Gold Bracket Decoration */}
              <div className="absolute -left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C6AC5E] to-transparent opacity-50 hidden md:block" />

              <div className="flex items-center gap-3 text-[#C6AC5E] uppercase tracking-[0.2em] text-xs font-bold">
                <MapPin size={14} /> Kalapaki Beach, Hawai'i
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.9] tracking-tight drop-shadow-2xl">
                Marriott's <br />
                <span className="italic text-white/90">Kaua'i Beach</span>
              </h1>
              <p className="text-white/80 max-w-lg text-lg font-light leading-relaxed border-l-2 border-[#C6AC5E] pl-6 ml-1">
                Discover a paradise where the ocean greets you at the door.
                Luxury living tailored for the modern explorer.
              </p>
              <div className="pt-6 flex gap-4">
                <button className="px-8 py-4 bg-[#C6AC5E] text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors">
                  Check Availability
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 w-full overflow-hidden">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="bg-[#00385f] text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                  <LayoutGrid size={12} /> Select View
                </div>
                <div className="text-white/50 text-xs uppercase tracking-widest">
                  {activeImage + 1} / {GALLERY.length}
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
                {GALLERY.map((img, idx) => (
                  <SwiperSlide key={idx} className="!h-auto">
                    <div
                      onClick={() => handleImageChange(idx)}
                      className={`
                                                relative w-full aspect-[16/9] rounded-sm overflow-hidden transition-all duration-300 group
                                                border-2 
                                                ${
                                                  activeImage === idx
                                                    ? "border-[#C6AC5E] opacity-100 scale-[1.02] shadow-xl"
                                                    : "border-transparent cursor-pointer opacity-60 hover:opacity-100 hover:scale-[1.02]"
                                                }
                                              `}
                    >
                      <img
                        src={img}
                        className="w-full h-full object-cover"
                        alt={`View ${idx}`}
                      />

                      <div
                        className={`absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors ${
                          activeImage === idx ? "hidden" : "block"
                        }`}
                      />

                      {activeImage === idx && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                            <div className="w-2 h-2 bg-[#C6AC5E] rounded-full animate-pulse" />
                          </div>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* */}
      <section className="relative py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="relative lg:w-1/2">
            <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=2070&auto=format&fit=crop"
                alt="Family Dining"
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="absolute -top-6 -left-6 w-full h-full border border-[#C6AC5E] rounded-sm -z-0 hidden md:block" />

            <div className="absolute -bottom-8 -right-4 bg-white p-6 shadow-xl max-w-[150px] z-20 border-t-4 border-[#00385f]">
              <div className="text-3xl font-serif text-[#00385f] mb-1">M</div>
              <div className="text-[0.6rem] font-bold tracking-widest uppercase text-stone-400">
                Marriott Vacation Club
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 space-y-6">
            <span className="text-[#C6AC5E] font-bold tracking-[0.2em] uppercase text-sm">
              Experience More
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900">
              Be Inspired
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed font-light">
              Recharge, play, and reward yourself with more fulfilling
              vacations. With villa resorts and city properties in premium
              locations, you can make every moment count.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex items-end justify-between mb-12 border-b border-stone-200 pb-6">
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
              Well-Deserved Time Away
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="overflow-hidden mb-6 relative h-80">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide text-[#00385f] mb-3 group-hover:text-[#C6AC5E] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-stone-500 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative py-32 bg-fixed bg-cover bg-center group overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1974&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-stone-900/40 transition-colors duration-500 group-hover:bg-stone-900/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 flex justify-end">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 md:p-16 max-w-lg text-white shadow-2xl">
            <h2 className="text-4xl font-serif mb-6">Accommodations</h2>
            <p className="text-white/90 leading-relaxed mb-8 font-light">
              With studios to 1-, 2-, and 3-bedroom resort villas, you can
              choose the size that gives your family and friends the space to
              vacation together comfortably.
            </p>
            <button className="flex items-center gap-3 px-8 py-3 bg-white text-stone-900 font-bold uppercase tracking-widest hover:bg-[#C6AC5E] hover:text-white transition-colors">
              View Rooms <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F9F8F6] px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Quote size={48} className="mx-auto text-[#C6AC5E] mb-8 opacity-50" />
          <h3 className="text-2xl md:text-4xl font-serif text-stone-800 leading-snug mb-10">
            "The good thing about Marriott Vacation Club is the variety of
            destinations. Every vacation is different if you want it to be. We
            can go to a completely different place or revisit a favorite."
          </h3>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C6AC5E] p-1">
              <img
                src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2070&auto=format&fit=crop"
                alt="User"
                className="w-full h-full object-cover rounded-full grayscale"
              />
            </div>
            <div>
              <div className="font-bold uppercase tracking-widest text-xs mb-1">
                Lisa and Chris D.
              </div>
              <div className="text-stone-500 text-xs italic">
                Owners since 2013
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
