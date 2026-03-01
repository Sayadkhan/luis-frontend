import SpotAdmin from "@/app/_components/admin/spot/Spot";
import Overview from "@/app/_components/admin/Overview";
import UiSettings from "@/app/_components/admin/ui/UiSettings";

import React from "react";
import ClubDashboard from "@/app/_components/admin/club/Club";
import BlogDashboard from "@/app/_components/admin/blog/Blog";
import InquiriesDashboard from "@/app/_components/admin/inquiries/Inquiries";
import Security from "@/app/_components/admin/security/Security";

interface DashboardProps {
  selected: string;
}

export default function DashboardPage({ selected }: DashboardProps) {
  const components: Record<string, React.ReactNode> = {
    Overview: <Overview />,
    Clubs: <ClubDashboard />,
    Spots: <SpotAdmin />,
    Blog: <BlogDashboard />,
    Inquiries: <InquiriesDashboard />,
    UiSettings: <UiSettings />,
    Security: <Security />,
  };

  return (
    <>
      <div className="">{components[selected] ?? <Overview />}</div>
    </>
  );
}
