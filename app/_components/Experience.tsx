import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Compass, Sun } from "lucide-react";

const Experience = () => {
  return (
    <div
      id="experiences"
      className="bg-slate-50 dark:bg-gray-900 text-slate-900 dark:text-white font-sans selection:bg-amber-200 transition-colors"
    >
      {/* ================= HERO SECTION ================= */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold text-black dark:text-white mb-16 tracking-tight">
          Experiences
        </h2>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs font-bold tracking-wider uppercase">
              <MapPin size={14} />
              Discovery Awaits
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900 dark:text-white">
              More destinations <br />
              <span className="text-slate-400 dark:text-slate-500">to discover.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed border-l-4 border-amber-500 pl-4 sm:pl-6">
              Open new doors and discover new possibilities. It all begins with
              premium timeshare resorts in the most desirable vacation spots
              around the world.
            </p>

            <div className="pt-4">
              <button className="group flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium transition-all hover:bg-amber-600 dark:hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-600/20">
                Explore Destinations
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Images */}
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 h-auto">
              {/* Tall Image */}
              <div className="col-span-1 relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:translate-y-8">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
                  alt="Resort Life"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Stacked Images */}
              <div className="col-span-1 sm:col-span-2 grid grid-rows-2 gap-3 sm:gap-4">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80"
                    alt="Pool"
                    className="w-full h-40 sm:h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:-translate-x-8 z-10 border-4 border-slate-50 dark:border-gray-800">
                  <img
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
                    alt="Couple"
                    className="w-full h-40 sm:h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Decorative Blur */}
            <div className="absolute -right-5 sm:-right-10 -top-10 w-32 sm:w-64 h-32 sm:h-64 bg-amber-400/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* ================= FEATURE SECTIONS ================= */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-20 sm:space-y-24">
        {/* Feature 1 */}
        <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-gray-800 shadow-2xl">
          <div className="grid lg:grid-cols-2">
            <div className="h-60 sm:h-80 lg:h-[600px] relative">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
            </div>

            <div className="flex items-center p-6 sm:p-10 lg:p-20">
              <div className="space-y-4 sm:space-y-6 max-w-md">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  The space you need.
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                  Vacation villas give you more space to spread out, with
                  like-home comforts you love.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold hover:gap-4 transition-all"
                >
                  Explore Accommodations <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-2xl">
          <div className="grid lg:grid-cols-2">
            <div className="flex items-center p-6 sm:p-10 lg:p-20 order-2 lg:order-1">
              <div className="space-y-4 sm:space-y-6 max-w-md">
                <h3 className="text-2xl sm:text-3xl font-bold">
                  The amenities you want.
                </h3>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  Resorts surround you with opportunities for relaxation and
                  play.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-amber-400 font-bold hover:gap-4 transition-all"
                >
                  Explore Amenities <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="h-60 sm:h-80 lg:h-[600px] relative group order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      </div>
    );
  };
  
  export default Experience;
  