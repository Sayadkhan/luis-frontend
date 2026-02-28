import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Calendar, Star, DollarSign, Check, Info, Compass, Sun, Map } from "lucide-react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

async function getExperience(name: string) {
  try {
    const res = await fetch(`${backendUrl}/api/v1/spot/details/${name}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const exp = await getExperience(decodeURIComponent(id));
  if (!exp) return { title: "Experience Not Found" };
  return {
    title: `${exp.name} | Vacation Club`,
    description: exp.details?.description || exp.name,
  };
}

export default async function ExperienceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exp = await getExperience(decodeURIComponent(id));

  if (!exp) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Compass size={64} className="text-slate-200 mb-8 animate-bounce" />
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Experience Not Found</h1>
        <p className="text-slate-500 mb-10 max-w-md text-center px-6">The experience you&apos;re looking for doesn&apos;t exist or has been removed from our collection.</p>
        <Link href="/experiences" className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest text-sm rounded-full hover:bg-amber-500 hover:text-white transition-all">
          Back to Experiences
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* ─── HERO AREA ────────────────────────────────────────── */}
      <div className="relative h-[65vh] min-h-[500px] overflow-hidden">
        {exp.image?.[0]?.url ? (
          <img
            src={exp.image[0].url}
            alt={exp.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />

        {/* Header content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-16 max-w-7xl mx-auto">
          <Link href="/experiences" className="inline-flex items-center gap-2 text-white/70 hover:text-amber-500 text-xs font-black uppercase tracking-widest mb-8 transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Experiences
          </Link>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="bg-amber-500 text-black text-[10px] font-black uppercase tracking-[3px] px-4 py-1.5 rounded-full shadow-xl">
                {exp.tourType || "Experience"}
              </span>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/20">
                <Star size={12} fill="currentColor" className="text-amber-500" />
                <span>4.9 / 5.0 Rating</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white max-w-4xl tracking-tight leading-tight">
              {exp.name}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-white/80 text-sm font-medium pt-4">
              <span className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 backdrop-blur-md flex items-center justify-center text-amber-500 border border-amber-500/30">
                  <MapPin size={18} />
                </div>
                {exp.location}
              </span>
              <span className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 backdrop-blur-md flex items-center justify-center text-blue-400 border border-blue-500/30">
                  <Clock size={18} />
                </div>
                {exp.duration || "Full Day"}
              </span>
              <span className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 backdrop-blur-md flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                  <DollarSign size={18} />
                </div>
                {exp.price || "Contact Us"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CONTENT GRID ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
          
          {/* Main Info */}
          <div className="space-y-16">
            {/* Description */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-4">
                <Info size={32} className="text-amber-500" />
                Overview
              </h2>
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 dark:border-slate-800">
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-10 first-letter:text-5xl first-letter:font-bold first-letter:text-amber-500 first-letter:mr-3 first-letter:float-left">
                  {exp.details?.description || "Explore the wonders of this unique destination. Our curated experiences bring you closer to the heart of the world's most beautiful spots, offering a perfect blend of adventure and luxury."}
                </p>
                
                {/* Secondary Images */}
                {exp.image?.length > 1 && (
                  <div className="grid grid-cols-2 gap-4">
                    {exp.image.slice(1, 3).map((img: any, idx: number) => (
                      <div key={idx} className="h-60 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800">
                        <img src={img.url} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt={exp.name} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Tour Plan */}
            {exp.tourPlan?.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-4">
                  <Map size={32} className="text-amber-500" />
                  Experience Roadmap
                </h2>
                <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100 dark:before:bg-slate-800">
                  {exp.tourPlan.map((step: any, idx: number) => (
                    <div key={idx} className="relative pl-12">
                      <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-amber-500 flex items-center justify-center text-amber-500 font-bold text-xs z-10 shadow-lg">
                        {idx + 1}
                      </div>
                      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-50 dark:border-slate-800 hover:border-amber-500/30 transition-colors">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Included / Excluded */}
            {exp.included?.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-4">
                  <Sun size={32} className="text-amber-500" />
                  What&apos;s Included
                </h2>
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 dark:border-slate-800 grid sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Included benefits</p>
                    {exp.included.filter((i: any) => i.isIncluded).map((item: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0 mt-0.5">
                          <Check size={14} />
                        </div>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">{item.title}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Not included</p>
                    {exp.included.filter((i: any) => !i.isIncluded).map((item: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0 mt-0.5">
                          <Check size={14} className="opacity-30" />
                        </div>
                        <span className="text-slate-400 dark:text-slate-500 italic">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Booking Card */}
          <aside>
            <div className="sticky top-28 space-y-8">
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                
                <p className="text-amber-500 text-[10px] font-black uppercase tracking-[4px] mb-4">Vacation Club Exclusive</p>
                <h3 className="text-3xl font-bold mb-8">Ready for this escape?</h3>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Duration</span>
                    <span className="font-bold">{exp.duration || "Full Day"}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Availability</span>
                    <span className="font-bold flex items-center gap-2"><Calendar size={14} className="text-amber-500" /> Every Day</span>
                  </div>
                </div>

                <Link 
                  href="/#contact" 
                  className="block w-full py-5 bg-amber-500 text-black font-black uppercase tracking-widest text-sm rounded-full text-center hover:bg-white transition-all shadow-xl shadow-amber-500/20 mb-6"
                >
                  Inquire Now
                </Link>
                <p className="text-center text-xs text-white/40 font-medium">No obligation. Talk to a specialist first.</p>
              </div>

              {/* Safety/Trust Info */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                    <Check size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Guaranteed Safety</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">Certified guides and top-tier equipment provided.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                    <Star size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Premium Quality</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">Rated 4.9/5 by over 200 vacation club members.</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
