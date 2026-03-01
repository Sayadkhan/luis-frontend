"use client";

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
import logo from "@/public/img/logo.png";
import { useUi } from "@/providers/UiProvider";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { uiData } = useUi();

  const instaImages = [
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=150&q=80",
  ];

  return (
    <footer className="bg-gray-100 dark:bg-[#0a1628] text-gray-900 dark:text-white pt-20 pb-10 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-[1800px] mx-auto px-6 relative z-10">
        {/* CTA Banner */}
        <div className="bg-[#C6AC5E] rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl shadow-[#C6AC5E]/20 mb-20">
          <div className="lg:w-1/2">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              Unlock Exclusive Travel Deals
            </h3>
            <p className="text-sm md:text-base text-white/90 font-medium">
              Join 50,000+ travelers with Endless Vacations. Get up to 50% off.
            </p>
          </div>

          <form className="w-full lg:w-1/2 relative">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full py-4 pl-6 pr-36 rounded-full border transition-all focus:outline-none
              bg-white dark:bg-black/20
              border-gray-300 dark:border-white/20
              text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-white/60
              focus:bg-gray-50 dark:focus:bg-black/30"
            />
            <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-white text-[#C6AC5E] hover:bg-slate-100 font-bold px-6 rounded-full flex items-center gap-2 transition">
              Subscribe <Send size={16} />
            </button>
          </form>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 border-b border-gray-300 dark:border-white/10 pb-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-4 space-y-6">
            <Image
              width={120}
              height={20}
              src={uiData?.logo?.url || logo}
              alt="logo"
              className="object-contain"
            />
            <p className="text-gray-600 dark:text-white/80 leading-relaxed text-sm md:text-base">
              Crafting unforgettable journeys since 2010 — premium timeshares,
              luxury resorts & curated experiences around the globe.
            </p>

            <div className="space-y-3 pt-2 text-sm md:text-base">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#C6AC5E] mt-1" size={18} />
                <span>
                  123 Paradise Blvd, Suite 400
                  <br />
                  Miami, FL 33101
                </span>
              </div>

              <a
                href={`tel:${uiData?.whatsapp || "888-204-0407"}`}
                className="flex items-center gap-3 hover:text-[#C6AC5E] transition"
              >
                <Phone size={18} className="text-[#C6AC5E]" />
                {uiData?.whatsapp || "888-204-0407"}
              </a>

              <a
                href={`mailto:${uiData?.email || "hello@endlessvacations.com"}`}
                className="flex items-center gap-3 hover:text-[#C6AC5E] transition"
              >
                <Mail size={18} className="text-[#C6AC5E]" />
                {uiData?.email || "hello@endlessvacations.com"}
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div className="lg:col-span-2">
            <h4 className="font-bold uppercase tracking-wider mb-6 text-sm md:text-base lg:text-lg">
              Destinations
            </h4>
            <ul className="space-y-4 text-xs md:text-sm">
              <li>
                <Link href="#">Maldives</Link>
              </li>
              <li>
                <Link href="#">Bora Bora</Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-2">
                  Switzerland
                  <span className="text-[10px] bg-[#C6AC5E] px-1.5 py-0.5 rounded text-white font-bold">
                    HOT
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#">Dubai</Link>
              </li>
              <li>
                <Link href="#">Santorini</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="font-bold uppercase tracking-wider mb-6 text-sm md:text-base lg:text-lg">
              Company
            </h4>
            <ul className="space-y-4 text-xs md:text-sm">
              <li>
                <Link href="#">About Us</Link>
              </li>
              <li>
                <Link href="#">Careers</Link>
              </li>
              <li>
                <Link href="#">Blog</Link>
              </li>
              <li>
                <Link href="#">Press</Link>
              </li>
              <li>
                <Link href="#">Partners</Link>
              </li>
            </ul>
          </div>

          {/* Instagram */}
          <div className="lg:col-span-4">
            <h4 className="font-bold uppercase tracking-wider mb-6 text-sm md:text-base lg:text-lg">
              On The Gram
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {instaImages.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer bg-gray-200 dark:bg-white/10"
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-105"
                    alt="Instagram"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                    <Instagram size={20} />
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-[#C6AC5E] mt-4 hover:text-gray-900 dark:hover:text-white transition"
            >
              View Profile <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-300 dark:border-white/10 pt-8">
          <p className="text-gray-500 dark:text-white/60 text-xs md:text-sm">
            © {currentYear} Endless Vacations Inc. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs md:text-sm">
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

          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition
                bg-gray-200 dark:bg-white/10
                hover:bg-[#C6AC5E] hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
