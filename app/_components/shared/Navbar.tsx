"use client";

import { useEffect, useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";
import "@/app/globals.css";
import Link from "next/link";
import { FiChevronDown, FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import Image from "next/image";
import logo from "@/public/img/logo.png";
import { usePathname } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";

const NavbarMenu = [
  { title: "Home", href: "/" },
  {
    title: "Ownership",
    href: "#ownership",
    dropdown: true,
    submenu: [
      { title: "Why Timeshare?", href: "/why-timeshare" },
      { title: "Vacation Club Brands", href: "/vacation-club-brands" },
      { title: "Referral Program", href: "#referral-program" },
    ],
  },
  {
    title: "Experiences",
    href: "#experiences",
    dropdown: true,
    submenu: [
      { title: "Accommodations", href: "/accommodations" },
      { title: "Excursions", href: "#excursions" },
      { title: "Flights", href: "#flights" },
      { title: "Bundle (API-s)", href: "#bundle" },
    ],
  },
  { title: "Contact", href: "/#contact" },
  { title: "FAQ", href: "/#faq" },
  { title: "Request Info", href: "/request-information", highlight: true },
];

const ALWAYS_SOLID = [
  "/why-timeshare",
  "/vacation-club-brands",
  "/became-a-member",
  "/request-information",
];

const Navbar = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");

  const alwaysSolid = ALWAYS_SOLID.includes(pathname);

  useEffect(() => {
    if (alwaysSolid) return;

    const onScroll = () => setScrolled(window.scrollY > 50);
    // Set initial state
    setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, alwaysSolid]);

  // Reset scroll state when route changes
  useEffect(() => {
    if (!alwaysSolid) {
      setScrolled(window.scrollY > 50);
    }
  }, [pathname]);

  const isSolid = alwaysSolid || scrolled;

  const handleDropdownClick = (title: string) => {
    setOpenDropdown(openDropdown === title ? "" : title);
  };

  return (
    <section>
      {/* Top announcement strip — homepage only */}
      {pathname === "/" && (
        <div className="w-full py-4 text-white flex items-center justify-center bg-[#0a1628]">
          <p className="flex items-center gap-1 text-[14px]">
            Limited villas available for december <GoDotFill size={10} /> Book
            Early
          </p>
        </div>
      )}

      {/* Navbar */}
      <nav
        className={`
          z-50 w-full flex items-center justify-between text-white
          transition-[background-color,padding,box-shadow] duration-300 ease-in-out
          ${isSolid
            ? "fixed top-0 left-0 bg-black shadow-lg px-4 py-2"
            : "fixed top-0 left-0 bg-transparent px-8 py-4"
          }
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <Image width={120} height={15} src={logo} alt="logo" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-[16px] font-medium">
          {NavbarMenu.map((item, i) => (
              <li key={i} className="relative group">
                <Link
                  href={item.href}
                  className={
                    (item as any).highlight
                      ? "flex items-center gap-1 cursor-pointer px-4 py-2 rounded-lg bg-[#C6AC5E] hover:bg-[#b09a50] text-white font-bold text-sm uppercase tracking-wide transition-colors"
                      : "flex items-center gap-1 cursor-pointer hover:text-gray-300 transition-colors"
                  }
                >
                  {item.title}
                  {item.dropdown && <FiChevronDown size={16} />}
                </Link>

              {item.dropdown && item.submenu && (
                <ul className="absolute left-0 top-full mt-3 bg-white text-[#0a1628] shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[200px] py-3">
                  {item.submenu.map((sub, idx) => (
                    <li key={idx}>
                      <Link
                        href={sub.href}
                        className="block px-4 py-2 hover:bg-gray-100 text-[15px] transition-colors"
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          {/* Theme Toggle */}
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </li>
        </ul>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FiSun size={22} /> : <FiMoon size={22} />}
          </button>
          <button className="text-white" onClick={() => setOpen(true)}>
            <FiMenu size={26} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[75%] bg-[#0a1628] z-[999] text-white p-6 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button className="mb-6 text-white" onClick={() => setOpen(false)}>
          <FiX size={28} />
        </button>

        <ul className="flex flex-col gap-4">
          {NavbarMenu.map((item, i) => (
            <li key={i}>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => item.dropdown && handleDropdownClick(item.title)}
              >
                <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={(item as any).highlight ? "font-bold text-[#C6AC5E]" : ""}
                  >
                    {item.title}
                  </Link>
                {item.dropdown && (
                  <FiChevronDown
                    className={`transition-transform duration-300 ${
                      openDropdown === item.title ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

              {item.dropdown && openDropdown === item.title && (
                <ul className="ml-4 mt-2 flex flex-col gap-2 border-l pl-4 border-gray-500">
                  {item.submenu?.map((sub, idx) => (
                    <li key={idx}>
                      <Link
                        href={sub.href}
                        onClick={() => setOpen(false)}
                        className="text-sm opacity-90 hover:opacity-100 transition-opacity"
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
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[998] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </section>
  );
};

export default Navbar;
