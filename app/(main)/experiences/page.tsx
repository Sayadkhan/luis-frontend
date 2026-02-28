import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Compass, Sun, Clock, Star, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Experiences | Vacation Club",
  description: "Discover the world's most indelible travel experiences, from cruises to outdoor adventures.",
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

async function getExperiences() {
  try {
    const res = await fetch(`${backendUrl}/api/v1/spot`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function ExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="bg-slate-900 py-24 px-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-amber-500 text-xs uppercase tracking-[4px] mb-4 font-black">Go Further</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Discover New <br />
            <span className="text-amber-500">Experiences</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            From coveted ports to golf and rafting, explore the world&apos;s most indelible travel experiences with our vacation club.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {experiences.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <Compass size={48} className="mx-auto text-slate-300 mb-6" />
            <p className="text-slate-400 text-lg font-medium">No experiences found yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {experiences.map((exp: any) => (
              <div 
                key={exp._id} 
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-500 overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col h-full"
              >
                {/* Image Area */}
                <div className="relative h-72 overflow-hidden">
                  {exp.image?.[0]?.url ? (
                    <img
                      src={exp.image[0].url}
                      alt={exp.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <Sun className="text-slate-300" size={40} />
                    </div>
                  )}
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                      {exp.tourType || "Discovery"}
                    </span>
                  </div>

                  {/* Rating Overlay */}
                  <div className="absolute bottom-6 right-6 flex items-center gap-1.5 bg-amber-500 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    <Star size={12} fill="currentColor" />
                    <span>4.9</span>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
                    <MapPin size={14} />
                    {exp.location}
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-amber-500 transition-colors leading-tight">
                    {exp.name}
                  </h2>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                      <Clock size={16} className="text-slate-400" />
                      <span>{exp.duration || "Full Day"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                      <DollarSign size={16} className="text-slate-400" />
                      <span>{exp.price || "Contact Us"}</span>
                    </div>
                  </div>

                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {exp.details?.description || "Experience the local culture and breathtaking views of this unique destination."}
                  </p>

                  <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-800">
                    <Link
                      href={`/experiences/${exp.name}`}
                      className="flex items-center justify-between w-full group/btn"
                    >
                      <span className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white group-hover/btn:text-amber-500 transition-colors">
                        Explore details
                      </span>
                      <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 group-hover/btn:bg-amber-500 group-hover/btn:text-white transition-all">
                        <ArrowRight size={18} />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
            Can&apos;t find what you&apos;re <br className="hidden md:block" /> looking for?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Our vacation specialists are here to help you plan the perfect escape. Get in touch for personalized recommendations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link 
              href="/#contact" 
              className="px-10 py-5 bg-amber-500 text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-xl shadow-amber-500/20"
            >
              Contact Specialist
            </Link>
            <Link 
              href="/blog" 
              className="px-10 py-5 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm rounded-full hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              Readmember Stories
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
