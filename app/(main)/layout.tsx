import React, { ReactNode } from "react";
import Navbar from "../_components/shared/Navbar";
import Footer from "../_components/shared/Footer";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar />
      </nav>
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
