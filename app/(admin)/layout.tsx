"use client";

import React, { ReactNode, useEffect, useState } from "react";
import SidePanel from "../_components/admin/SidePanel";
import DashboardPage from "./dashboard/page";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

function MainContent({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 min-h-screen mt-14 md:mt-0 bg-gray-50 dark:bg-gray-900 p-4 md:p-6 transition-colors duration-300">
      {children}
    </main>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState("Overview");
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || (user as any)?.role !== "admin") {
      router.push("/login");
    } else {
      setIsAuthChecking(false);
    }
  }, [isLoggedIn, user, router]);

  if (isAuthChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
          Checking authentication...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="">
        <SidePanel selected={selected} setSelected={setSelected} />
      </div>
      <MainContent>
        <DashboardPage selected={selected} setSelected={setSelected} />
      </MainContent>
    </div>
  );
}
