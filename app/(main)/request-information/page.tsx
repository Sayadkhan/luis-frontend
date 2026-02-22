"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCreateInquiryMutation } from "@/redux/features/blog/blogApi";
import toast, { Toaster } from "react-hot-toast";
import { CheckCircle, Phone, Mail, MapPin, ChevronRight } from "lucide-react";

const LOCATIONS = [
  "Caribbean",
  "Mexico",
  "Hawaii",
  "Europe",
  "Asia Pacific",
  "United States",
  "Costa Rica",
  "No Preference",
];

const INTERESTS = [
  "Beach & Ocean",
  "Mountains & Skiing",
  "City & Culture",
  "Golf",
  "Adventure & Outdoor",
  "Spa & Wellness",
  "Family Resorts",
  "Luxury Villas",
];

const HOW_DID_YOU_HEAR = [
  "Search Engine (Google, Bing)",
  "Social Media",
  "Friend or Family Referral",
  "Advertisement",
  "Existing Member",
  "Event or Presentation",
  "Other",
];

const GUEST_OPTIONS = ["1", "2", "3", "4", "5", "6+"];

const inputCls =
  "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C6AC5E] focus:border-transparent transition text-sm";
const labelCls =
  "block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5";
const selectCls =
  "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C6AC5E] focus:border-transparent transition text-sm appearance-none cursor-pointer";

export default function RequestInformationPage() {
  const [createInquiry, { isLoading }] = useCreateInquiryMutation();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    guests: "",
    interest: "",
    preferredLocation: "",
    howDidYouHear: "",
    message: "",
    reason: "learn",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.email.trim()) {
      toast.error("First name and email are required.");
      return;
    }
    try {
      await createInquiry({
        ...form,
        name: `${form.firstName} ${form.lastName}`.trim(),
        formType: "request-information",
      }).unwrap();
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <main className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4 py-24">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-10 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Thank You, {form.firstName}!
          </h1>
          <p className="text-gray-500 mb-2 leading-relaxed">
            Your request has been received. One of our vacation specialists will
            reach out to you shortly at{" "}
            <span className="text-[#C6AC5E] font-semibold">{form.email}</span>.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            In the meantime, feel free to explore our available experiences.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-[#C6AC5E] hover:bg-[#b09a50] text-white font-bold rounded-lg transition-colors text-sm uppercase tracking-wide"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <Toaster position="top-right" />

      {/* ── Hero ── */}
      <div className="relative h-[420px] md:h-[520px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury resort pool"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/75" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-[#C6AC5E] text-[11px] font-bold tracking-[5px] uppercase mb-4">
            Endless Vacations Hub
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight mb-4">
            Request Information
          </h1>
          <div className="w-16 h-[2px] bg-[#C6AC5E] mb-5" />
          <p className="text-white/75 text-base md:text-lg max-w-xl leading-relaxed">
            Fill out the form below and one of our vacation specialists will
            contact you shortly.
          </p>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#C6AC5E] transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-gray-800 font-semibold">
            Request Information
          </span>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
        {/* ── Form card ── */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          {/* Card header */}
          <div className="bg-[#0a1628] px-8 py-6">
            <h2 className="text-white text-xl font-semibold tracking-wide">
              Your Information
            </h2>
            <p className="text-white/60 text-sm mt-1">
              All fields marked * are required
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-7">
            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>First Name *</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  placeholder="First Name"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Contact row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Email Address *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Location row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Country</label>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Your Country"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>State / Province</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State or Province"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Preferences row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className={labelCls}>Number of Guests</label>
                <div className="relative">
                  <select
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    className={selectCls}
                  >
                    <option value="">Select</option>
                    {GUEST_OPTIONS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ▾
                  </div>
                </div>
              </div>
              <div>
                <label className={labelCls}>Travel Interest</label>
                <div className="relative">
                  <select
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className={selectCls}
                  >
                    <option value="">Select Interest</option>
                    {INTERESTS.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ▾
                  </div>
                </div>
              </div>
              <div>
                <label className={labelCls}>Preferred Destination</label>
                <div className="relative">
                  <select
                    name="preferredLocation"
                    value={form.preferredLocation}
                    onChange={handleChange}
                    className={selectCls}
                  >
                    <option value="">Select Location</option>
                    {LOCATIONS.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ▾
                  </div>
                </div>
              </div>
            </div>

            {/* Reason radios */}
            <div>
              <label className={labelCls}>Reason for Inquiry</label>
              <div className="space-y-3 mt-1">
                {[
                  {
                    value: "learn",
                    label: "I'd like to learn more about timeshare ownership.",
                  },
                  {
                    value: "owner-services",
                    label:
                      "I'm an existing Owner who needs Owner Services assistance.",
                  },
                  {
                    value: "vacation-portfolio",
                    label:
                      "I'm an existing Owner who wants to add to my vacation portfolio.",
                  },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={opt.value}
                      checked={form.reason === opt.value}
                      onChange={handleChange}
                      className="mt-0.5 accent-[#C6AC5E] w-4 h-4 flex-shrink-0"
                    />
                    <span className="group-hover:text-gray-900 transition-colors leading-snug">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* How did you hear */}
            <div>
              <label className={labelCls}>How did you hear about us?</label>
              <div className="relative">
                <select
                  name="howDidYouHear"
                  value={form.howDidYouHear}
                  onChange={handleChange}
                  className={selectCls}
                >
                  <option value="">Select an option</option>
                  {HOW_DID_YOU_HEAR.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  ▾
                </div>
              </div>
            </div>

            {/* Additional notes */}
            <div>
              <label className={labelCls}>Additional Notes (optional)</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Any specific requests, questions, or information you'd like to share..."
                className={`${inputCls} resize-none`}
              />
            </div>

            {/* Privacy notice */}
            <p className="text-xs text-gray-400 leading-relaxed">
              By submitting this form, you consent to being contacted by an
              Endless Vacations Hub specialist regarding your inquiry. We respect
              your privacy and will never share your information with third
              parties.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#C6AC5E] hover:bg-[#b09a50] disabled:opacity-60 text-white font-bold text-sm uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Submit Request"
              )}
            </button>
          </form>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-6">
          {/* Why us */}
          <div className="bg-[#0a1628] rounded-2xl p-7 text-white">
            <h3 className="text-lg font-semibold mb-1">Why Choose Us?</h3>
            <div className="w-10 h-[2px] bg-[#C6AC5E] mb-5" />
            <ul className="space-y-4 text-sm text-white/80">
              {[
                "Access to 4,000+ resort destinations worldwide",
                "Flexible vacation ownership options",
                "Dedicated member services team",
                "Exclusive member-only pricing & upgrades",
                "Exchange programs with leading vacation networks",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#C6AC5E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-[#C6AC5E]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="bg-white rounded-2xl border border-gray-200 p-7 space-y-5">
            <h3 className="text-base font-bold text-gray-900 uppercase tracking-widest text-xs text-gray-500">
              Contact Us Directly
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-9 h-9 rounded-full bg-[#C6AC5E]/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#C6AC5E]" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                    Phone
                  </p>
                  <p className="font-semibold text-gray-900">
                    +1 (800) 555-0199
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-9 h-9 rounded-full bg-[#C6AC5E]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#C6AC5E]" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                    Email
                  </p>
                  <p className="font-semibold text-gray-900">
                    info@endlessvacationshub.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-9 h-9 rounded-full bg-[#C6AC5E]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#C6AC5E]" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                    Hours
                  </p>
                  <p className="font-semibold text-gray-900">
                    Mon–Fri, 9am – 6pm EST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Destinations preview */}
          <div className="rounded-2xl overflow-hidden relative h-48">
            <Image
              src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop"
              alt="Resort destination"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-[10px] text-[#C6AC5E] font-bold uppercase tracking-widest mb-1">
                Featured
              </p>
              <p className="text-sm font-semibold leading-tight">
                4,000+ Resorts
                <br />
                <span className="font-light opacity-80">Worldwide</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
