import React from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Send,
} from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darkBlue text-white font-sans pt-20 pb-10 relative overflow-hidden">
      {/* <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-center bg-no-repeat bg-cover"></div> */}

      <div className="max-w-[1800px] mx-auto px-6 relative z-10">
        <div className="bg-[#C6AC5E] rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl shadow-[#C6AC5E]/20 mb-20 transform -translate-y-12 md:-translate-y-0">
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-bold text-white mb-2">
              Unlock Exclusive Travel Deals
            </h3>
            <p className="text-white/90 font-medium">
              Join 50,000+ travelers with Endless Vacations. Get up to 50% off.
            </p>
          </div>

          <div className="lg:w-1/2 w-full">
            <form className="relative w-full">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full py-4 pl-6 pr-36 rounded-full bg-black/20 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:bg-black/30 focus:border-white transition-all backdrop-blur-sm"
              />
              {/* Button Text changed to Gold (#C6AC5E) */}
              <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-white text-[#C6AC5E] hover:bg-slate-100 font-bold px-6 rounded-full transition-colors flex items-center gap-2">
                Subscribe <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* ==========================
            MIDDLE SECTION: Links Grid
        ========================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 border-b border-white/10 pb-12">
          {/* Column 1: Brand & Contact (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo Text: White & Gold */}
            <div className="flex items-center gap-2 text-2xl font-semibold">
              <Image width={120} height={20} src={logo} alt="logo" />
            </div>
            <p className="text-white/80 leading-relaxed pr-4 font-light">
              Crafting unforgettable journeys since 2010. We specialize in
              premium timeshares, luxury resorts, and curated experiences around
              the globe.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#C6AC5E] mt-1 shrink-0" size={18} />
                <span className="text-white/90">
                  123 Paradise Blvd, Suite 400
                  <br />
                  Miami, FL 33101
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-[#C6AC5E] shrink-0" size={18} />
                <a
                  href="tel:888-204-0407"
                  className="text-white/90 hover:text-[#C6AC5E] transition-colors"
                >
                  888-204-0407
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-[#C6AC5E] shrink-0" size={18} />
                <a
                  href="mailto:hello@endlessvacations.com"
                  className="text-white/90 hover:text-[#C6AC5E] transition-colors"
                >
                  hello@endlessvacations.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Destinations (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">
              Destinations
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-white/80 hover:text-[#C6AC5E] transition-colors"
                >
                  Maldives
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/80 hover:text-[#C6AC5E] transition-colors"
                >
                  Bora Bora
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/80 hover:text-[#C6AC5E] transition-colors flex items-center gap-2"
                >
                  Switzerland{" "}
                  <span className="text-[10px] bg-[#C6AC5E] text-white px-1.5 py-0.5 rounded font-bold">
                    HOT
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/80 hover:text-[#C6AC5E] transition-colors"
                >
                  Dubai
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/80 hover:text-[#C6AC5E] transition-colors"
                >
                  Santorini
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-white/80 hover:text-[#C6AC5E] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/80 hover:text-[#C6AC5E] transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/80 hover:text-[#C6AC5E] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/80 hover:text-[#C6AC5E] transition-colors"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/80 hover:text-[#C6AC5E] transition-colors"
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Instagram / Gallery (Span 4) */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">
              On The Gram
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group bg-white/10"
                >
                  <img
                    src={`https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=150&q=80`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    alt="Instagram shot"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Instagram size={20} />
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-[#C6AC5E] mt-4 hover:text-white font-medium transition-colors"
            >
              View Profile <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* ==========================
          Legal & Social
        ========================== */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8">
          {/* Copyright */}
          <div className="text-sm text-white/60">
            &copy; {currentYear} Endless Vacations Inc. All rights reserved.
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-sm font-medium text-white/80">
            <Link href="#" className="hover:text-[#C6AC5E] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#C6AC5E] transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-[#C6AC5E] transition-colors">
              Cookies
            </Link>
          </div>

          {/* Social Icons  */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C6AC5E] hover:text-white transition-all duration-300 text-white"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C6AC5E] hover:text-white transition-all duration-300 text-white"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C6AC5E] hover:text-white transition-all duration-300 text-white"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C6AC5E] hover:text-white transition-all duration-300 text-white"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
