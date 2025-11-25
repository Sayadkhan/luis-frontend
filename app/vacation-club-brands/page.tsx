import React from "react";
import { Play, ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function VacationClubBrandsPage() {
  return (
    <main className="min-h-screen bg-[#fcfbf9] text-slate-800 font-sans selection:bg-[#CDAE67] selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
        <div className="absolute top-1/3 left-0 -translate-x-1/2 w-[800px] h-[800px] border border-[#CDAE67]/10 rounded-full"></div>
        <div className="absolute top-1/3 left-0 -translate-x-1/2 w-[600px] h-[600px] border border-[#CDAE67]/10 rounded-full"></div>

        <div className="absolute top-2/3 right-0 translate-x-1/2 w-[900px] h-[900px] border border-[#CDAE67]/10 rounded-full"></div>
        <div className="absolute top-2/3 right-0 translate-x-1/2 w-[700px] h-[700px] border border-[#CDAE67]/10 rounded-full"></div>
      </div>

      <section className="relative z-10 pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center mt-10">
          <div>
            <h5 className="text-[#CDAE67] font-bold tracking-widest uppercase text-xs mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#CDAE67]"></span>
              Our Collection
            </h5>
            <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-8 leading-tight">
              Vacation Club <br />
              <span className="italic text-slate-800">Brands</span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-md border-l-2 border-[#CDAE67]/30 pl-6">
              Owners enjoy access to a distinguished family of vacation club
              brands. Each offers its own distinctive brand of hospitality.
              Together, they give you an abundance of inviting options.
            </p>
          </div>

          <div className="relative hidden lg:block h-[400px]">
            <div className="absolute top-0 right-0 w-full h-full  rounded-tl-[100px] rounded-br-[100px] shadow-2xl flex items-center justify-center overflow-hidden">
              <Image
                alt=""
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop"
                className="w-full h-full object-cover mix-blend-overlay"
              />
              <div className="absolute text-white/30 text-6xl font-serif font-bold mix-blend-soft-light tracking-widest">
                LUXURY
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32 space-y-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center group">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl cursor-pointer transform transition-all duration-500 hover:-translate-y-2">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop"
              alt="Marriott Vacation Club"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 hover:bg-[#CDAE67] hover:border-[#CDAE67] transition-all duration-300">
                <Play fill="currentColor" className="text-white ml-1 w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="lg:pl-10">
            <h2 className="text-3xl font-serif text-slate-900 mb-6">
              Marriott Vacation Club
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8 text-sm md:text-base">
              Extend your best vacation. Exceptional vacation resorts and
              properties invite you to relax, explore and share memories in a
              variety of locations and experiences throughout the U.S.,
              Caribbean, Europe, and Asia.
            </p>
            <a
              href="#"
              className="group inline-flex items-center text-slate-900 font-bold text-xs uppercase tracking-widest hover:text-[#CDAE67] transition-colors"
            >
              Learn about Marriott Vacation Club
              <span className="ml-3 bg-slate-200 group-hover:bg-[#CDAE67] group-hover:text-white p-1 rounded-full transition-colors">
                <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center group">
          <div className="order-2 lg:order-1 lg:pr-10 text-right lg:text-left">
            <h2 className="text-3xl font-serif text-slate-900 mb-6">
              Sheraton Vacation Club
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8 text-sm md:text-base">
              Gather and be grouped by joyful experiences. Sheraton Vacation
              Club helps you bring your tribe closer together for refreshing,
              fun-filled vacations at family destinations in Florida, South
              Carolina and Colorado.
            </p>
            <a
              href="#"
              className="group inline-flex items-center text-slate-900 font-bold text-xs uppercase tracking-widest hover:text-[#CDAE67] transition-colors"
            >
              Learn about Sheraton Vacation Club
              <span className="ml-3 bg-slate-200 group-hover:bg-[#CDAE67] group-hover:text-white p-1 rounded-full transition-colors">
                <ArrowRight size={14} />
              </span>
            </a>
          </div>

          <div className="order-1 lg:order-2 relative aspect-video rounded-lg overflow-hidden shadow-2xl cursor-pointer transform transition-all duration-500 hover:-translate-y-2">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop"
              alt="Sheraton Vacation Club"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 hover:bg-[#CDAE67] hover:border-[#CDAE67] transition-all duration-300">
                <Play fill="currentColor" className="text-white ml-1 w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center group">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl cursor-pointer transform transition-all duration-500 hover:-translate-y-2">
            <Image
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1000&auto=format&fit=crop"
              alt="Westin Vacation Club"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 hover:bg-[#CDAE67] hover:border-[#CDAE67] transition-all duration-300">
                <Play fill="currentColor" className="text-white ml-1 w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="lg:pl-10">
            <h2 className="text-3xl font-serif text-slate-900 mb-6">
              Westin Vacation Club
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8 text-sm md:text-base">
              Feel free with wellness. Westin is a place where you can be your
              best self. Energize and revitalize with experiences designed to
              help you feel well, eat well, sleep well and move well in
              destinations such as Mexico, Hawaii and California.
            </p>
            <a
              href="#"
              className="group inline-flex items-center text-slate-900 font-bold text-xs uppercase tracking-widest hover:text-[#CDAE67] transition-colors"
            >
              Learn about Westin Vacation Club
              <span className="ml-3 bg-slate-200 group-hover:bg-[#CDAE67] group-hover:text-white p-1 rounded-full transition-colors">
                <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#CDAE67] py-8 px-6 relative z-10 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-900 font-serif italic text-lg md:text-xl">
            Explore more world-class timeshare resorts in breathtaking vacation
            destinations.
          </p>
          <button className="px-8 py-3 rounded-full bg-slate-900 text-white text-xs font-bold uppercase hover:bg-white hover:text-slate-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View All Destinations
          </button>
        </div>
      </section>

      <section className="relative h-[600px] bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000&auto=format&fit=crop"
            alt="Happy Friends"
            className="w-full h-full object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-lg text-white">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full border-2 border-[#CDAE67] p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    alt=""
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400&auto=format&fit=crop"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="text-[#CDAE67] font-bold text-xs uppercase tracking-widest mb-1">
                  Featured Story
                </p>
                <p className="text-slate-300 text-sm">Switzerland Adventure</p>
              </div>
            </div>

            <h2 className="text-5xl font-serif text-white mb-6 leading-tight">
              Owners Share <br />
              <span className="text-[#CDAE67]">Vacation Moments</span>
            </h2>
            <p className="text-slate-300 text-lg italic mb-10 leading-relaxed border-l-4 border-[#CDAE67] pl-6">
              "Catching shadows in old alleys. We found authentic experiences
              we'll re-live for a lifetime."
            </p>

            <button className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-[#CDAE67] hover:border-[#CDAE67] hover:text-slate-900 transition-all group">
              Read Their Stories
              <ChevronRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
