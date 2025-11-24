"use client";
import React from "react";
import { GoDotFill } from "react-icons/go";
import "@/app/globals.css";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import logo from "@/public/img/logo.png";
import { usePathname } from "next/navigation";

const NavbarMenu = [
  { title: "Home", href: "/" },

  {
    title: "Ownership",
    href: "#ownership",
    dropdown: true,
    submenu: [
      { title: "Why Timeshare?", href: "why-timeshare" },
      { title: "Vacation Club Brands", href: "vacation-club-brands" },
      { title: "Referral Program", href: "#referral-program" },
    ],
  },

  {
    title: "Experiences",
    href: "#experiences",
    dropdown: true,
    submenu: [
      { title: "Accommodations", href: "#accommodations" },
      { title: "Excursions", href: "#excursions" },
      { title: "Flights", href: "#flights" },
      { title: "Bundle (API-s)", href: "#bundle" },
    ],
  },

  { title: "Contact", href: "#contact" },
  { title: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const location = usePathname();
 

  const handleScroll = (e: any, href: any) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);

      if (elem) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = elem.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section className="">
      {/* navbar top */}
      {location === "/" && (
        <div className="w-full py-4 text-white flex items-center justify-center bg-darkBlue ">
          <p className="flex items-center gap-1 text-[14px]">
            Limited villas available for december <GoDotFill size={10} /> Book
            Early
          </p>
        </div>
      )}

      {/* navbar */}
      <nav
        className={`absolute z-50 w-full text-white px-8 py-4 flex items-center justify-between ${
          location === "/why-timeshare" || location === "/vacation-club-brands"
            ? "bg-darkBlue"
            : ""
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <Image width={120} height={15} src={logo} alt="logo" />
        </div>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-6 text-[16px] font-medium">
          {NavbarMenu.map((item, i) => (
            <li key={i} className="relative group">
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="flex items-center gap-1 cursor-pointer hover:text-gray-200"
                >
                  {item.title}

                  {item.dropdown && <FiChevronDown size={16} />}
                </Link>
              ) : (
                <button className="flex items-center gap-1 cursor-pointer hover:text-gray-200">
                  {item.title}
                  {item.dropdown && <FiChevronDown size={16} />}
                </button>
              )}

              {/* Submenu */}
              {item.dropdown && item.submenu && (
                <ul
                  className="
                    absolute left-0 top-full mt-3 
                    bg-white text-darkBlue shadow-lg rounded-lg 
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                    transition-all duration-300 
                    min-w-[200px] py-3
                  "
                >
                  {item.submenu.map((sub, idx) => (
                    <li key={idx}>
                      <Link
                        href={sub.href}
                        onClick={(e) => handleScroll(e, sub.href)}
                        className="block px-4 py-2 hover:bg-gray-100 text-[15px]"
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
