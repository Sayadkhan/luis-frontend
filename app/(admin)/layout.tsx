"use client";

import React, { ReactNode, useState } from "react";
import SidePanel from "../_components/admin/SidePanel";
import DashboardPage from "./dashboard/page";

function MainContent({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 min-h-screen mt-14 md:mt-0 bg-gray-50 dark:bg-gray-900 p-4 md:p-6 transition-colors duration-300">
      {children}
    </main>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState("Overview");

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="">
        <SidePanel selected={selected} setSelected={setSelected} />
      </div>
      <MainContent>
        <DashboardPage selected={selected} />
      </MainContent>
    </div>
  );
}
