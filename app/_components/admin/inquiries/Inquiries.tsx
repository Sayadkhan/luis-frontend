"use client";

import React from "react";
import { Mail, Trash2, CheckCircle, Clock, RefreshCw, Phone, MapPin, Users, Compass, Megaphone } from "lucide-react";
import {
  useGetAllInquiriesQuery,
  useMarkInquiryReadMutation,
  useDeleteInquiryMutation,
} from "@/redux/features/blog/blogApi";
import toast, { Toaster } from "react-hot-toast";

const REASON_LABELS: Record<string, string> = {
  learn: "Learn about timeshare ownership",
  "owner-services": "Existing owner – Owner Services",
  "vacation-portfolio": "Existing owner – Add to vacation portfolio",
  general: "General enquiry",
};

const Field = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">
        {label}
      </p>
      <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{value}</p>
    </div>
  );
};

export default function InquiriesDashboard() {
  const { data, isLoading, refetch } = useGetAllInquiriesQuery(undefined);
  const [markRead] = useMarkInquiryReadMutation();
  const [deleteInq] = useDeleteInquiryMutation();
  const [selected, setSelected] = React.useState<any | null>(null);
  const [filter, setFilter] = React.useState<"all" | "new" | "read">("all");

  const allInquiries: any[] = data?.data || [];
  const inquiries = filter === "all" ? allInquiries : allInquiries.filter((i) => i.status === filter);
  const newCount = allInquiries.filter((i) => i.status === "new").length;

  const handleMarkRead = async (id: string) => {
    try {
      await markRead(id).unwrap();
      toast.success("Marked as read");
      if (selected?._id === id) setSelected((s: any) => ({ ...s, status: "read" }));
    } catch {
      toast.error("Failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    try {
      await deleteInq(id).unwrap();
      toast.success("Deleted");
      if (selected?._id === id) setSelected(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  const isRequestInfo = selected?.formType === "request-information";

  return (
    <div className="p-6 space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Inquiries</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
            Contact form & information request submissions
            {newCount > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">
                {newCount} new
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total", value: allInquiries.length, color: "blue" },
          { label: "New / Unread", value: newCount, color: "red" },
          { label: "Read", value: allInquiries.filter((i) => i.status !== "new").length, color: "green" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
            <div className={`w-11 h-11 rounded-full bg-${color}-100 dark:bg-${color}-900/30`} />
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["all", "new", "read"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        {/* List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-400">
              <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Loading...
            </div>
          ) : inquiries.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <Mail className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p>No inquiries yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700 overflow-y-auto max-h-[560px]">
              {inquiries.map((inq) => (
                <button
                  key={inq._id}
                  onClick={() => {
                    setSelected(inq);
                    if (inq.status === "new") handleMarkRead(inq._id);
                  }}
                  className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${selected?._id === inq._id ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${inq.status === "new" ? "bg-red-500" : "bg-gray-300 dark:bg-gray-600"}`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-sm font-semibold truncate ${inq.status === "new" ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                          {inq.name}
                        </p>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {inq.formType === "request-information" && (
                            <span className="text-[9px] bg-[#C6AC5E]/15 text-[#7a6535] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
                              Info Req
                            </span>
                          )}
                          <span className="text-[10px] text-gray-400">
                            {new Date(inq.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{inq.email}</p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {inq.message || (inq.interest ? `Interest: ${inq.interest}` : REASON_LABELS[inq.reason] || inq.reason)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail view */}
        {selected ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6 overflow-y-auto max-h-[700px]">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selected.name}</h3>
                  {isRequestInfo && (
                    <span className="text-[10px] bg-[#C6AC5E]/15 text-[#7a6535] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                      Info Request
                    </span>
                  )}
                </div>
                <a href={`mailto:${selected.email}`} className="text-sm text-blue-500 hover:underline">
                  {selected.email}
                </a>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {selected.status === "new" && (
                  <button
                    onClick={() => handleMarkRead(selected._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-green-700 bg-green-50 dark:bg-green-900/30 dark:text-green-400 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <CheckCircle size={14} /> Mark Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selected._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/30 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>

            {/* Status + date */}
            <div className="flex flex-wrap gap-3">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${selected.status === "new" ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"}`}>
                {selected.status === "new" ? <Clock size={12} /> : <CheckCircle size={12} />}
                {selected.status === "new" ? "Unread" : "Read"}
              </span>
              <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-3 py-1.5 rounded-full">
                {new Date(selected.createdAt).toLocaleDateString("en-US", {
                  weekday: "long", year: "numeric", month: "long", day: "numeric",
                  hour: "2-digit", minute: "2-digit",
                })}
              </span>
            </div>

            {/* ── Contact fields (request-info form) ── */}
            {isRequestInfo ? (
              <div className="space-y-5">
                {/* Contact info grid */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="First Name" value={selected.firstName} />
                  <Field label="Last Name" value={selected.lastName} />
                  <Field label="Email" value={selected.email} />
                  <Field label="Phone" value={selected.phone} />
                  <Field label="Country" value={selected.country} />
                  <Field label="State / Province" value={selected.state} />
                </div>

                {/* Travel preferences */}
                <div className="bg-[#C6AC5E]/5 border border-[#C6AC5E]/20 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-[#C6AC5E] mt-0.5 flex-shrink-0" />
                    <Field label="Guests" value={selected.guests} />
                  </div>
                  <div className="flex items-start gap-2">
                    <Compass className="w-4 h-4 text-[#C6AC5E] mt-0.5 flex-shrink-0" />
                    <Field label="Travel Interest" value={selected.interest} />
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#C6AC5E] mt-0.5 flex-shrink-0" />
                    <Field label="Preferred Destination" value={selected.preferredLocation} />
                  </div>
                </div>

                {/* Reason + how they heard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-amber-600 dark:text-amber-500 mb-1">
                      Reason for Inquiry
                    </p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      {REASON_LABELS[selected.reason] || selected.reason}
                    </p>
                  </div>
                  {selected.howDidYouHear && (
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl p-4 flex items-start gap-2">
                      <Megaphone className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">
                          How They Heard
                        </p>
                        <p className="text-sm text-gray-800 dark:text-gray-200">{selected.howDidYouHear}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional notes */}
                {selected.message && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">
                      Additional Notes
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {selected.message}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── Contact form fields ── */
              <div className="space-y-4">
                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-amber-600 dark:text-amber-500 mb-1">
                    Reason for Contact
                  </p>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    {REASON_LABELS[selected.reason] || selected.reason}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Message</p>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {selected.message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick reply */}
            <a
              href={`mailto:${selected.email}?subject=Re: Your Enquiry — Endless Vacations Hub`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors"
            >
              <Mail size={15} /> Reply via Email
            </a>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center min-h-[300px] text-gray-400">
            <div className="text-center">
              <Mail className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Select an inquiry to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
