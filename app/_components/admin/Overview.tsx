"use client";

import React from "react";
import { Users, Package, CalendarCheck, Building2 } from "lucide-react";
import { useGetAllSpotQuery } from "@/redux/features/club/spotApi";
import { useGetAllClubQuery } from "@/redux/features/club/clubApi";

export default function Overview() {
  const { data: spotData, isLoading: spotsLoading } = useGetAllSpotQuery(undefined);
  const { data: clubData, isLoading: clubsLoading } = useGetAllClubQuery(undefined);

  const spots: any[] = spotData?.data?.data || spotData?.data || [];
  const clubs: any[] = clubData?.data?.data || clubData?.data || [];

  const stats = [
    {
      name: "Users",
      value: 1200,
      icon: <Users className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      name: "Total Spots",
      value: spotsLoading ? "..." : spots.length,
      icon: <Package className="w-6 h-6 text-green-500 dark:text-green-400" />,
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      name: "Total Clubs",
      value: clubsLoading ? "..." : clubs.length,
      icon: <Building2 className="w-6 h-6 text-orange-500 dark:text-orange-400" />,
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
      name: "Bookings",
      value: 890,
      icon: <CalendarCheck className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 flex items-center gap-4 transition-colors"
        >
          <div className={`p-3 rounded-xl ${stat.bgColor}`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-gray-500 dark:text-gray-400">{stat.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
