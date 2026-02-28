"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Users,
  Calendar,
  Mail,
  Phone,
  Globe,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Send,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import type { Club } from "./page";
import Image from "next/image";
import { useCreateInquiryMutation } from "@/redux/features/blog/blogApi";
import toast, { Toaster } from "react-hot-toast";

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

export default function ClubDetailClient({ club }: { club: Club | null }) {
  const [createInquiry] = useCreateInquiryMutation();
  const [activeLocIdx, setActiveLocIdx] = useState(0);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    guests: "2",
    message: "",
    interest: "",
    preferredLocation: "",
  });
  const [formSent, setFormSent] = useState(false);
  const [sending, setSending] = useState(false);

  // Set initial preferred location
  useState(() => {
    if (club?.locationImages?.[0]?.title) {
      setForm((prev) => ({
        ...prev,
        preferredLocation: club.locationImages[0].title,
      }));
    }
  });

  const getImage = (club: Club) =>
    club.clubLogo?.[0]?.url ||
    CATEGORY_IMAGES[club.clubCategory] ||
    CATEGORY_IMAGES.default;

  if (!club) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a1628]">
        <h1 className="text-4xl font-serif text-white mb-4">Club Not Found</h1>
        <p className="text-white/50 mb-8">
          The vacation club you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#C6AC5E] text-black font-bold rounded-full hover:opacity-90 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const locations = club.locationImages || [];
  const activeLoc = locations[activeLocIdx];
  const activeLocImages = activeLoc?.images || [];

  const heroImage =
    activeLocImages[activeImgIdx]?.url ||
    activeLocImages[0]?.url ||
    club.clubLogo?.[0]?.url ||
    CATEGORY_IMAGES[club.clubCategory] ||
    CATEGORY_IMAGES.default;

  const handleLocSwitch = (idx: number) => {
    setActiveLocIdx(idx);
    setActiveImgIdx(0);
    if (locations[idx]?.title) {
      setForm((prev) => ({ ...prev, preferredLocation: locations[idx].title }));
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await createInquiry({
        ...form,
        name: `${form.firstName} ${form.lastName}`.trim(),
        formType: "request-information",
        reason: form.interest || "ownership",
      }).unwrap();
      setFormSent(true);
    } catch {
      toast.error("Failed to send request. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#1a1a1a] font-sans">
      <Toaster position="top-right" />
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[88vh] w-full overflow-hidden">
        {/* Background image — transitions on location change */}
        <img
          key={heroImage}
          src={heroImage}
          alt={activeLoc?.title || club.clubTitle}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-10 z-10 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <span className="inline-block bg-[#C6AC5E] text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4">
              {club.clubCategory}
            </span>
            <div className="w-24 h-28 overflow-hidden">
              <Image
                src={getImage(club)}
                alt={club.clubTitle}
                width={200}
                height={200}
                className="w-full h-full object-cover rounded-lg mb-6 shadow-lg"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white font-bold leading-[1.05] mb-4 drop-shadow-xl">
              {(activeLoc as any)?.locationName?.trim() || club.clubTitle}
            </h1>
            {activeLoc ? (
              <p className="text-white/80 text-lg font-light leading-relaxed mb-6 max-w-lg">
                <MapPin
                  size={14}
                  className="inline text-[#C6AC5E] mr-1.5 -mt-0.5"
                />
                {activeLoc.description || activeLoc.title}
              </p>
            ) : club.shortDescription ? (
              <p className="text-white/80 text-lg font-light leading-relaxed mb-6 max-w-lg">
                {club.shortDescription}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-5 text-white/60 text-sm">
              {club.totalMembers > 0 && (
                <span className="flex items-center gap-2">
                  <Users size={14} className="text-[#C6AC5E]" />
                  {club.totalMembers.toLocaleString()} Members
                </span>
              )}
              {club.establishedDate && (
                <span className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#C6AC5E]" />
                  Est. {new Date(club.establishedDate).getFullYear()}
                </span>
              )}
              {club.contactInfo?.address && (
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#C6AC5E]" />
                  {club.contactInfo.address}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Location switcher thumbnails — bottom right */}
        {locations.length > 1 && (
          <div className="absolute bottom-10 right-6 md:right-16 z-20 flex gap-2 items-end">
            {locations.map((loc, i) => {
              const thumb =
                loc.images?.[0]?.url ||
                club.clubLogo?.[0]?.url ||
                CATEGORY_IMAGES.default;
              return (
                <button
                  key={i}
                  onClick={() => handleLocSwitch(i)}
                  className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                    activeLocIdx === i
                      ? "border-[#C6AC5E] w-28 h-20 opacity-100 shadow-lg"
                      : "border-white/20 w-16 h-14 opacity-60 hover:opacity-100 hover:border-white/50"
                  }`}
                >
                  <img
                    src={thumb}
                    alt={loc.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                  {activeLocIdx === i && (
                    <div className="absolute bottom-1 left-0 right-0 text-center">
                      <span className="text-white text-[9px] font-bold uppercase tracking-widest drop-shadow">
                        {loc.title}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* ── LOCATION TABS BAR ────────────────────────────────── */}
      {locations.length > 0 && (
        <div className="bg-[#0a1628] text-white sticky top-0 z-30 shadow-xl">
          <div className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-0 shrink-0">
              {locations.map((loc, i) => (
                <button
                  key={i}
                  onClick={() => handleLocSwitch(i)}
                  className={`relative px-5 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${
                    activeLocIdx === i
                      ? "text-[#C6AC5E]"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {(loc as any).locationName?.trim() || loc.title}
                  {activeLocIdx === i && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C6AC5E]" />
                  )}
                </button>
              ))}
            </div>
            <a
              href="#request-info"
              className="shrink-0 flex items-center gap-2 bg-[#C6AC5E] text-black text-[11px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full hover:opacity-90 transition-all my-2"
            >
              Request Info <ArrowRight size={13} />
            </a>
          </div>
        </div>
      )}

      {/* ── STATS BAR ────────────────────────────────────────── */}
      {locations.length === 0 && (
        <div className="bg-[#0a1628] text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-16 py-5 flex flex-wrap gap-8 items-center justify-between">
            <div className="flex flex-wrap gap-8">
              {club.totalMembers > 0 && (
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#C6AC5E]">
                    {club.totalMembers.toLocaleString()}+
                  </p>
                  <p className="text-xs text-white/50 uppercase tracking-widest mt-0.5">
                    Members
                  </p>
                </div>
              )}
              {club.benefits?.length > 0 && (
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#C6AC5E]">
                    {club.benefits.length}
                  </p>
                  <p className="text-xs text-white/50 uppercase tracking-widest mt-0.5">
                    Member Benefits
                  </p>
                </div>
              )}
            </div>
            <a
              href="#request-info"
              className="flex items-center gap-2 bg-[#C6AC5E] text-black text-xs font-black uppercase tracking-widest px-6 py-3 rounded-full hover:opacity-90 transition-all"
            >
              Request Info <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}

      {/* ── ACTIVE LOCATION GALLERY ──────────────────────────── */}
      {activeLoc && activeLocImages.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-16 py-14">
          <div className="mb-6 flex items-baseline gap-4">
            <p className="text-[#C6AC5E] text-xs font-bold uppercase tracking-[0.25em]">
              Now Viewing
            </p>
            <h2 className="text-3xl font-serif text-[#0a1628] font-semibold">
              {(activeLoc as any)?.locationName?.trim() || activeLoc.title}
            </h2>
            {activeLoc.description && (
              <p className="text-stone-400 text-sm hidden md:block">
                {activeLoc.description}
              </p>
            )}
          </div>

          {/* Main image + thumbnails */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Big image */}
            <div className="md:col-span-2 relative overflow-hidden rounded-2xl shadow-lg aspect-[16/10] group">
              <img
                src={activeLocImages[activeImgIdx]?.url}
                alt={`${activeLoc.title} ${activeImgIdx + 1}`}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              {/* Prev/Next */}
              {activeLocImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImgIdx(
                        (i) =>
                          (i - 1 + activeLocImages.length) %
                          activeLocImages.length,
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImgIdx((i) => (i + 1) % activeLocImages.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                  {/* Counter */}
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                    {activeImgIdx + 1} / {activeLocImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[420px] scrollbar-thin scrollbar-thumb-stone-300">
              {activeLocImages.map((img, j) => (
                <button
                  key={j}
                  onClick={() => setActiveImgIdx(j)}
                  className={`shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                    activeImgIdx === j
                      ? "border-[#C6AC5E] shadow-md"
                      : "border-transparent hover:border-stone-300"
                  }`}
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-24 h-16 md:w-full md:h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Location Video */}
          {(activeLoc as any)?.video?.url && (
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
                Location Video
              </p>
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-video bg-black">
                {(activeLoc as any).video.type === "upload" ? (
                  <video
                    src={(activeLoc as any).video.url}
                    controls
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={(activeLoc as any).video.url
                      .replace("watch?v=", "embed/")
                      .replace("youtu.be/", "www.youtube.com/embed/")}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={`${activeLoc.title} video`}
                  />
                )}
              </div>
            </div>
          )}

          {/* All other location previews */}
          {locations.length > 1 && (
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
                Other Locations
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {locations
                  .filter((_, i) => i !== activeLocIdx)
                  .map((loc, i) => {
                    const origIdx = locations.findIndex((l) => l === loc);
                    const thumb =
                      loc.images?.[0]?.url || CATEGORY_IMAGES.default;
                    return (
                      <button
                        key={i}
                        onClick={() => handleLocSwitch(origIdx)}
                        className="group relative overflow-hidden rounded-xl aspect-[4/3] shadow-sm hover:shadow-md transition-all"
                      >
                        <img
                          src={thumb}
                          alt={loc.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white text-sm font-semibold">
                            {loc.title}
                          </p>
                          {loc.description && (
                            <p className="text-white/60 text-xs mt-0.5 line-clamp-1">
                              {loc.description}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── ABOUT + SIDEBAR ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">
        <div className="lg:col-span-3">
          <p className="text-[#C6AC5E] text-xs font-bold uppercase tracking-[0.25em] mb-3">
            About the Club
          </p>
          <h2 className="text-4xl font-serif text-[#0a1628] mb-8 leading-tight">
            Renew Your Vacations
            <br />
            with Ownership
          </h2>
          <div
            className="prose prose-lg max-w-none text-[#444] leading-relaxed
              prose-h2:text-2xl prose-h2:font-serif prose-h2:text-[#0a1628]
              prose-h3:text-xl prose-h3:text-[#0a1628]
              prose-a:text-[#C6AC5E] prose-strong:text-[#0a1628]
              prose-blockquote:border-l-[#C6AC5E] prose-blockquote:text-[#666]"
            dangerouslySetInnerHTML={{ __html: club.clubDescription || "" }}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-20">
          {club.clubPresidentName && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
              <p className="text-[#C6AC5E] text-[10px] font-bold uppercase tracking-widest mb-3">
                Club President
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0a1628] flex items-center justify-center text-white text-lg font-serif font-bold">
                  {club.clubPresidentName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#0a1628]">
                    {club.clubPresidentName}
                  </p>
                  <p className="text-xs text-stone-400">Club Director</p>
                </div>
              </div>
            </div>
          )}

          {(club.contactInfo?.phone ||
            club.contactInfo?.email ||
            club.contactInfo?.address) && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 space-y-4">
              <p className="text-[#C6AC5E] text-[10px] font-bold uppercase tracking-widest mb-1">
                Get in Touch
              </p>
              {club.contactInfo.phone && (
                <a
                  href={`tel:${club.contactInfo.phone}`}
                  className="flex items-center gap-3 text-[#0a1628] hover:text-[#C6AC5E] transition-colors text-sm font-medium"
                >
                  <div className="w-8 h-8 bg-[#f5f3ef] rounded-full flex items-center justify-center">
                    <Phone size={14} className="text-[#C6AC5E]" />
                  </div>
                  {club.contactInfo.phone}
                </a>
              )}
              {club.contactInfo.email && (
                <a
                  href={`mailto:${club.contactInfo.email}`}
                  className="flex items-center gap-3 text-[#0a1628] hover:text-[#C6AC5E] transition-colors text-sm font-medium"
                >
                  <div className="w-8 h-8 bg-[#f5f3ef] rounded-full flex items-center justify-center">
                    <Mail size={14} className="text-[#C6AC5E]" />
                  </div>
                  {club.contactInfo.email}
                </a>
              )}
              {club.contactInfo.address && (
                <div className="flex items-start gap-3 text-sm text-[#555]">
                  <div className="w-8 h-8 bg-[#f5f3ef] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={14} className="text-[#C6AC5E]" />
                  </div>
                  {club.contactInfo.address}
                </div>
              )}
            </div>
          )}

          {club.socialLinks?.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
              <p className="text-[#C6AC5E] text-[10px] font-bold uppercase tracking-widest mb-4">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-2">
                {club.socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#0a1628] text-white text-xs font-semibold rounded-full hover:bg-[#C6AC5E] hover:text-black transition-all"
                  >
                    <Globe size={12} /> {link.platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────── */}
      {club.benefits?.length > 0 && (
        <section className="bg-[#0a1628] py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="text-center mb-14">
              <p className="text-[#C6AC5E] text-xs font-bold uppercase tracking-[0.25em] mb-3">
                Why Join
              </p>
              <h2 className="text-4xl md:text-5xl font-serif text-white">
                Exceptional Member Benefits
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {club.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                >
                  {benefit.icon && (
                    <span className="text-3xl mb-4 block">{benefit.icon}</span>
                  )}
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-[#C6AC5E] mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-semibold text-white mb-2 text-lg">
                        {benefit.title}
                      </h3>
                      {benefit.description && (
                        <p className="text-white/50 text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── REQUEST INFORMATION ──────────────────────────────── */}
      <section id="request-info" className="py-24 bg-[#f5f3ef]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy */}
          <div>
            <p className="text-[#C6AC5E] text-xs font-bold uppercase tracking-[0.25em] mb-4">
              Ownership Enquiry
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#0a1628] font-bold mb-6 leading-tight">
              Request
              <br />
              Information
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed mb-10 max-w-md">
              Discover what it means to own a piece of {club.clubTitle}. Fill
              out the form and one of our ownership advisors will be in touch.
            </p>

            {/* What to expect list */}
            <ul className="space-y-5">
              {[
                {
                  title: "Personalised Consultation",
                  desc: "Talk through options with a dedicated ownership advisor.",
                },
                {
                  title: "No Obligation",
                  desc: "Learn everything before making any commitment.",
                },
                {
                  title: "Exclusive Owner Benefits",
                  desc: "Hear about the full range of perks available to members.",
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#C6AC5E]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={16} className="text-[#C6AC5E]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0a1628]">{item.title}</p>
                    <p className="text-stone-400 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Hero image */}
            {club.clubLogo?.[0]?.url && (
              <div className="mt-12 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={club.clubLogo[0].url}
                  alt={club.clubTitle}
                  className="w-full h-56 object-cover"
                />
              </div>
            )}
          </div>

          {/* Right — form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-stone-100">
            {formSent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-[#C6AC5E]/15 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} className="text-[#C6AC5E]" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#0a1628] mb-3">
                  Thank You!
                </h3>
                <p className="text-stone-500 max-w-xs">
                  We&apos;ve received your request. An ownership advisor from{" "}
                  <strong>{club.clubTitle}</strong> will contact you within 1–2
                  business days.
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  className="mt-8 text-sm text-[#C6AC5E] font-semibold underline underline-offset-4 hover:opacity-80 transition"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-bold text-[#0a1628] mb-1">
                    Get in Touch
                  </h3>
                  <p className="text-stone-400 text-sm">
                    All fields marked * are required
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                        First Name *
                      </label>
                      <input
                        required
                        name="firstName"
                        value={form.firstName}
                        onChange={handleFormChange}
                        placeholder="John"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#f5f3ef] text-[#0a1628] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C6AC5E]/40 focus:border-[#C6AC5E] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                        Last Name *
                      </label>
                      <input
                        required
                        name="lastName"
                        value={form.lastName}
                        onChange={handleFormChange}
                        placeholder="Smith"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#f5f3ef] text-[#0a1628] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C6AC5E]/40 focus:border-[#C6AC5E] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#f5f3ef] text-[#0a1628] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C6AC5E]/40 focus:border-[#C6AC5E] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleFormChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#f5f3ef] text-[#0a1628] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C6AC5E]/40 focus:border-[#C6AC5E] transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                        Guests
                      </label>
                      <div className="relative">
                        <select
                          name="guests"
                          value={form.guests}
                          onChange={handleFormChange}
                          className="w-full appearance-none px-4 py-3 pr-8 rounded-xl border border-stone-200 bg-[#f5f3ef] text-[#0a1628] text-sm focus:outline-none focus:ring-2 focus:ring-[#C6AC5E]/40 focus:border-[#C6AC5E] transition"
                        >
                          {["1", "2", "3", "4", "5", "6+"].map((n) => (
                            <option key={n} value={n}>
                              {n} Guest{n !== "1" ? "s" : ""}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                        Interest
                      </label>
                      <div className="relative">
                        <select
                          name="interest"
                          value={form.interest}
                          onChange={handleFormChange}
                          className="w-full appearance-none px-4 py-3 pr-8 rounded-xl border border-stone-200 bg-[#f5f3ef] text-[#0a1628] text-sm focus:outline-none focus:ring-2 focus:ring-[#C6AC5E]/40 focus:border-[#C6AC5E] transition"
                        >
                          <option value="">Select...</option>
                          <option value="ownership">Ownership</option>
                          <option value="rental">Rental</option>
                          <option value="membership">Membership</option>
                          <option value="general">General Info</option>
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>

                  {locations.length > 0 && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                        Preferred Location
                      </label>
                      <div className="relative">
                        <select
                          name="preferredLocation"
                          value={form.preferredLocation}
                          onChange={handleFormChange}
                          className="w-full appearance-none px-4 py-3 pr-8 rounded-xl border border-stone-200 bg-[#f5f3ef] text-[#0a1628] text-sm focus:outline-none focus:ring-2 focus:ring-[#C6AC5E]/40 focus:border-[#C6AC5E] transition"
                        >
                          <option value="">Any Location</option>
                          {locations.map((loc, i) => (
                            <option key={i} value={loc.title}>
                              {loc.title}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleFormChange}
                      placeholder="Tell us what you're looking for..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#f5f3ef] text-[#0a1628] text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C6AC5E]/40 focus:border-[#C6AC5E] transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-3 bg-[#0a1628] hover:bg-[#C6AC5E] text-white hover:text-black py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 disabled:opacity-60"
                  >
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send size={16} />
                        Submit Request
                      </>
                    )}
                  </button>

                  <p className="text-xs text-stone-400 text-center leading-relaxed">
                    By submitting, you agree to be contacted by {club.clubTitle}{" "}
                    regarding your enquiry. No spam, ever.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <img
          src={heroImage}
          alt="CTA"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a1628]/88" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <p className="text-[#C6AC5E] text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Ready to Explore?
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-white font-bold mb-6">
            Start Your Journey with {club.clubTitle}
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#request-info"
              className="flex items-center gap-2 bg-[#C6AC5E] text-black px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all"
            >
              Request Info <ArrowRight size={16} />
            </a>
            <Link
              href="/clubs"
              className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all"
            >
              View All Clubs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
