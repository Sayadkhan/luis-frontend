"use client";
import React from "react";
import {
    Menu,
    Home,
    Users as UsersIcon,
    ChevronLeft,
    ChevronRight,
    LogOut,
    MapPin,
    Settings,
    BarChart3,
    FileText,
    Calendar,
    Bell,
    HelpCircle,
    Shield,
    BookOpen,
    Inbox,
  } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useTheme } from "@/providers/ThemeProvider";
import ThemeToggle from "../shared/ThemeToggle";
import { useGetAllInquiriesQuery } from "@/redux/features/blog/blogApi";

interface SidePanelProps {
  selected: string;
  setSelected: (name: string) => void;
}

export default function SidePanel({ selected, setSelected }: SidePanelProps) {
  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = React.useState(false);

  const { data: inquiryData } = useGetAllInquiriesQuery(undefined);
  const allInquiries: any[] = inquiryData?.data?.data || inquiryData?.data || [];
  const unreadCount = allInquiries.filter((i: any) => i.status === "new").length;

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Theme-based styling functions
  const getPanelBg = () =>
    theme === "light"
      ? "bg-gradient-to-b from-white via-gray-50 to-white"
      : "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900";

  const getGlassEffect = () =>
    theme === "light"
      ? "bg-white/80 backdrop-blur-lg border-white/40 shadow-xl"
      : "bg-gray-900/80 backdrop-blur-lg border-gray-700/40 shadow-xl shadow-black/30";

  const getBorderColor = () =>
    theme === "light" ? "border-gray-200/60" : "border-gray-700/60";

  const getTextColor = (
    type: "primary" | "secondary" | "muted" = "primary"
  ) => {
    const colors = {
      primary: theme === "light" ? "text-gray-800" : "text-gray-100",
      secondary: theme === "light" ? "text-gray-600" : "text-gray-300",
      muted: theme === "light" ? "text-gray-500" : "text-gray-400",
    };
    return colors[type];
  };

  const getMenuItemClass = (isActive: boolean) => {
    const base = `flex w-full text-left items-center gap-3 p-3 rounded-xl mx-2 transition-all duration-300`;

    if (isActive) {
      return theme === "light"
        ? `${base} bg-linear-to-r from-blue-50 to-blue-100/50 text-blue-600 font-semibold border-l-4 border-blue-500 shadow-sm`
        : `${base} bg-linear-to-r from-blue-900/30 to-blue-800/20 text-blue-300 font-semibold border-l-4 border-blue-400 shadow-sm`;
    }

    return theme === "light"
      ? `${base} hover:bg-gray-100/80 text-gray-600 hover:text-gray-900 hover:translate-x-1`
      : `${base} hover:bg-gray-800/80 text-gray-400 hover:text-gray-200 hover:translate-x-1`;
  };

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} /> },
    // { name: "Users", icon: <UsersIcon size={20} /> },
    { name: "Clubs", icon: <MapPin size={20} /> },
    { name: "Blog", icon: <BookOpen size={20} /> },
    { name: "Inquiries", icon: <Inbox size={20} />, badge: unreadCount > 0 ? unreadCount : undefined },
    // { name: "Spots", icon: <MapPin size={20} /> },
    { name: "Analytics", icon: <BarChart3 size={20} /> },
    { name: "Content", icon: <FileText size={20} /> },
    { name: "Calendar", icon: <Calendar size={20} /> },
    { name: "UiSettings", icon: <Settings size={20} /> },
    { name: "Security", icon: <Shield size={20} /> },
  ];

  const bottomMenuItems = [
    { name: "Notifications", icon: <Bell size={20} /> },
    { name: "Help", icon: <HelpCircle size={20} /> },
    { name: "Logout", icon: <LogOut size={20} /> },
  ];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-16 ${getGlassEffect()} border-b ${getBorderColor()} flex items-center px-4 z-50`}
      >
        <button
          onClick={() => setMobileOpen(true)}
          className={`p-2 rounded-lg ${
            theme === "light"
              ? "bg-gray-100 hover:bg-gray-200"
              : "bg-gray-800 hover:bg-gray-700"
          } transition-all duration-200`}
        >
          <Menu size={22} className={getTextColor()} />
        </button>
        <div className="ml-4 flex-1">
          <h1 className={`text-lg font-bold ${getTextColor()}`}>
            Admin Dashboard
          </h1>
          <p className={`text-xs ${getTextColor("muted")}`}>
            Professional Management
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.div
        className={`
          sticky top-0 left-0 h-full z-50
          flex flex-col transition-all duration-300
          ${getGlassEffect()} border-r ${getBorderColor()}
          ${open ? "md:w-72" : "md:w-20"}
          w-72
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        animate={isMobile ? (mobileOpen ? { x: 0 } : { x: -288 }) : { x: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {/* SIDEBAR HEADER */}
        <div className={`p-4 border-b ${getBorderColor()}`}>
          <div className="flex items-center justify-between">
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3"
              >
                <div
                  className={`p-2 rounded-lg ${
                    theme === "light"
                      ? "bg-linear-to-br from-blue-500 to-purple-600"
                      : "bg-linear-to-br from-blue-600 to-purple-700"
                  }`}
                >
                  <Home className="w-6 h-6 text-white" />
                </div>
                {/* <div>
                  <h2 className={`font-bold ${getTextColor()} text-lg`}>
                    SpotAdmin
                  </h2>
                  <p className={`text-xs ${getTextColor("muted")}`}>v2.0.1</p>
                </div> */}
              </motion.div>
            )}

            {/* COLLAPSE BUTTON */}
            <button
              onClick={() => {
                if (isMobile) {
                  setMobileOpen(false);
                } else {
                  setOpen(!open);
                }
              }}
              className={`p-2 rounded-lg ${
                theme === "light" ? "hover:bg-gray-100" : "hover:bg-gray-800"
              } transition-all duration-200`}
            >
              {isMobile ? (
                <ChevronLeft className={`w-5 h-5 ${getTextColor()}`} />
              ) : open ? (
                <ChevronLeft className={`w-5 h-5 ${getTextColor()}`} />
              ) : (
                <ChevronRight className={`w-5 h-5 ${getTextColor()}`} />
              )}
            </button>
          </div>

          {/* USER PROFILE - Only show when expanded */}
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-3 rounded-xl ${
                theme === "light" ? "bg-gray-50/50" : "bg-gray-800/30"
              } border ${getBorderColor()}`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${getTextColor()} text-sm`}>
                    Admin User
                  </h3>
                  <p className={`text-xs ${getTextColor("muted")}`}>
                    Super Admin
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* MAIN MENU */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            <p
              className={`text-xs font-semibold ${getTextColor(
                "muted"
              )} uppercase tracking-wider mb-3 px-3`}
            >
              {open ? "Navigation" : ""}
            </p>

              {menuItems.map((item) => (
                <motion.button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setSelected(item.name);
                    setMobileOpen(false);
                  }}
                  className={getMenuItemClass(selected === item.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`flex items-center justify-center relative ${
                      selected === item.name
                        ? theme === "light"
                          ? "text-blue-500"
                          : "text-blue-400"
                        : getTextColor("secondary")
                    }`}
                  >
                    {item.icon}
                    {!open && (item as any).badge && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {(item as any).badge}
                      </span>
                    )}
                  </div>
                  {open && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm flex-1"
                    >
                      {item.name}
                    </motion.span>
                  )}
                  {open && (item as any).badge && (
                    <span className="ml-auto bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                      {(item as any).badge}
                    </span>
                  )}
                  {selected === item.name && open && !(item as any).badge && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`ml-auto w-2 h-2 rounded-full ${
                        theme === "light" ? "bg-blue-500" : "bg-blue-400"
                      }`}
                    />
                  )}
                </motion.button>
              ))}
          </div>

          {/* THEME TOGGLE */}
          <div
            className={`mt-8 p-3 ${
              open ? "flex items-center justify-between" : "flex justify-center"
            }`}
          >
            {open && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-sm ${getTextColor("secondary")}`}
              >
                Theme
              </motion.span>
            )}
            <ThemeToggle />
          </div>
        </nav>

        {/* BOTTOM MENU */}
        <div className={`p-4 border-t ${getBorderColor()}`}>
          {open && (
            <p
              className={`text-xs font-semibold ${getTextColor(
                "muted"
              )} uppercase tracking-wider mb-3 px-3`}
            >
              Quick Actions
            </p>
          )}

          <div className="space-y-1">
            {bottomMenuItems.map((item) => (
              <motion.button
                key={item.name}
                type="button"
                onClick={() => {
                  if (item.name === "Logout") {
                    if (confirm("Are you sure you want to logout?")) {
                      console.log("Logging out...");
                    }
                  } else {
                    setSelected(item.name);
                  }
                  setMobileOpen(false);
                }}
                className={`flex w-full text-left items-center gap-3 p-3 rounded-xl mx-2 transition-all duration-300 ${
                  theme === "light"
                    ? "hover:bg-gray-100/80 text-gray-600"
                    : "hover:bg-gray-800/80 text-gray-400"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`flex items-center justify-center ${
                    item.name === "Logout"
                      ? theme === "light"
                        ? "text-red-500"
                        : "text-red-400"
                      : getTextColor("secondary")
                  }`}
                >
                  {item.icon}
                </div>
                {open && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm"
                  >
                    {item.name}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>

          {/* FOOTER */}
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 pt-4 border-t ${getBorderColor()} text-center`}
            >
              <p className={`text-xs ${getTextColor("muted")}`}>
                © 2024 SpotAdmin
              </p>
              <p className={`text-xs ${getTextColor("muted")} mt-1`}>
                All rights reserved
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
