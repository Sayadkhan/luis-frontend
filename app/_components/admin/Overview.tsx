"use client";

import React, { useEffect, useMemo, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

import { useGetAllClubQuery } from "@/redux/features/club/clubApi";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import { useGetAllInquiriesQuery } from "@/redux/features/blog/blogApi";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

export default function Overview({ setSelected }: any) {
  /* ================= QUERIES ================= */

  const { data: clubData, isLoading: clubsLoading } =
    useGetAllClubQuery(undefined);

  const { data: blogData, isLoading: blogsLoading } =
    useGetAllBlogsQuery(undefined);

  const { data: inquiryData, isLoading: inquiriesLoading } =
    useGetAllInquiriesQuery(undefined, {
      pollingInterval: 30000,
    });

  /* ================= DATA ================= */

  const clubs: any[] = clubData?.data?.data || clubData?.data || [];
  const blogs: any[] = blogData?.data?.data || blogData?.data || [];
  const inquiries: any[] = inquiryData?.data || blogData?.data || [];

  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter((i) => i.status === "new").length;
  const readInquiries = inquiries.filter((i) => i.status === "read").length;

  /* ================= TOAST WHEN NEW INQUIRY ================= */

  const prevNewCount = useRef(0);

  useEffect(() => {
    if (!inquiries) return;

    if (prevNewCount.current && newInquiries > prevNewCount.current) {
      toast.success("New inquiry received!");
    }

    prevNewCount.current = newInquiries;
  }, [newInquiries, inquiries]);

  /* ================= PIE CHART ================= */

  const pieData = {
    labels: ["Unread", "Read"],
    datasets: [
      {
        data: [newInquiries, readInquiries],
        backgroundColor: ["#ef4444", "#22c55e"],
        borderWidth: 0,
      },
    ],
  };

  /* ================= MONTHLY DATA ================= */

  const monthlyData = useMemo(() => {
    const grouped: any = {};

    inquiries.forEach((inq) => {
      const month = new Date(inq.createdAt).toLocaleString("default", {
        month: "short",
      });

      grouped[month] = (grouped[month] || 0) + 1;
    });

    return grouped;
  }, [inquiries]);

  const barData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: "Inquiries",
        data: Object.values(monthlyData),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  };

  /* ================= RECENT INQUIRIES ================= */

  const recentInquiries = [...inquiries]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <Toaster position="top-right" />

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Clubs"
          value={clubsLoading ? "..." : clubs.length}
          subtitle="All active clubs"
          color="orange"
        />

        <StatCard
          title="Total Blogs"
          value={blogsLoading ? "..." : blogs.length}
          subtitle="Published blogs"
          color="blue"
        />

        <StatCard
          title="Total Inquiries"
          value={inquiriesLoading ? "..." : totalInquiries}
          subtitle={`${newInquiries} unread`}
          color="purple"
        />

        <StatCard
          title="Unread"
          value={inquiriesLoading ? "..." : newInquiries}
          subtitle="Needs attention"
          color="red"
        />

        <StatCard
          title="Read"
          value={inquiriesLoading ? "..." : readInquiries}
          subtitle="Processed"
          color="green"
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* ================= PIE CHART ================= */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
            Inquiry Status Distribution
          </h2>
          <div className="max-w-xs">
            <Pie data={pieData} />
          </div>
        </div>

        {/* ================= MONTHLY BAR ================= */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
            Monthly Inquiries
          </h2>
          <Bar data={barData} />
        </div>
      </div>
      {/* ================= RECENT ================= */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Recent Inquiries
          </h2>
          <button
            onClick={() => setSelected("Inquiries")}
            className="text-sm text-blue-600 hover:underline font-semibold"
          >
            View All
          </button>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {recentInquiries.map((inq) => (
            <div
              key={inq._id}
              className="p-4 flex justify-between items-start hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {inq.name}
                </p>
                <p className="text-xs text-gray-500">{inq.email}</p>
              </div>

              <div className="flex items-center gap-2">
                {inq.status === "new" && (
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    inq.status === "new"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {inq.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({
  title,
  value,
  subtitle,
  color,
}: {
  title: string;
  value: any;
  subtitle: string;
  color: string;
}) {
  const colorMap: any = {
    red: "text-red-500",
    green: "text-green-500",
    purple: "text-purple-500",
    blue: "text-blue-500",
    orange: "text-orange-500",
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
        {value}
      </p>

      <p className={`text-xs mt-2 font-semibold ${colorMap[color]}`}>
        {subtitle}
      </p>
    </div>
  );
}
