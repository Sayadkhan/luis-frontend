"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useGetUIDataQuery } from "@/redux/features/ui/uiApi";

interface ImageData {
  url: string;
  publicId: string;
}

interface UIData {
  _id?: string;
  logo: ImageData;
  bannerImage: ImageData;
  whatsapp: string;
  email: string;
  travelPhoto: ImageData;
  explorePhoto: ImageData;
}

interface UiContextType {
  uiData: UIData | null;
  isLoading: boolean;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export function UiProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useGetUIDataQuery(undefined);
  const [uiData, setUiData] = useState<UIData | null>(null);

  useEffect(() => {
    if (data?.data?.length) {
      setUiData(data.data.slice(-1)[0]);
    }
  }, [data]);

  return (
    <UiContext.Provider value={{ uiData, isLoading }}>
      {children}
    </UiContext.Provider>
  );
}

export function useUi() {
  const context = useContext(UiContext);
  if (context === undefined) {
    throw new Error("useUi must be used within a UiProvider");
  }
  return context;
}
