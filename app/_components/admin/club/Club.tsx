"use client";

import React, { useState } from "react";
import { MdAdd, MdRefresh } from "react-icons/md";
import { CreateClubModal } from "./CreateClubModal";
import { useGetAllClubQuery, useDeleteClubMutation } from "@/redux/features/club/clubApi";
import Image from "next/image";
import { Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function ClubDashboard() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useGetAllClubQuery(undefined);
  const [deleteClub] = useDeleteClubMutation();

  const clubs: any[] = data?.data?.data || data?.data || [];

  const totalClubs = clubs.length;
  const activeClubs = clubs.filter((c: any) => c.status === "active").length;
  const categories = [...new Set(clubs.map((c: any) => c.clubCategory))].length;

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this club?")) return;
    await deleteClub(id);
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Clubs Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage clubs, upload images, and organize membership details
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <MdRefresh /> Refresh
          </button>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            <MdAdd /> Add New Club
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Total Clubs" value={isLoading ? "..." : totalClubs} />
        <StatCard title="Active Clubs" value={isLoading ? "..." : activeClubs} />
        <StatCard title="Categories" value={isLoading ? "..." : categories} />
      </div>

      {/* CLUB LIST */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 h-64" />
          ))}
        </div>
      ) : clubs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500">
          <div className="text-6xl mb-4">🏛️</div>
          <p className="text-xl font-medium">No clubs yet</p>
          <p className="text-sm mt-1">Click "Add New Club" to create your first club.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club: any) => (
            <ClubCard key={club._id} club={club} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* MODAL */}
      {open && <CreateClubModal onClose={() => setOpen(false)} open={open} />}
    </div>
  );
}

function ClubCard({ club, onDelete }: { club: any; onDelete: (id: string) => void }) {
  const logo = club.clubLogo?.[0]?.url;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-gray-900/50 overflow-hidden flex flex-col">
      {/* Logo / Banner */}
      <div className="relative h-40 bg-blue-50 dark:bg-gray-700 flex items-center justify-center">
        {logo ? (
          <Image src={logo} alt={club.clubTitle} fill className="object-cover" />
        ) : (
          <span className="text-5xl text-blue-200 dark:text-blue-800">🏛️</span>
        )}
        {/* Status badge */}
        <span
          className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium ${
            club.status === "active"
              ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
              : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
          }`}
        >
          {club.status ?? "active"}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{club.clubTitle}</h3>
        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{club.clubCategory}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {club.shortDescription || club.clubDescription}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="text-xs text-gray-400">
            👑 {club.clubPresidentName}
          </span>
          <span className="text-xs text-gray-400">
            👥 {club.totalMembers ?? 0} members
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex border-t border-gray-100 dark:border-gray-700">
        <Link
          href={`/clubs/${club.slug}`}
          target="_blank"
          className="flex-1 flex items-center justify-center gap-1 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Eye className="w-4 h-4" /> View
        </Link>
        <button
          onClick={() => onDelete(club._id)}
          className="flex-1 flex items-center justify-center gap-1 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-l border-gray-100 dark:border-gray-700"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>
    </div>
  );
}

const StatCard = ({ title, value }: { title: string; value: string | number }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow dark:shadow-gray-900/50 p-6 flex justify-between items-center border border-gray-100 dark:border-gray-700">
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h2>
    </div>
    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30" />
  </div>
);
