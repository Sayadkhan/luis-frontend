import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Compass, Sun } from "lucide-react";

const Experience = () => {
  return (
    <div
      id="experiences"
      className="bg-slate-50 text-slate-900 font-sans selection:bg-amber-200"
    >
      <section className="w-full max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-center text-5xl sm:text-6xl font-extrabold text-black mb-24 tracking-tight">
          Experiences
        </h2>
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Typography */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-wider uppercase">
              <MapPin size={14} />
              Discovery Awaits
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
              More destinations <br />
              <span className="text-slate-400">to discover.</span>
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-amber-500 pl-6">
              Open new doors and discover new possibilities. It all begins with
              premium timeshare resorts in the most desirable vacation spots
              around the world.
            </p>

            <div className="pt-4">
              <button className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-medium transition-all hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-600/20">
                Explore Destinations
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-3 gap-4 h-[500px]">
              {/* Tall Image */}
              <div className="col-span-1 relative rounded-3xl overflow-hidden shadow-xl transform translate-y-8">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
                  alt="Resort Life"
                  className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              {/* Stacked Images */}
              <div className="col-span-2 grid grid-rows-2 gap-4">
                <div className="relative rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80"
                    alt="Pool"
                    className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="relative rounded-3xl overflow-hidden shadow-xl transform -translate-x-8 z-10 border-4 border-slate-50">
                  <img
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"
                    alt="Couple"
                    className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
            {/* Decorative Blur Blob */}
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/*  Feature Card */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20 space-y-24">
        {/* Feature 1: The Space */}
        <div className="relative rounded-[3rem] overflow-hidden bg-white shadow-2xl shadow-slate-200/50">
          <div className="grid lg:grid-cols-2">
            <div className="h-[400px] lg:h-[600px] relative">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                alt="Interior"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
            </div>

            <div className="relative lg:static flex items-center p-8 lg:p-20">
              <div className="space-y-6 max-w-md">
                <h3 className="text-3xl font-bold text-slate-900">
                  The space you need.
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Vacation villas give you more space to spread out, with the
                  like-home comforts you love, including separate living and
                  dining areas.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-amber-600 font-bold hover:gap-4 transition-all"
                >
                  Explore Accommodations <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Amenities  */}
        <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 text-white shadow-2xl shadow-slate-900/20">
          <div className="grid lg:grid-cols-2">
            {/* Content Side */}
            <div className="flex items-center p-8 lg:p-20 order-2 lg:order-1">
              <div className="space-y-6 max-w-md">
                <h3 className="text-3xl font-bold">The amenities you want.</h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Resorts designed for vacationers surround you with
                  opportunities for relaxation and play, from sparkling pools to
                  on-site activities.
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-amber-400 font-bold hover:gap-4 transition-all"
                >
                  Explore Amenities <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Image Side */}
            <div className="h-[400px] lg:h-[600px] relative order-1 lg:order-2 group">
              <img
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80"
                alt="Amenities"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">
                Go Further
              </span>
              <h2 className="text-4xl font-bold text-slate-900 mt-2">
                More experiences to explore
              </h2>
            </div>
            <Link
              href="#"
              className="text-slate-500 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors"
            >
              View all options <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80"
                alt="Cruises"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-amber-500 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white">
                  <Compass size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Cruises</h3>
                <p className="text-slate-200 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Thousands of sails to coveted ports around the globe.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
                alt="Tours"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-amber-500 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white">
                  <MapPin size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Vacation Tours
                </h3>
                <p className="text-slate-200 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Some of the world’s most indelible travel experiences.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
                alt="Outdoors"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-amber-500 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white">
                  <Sun size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Great Outdoors
                </h3>
                <p className="text-slate-200 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Golf play and instruction to rafting, biking, and hiking
                  trips.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;
