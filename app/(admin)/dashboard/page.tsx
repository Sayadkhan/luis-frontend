"use client";

import React, { useState } from "react";

import SpotAdmin from "@/app/_components/admin/spot/Spot";
import Overview from "@/app/_components/admin/Overview";
import UiSettings from "@/app/_components/admin/ui/UiSettings";
import ClubDashboard from "@/app/_components/admin/club/Club";
import BlogDashboard from "@/app/_components/admin/blog/Blog";
import InquiriesDashboard from "@/app/_components/admin/inquiries/Inquiries";
import Security from "@/app/_components/admin/security/Security";

export default function DashboardPage({ selected, setSelected }: any) {
  const components: Record<string, React.ReactNode> = {
    Overview: <Overview setSelected={setSelected} />,
    Clubs: <ClubDashboard />,
    Spots: <SpotAdmin />,
    Blog: <BlogDashboard />,
    Inquiries: <InquiriesDashboard />,
    UiSettings: <UiSettings />,
    Security: <Security />,
  };

  return (
    <div>{components[selected] ?? <Overview setSelected={setSelected} />}</div>
  );
}
