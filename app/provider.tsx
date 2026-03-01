"use client";

import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { UiProvider } from "@/providers/UiProvider";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <UiProvider>
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </UiProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
