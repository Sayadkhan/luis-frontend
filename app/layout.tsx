import { Bodoni_Moda, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/shared/Navbar";
import Footer from "./_components/shared/Footer";

const SoraSans = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const BodoniSans = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

export const metadata = {
  title: "Resort Website",
  description: "Enjoy Your Vacations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${SoraSans.variable} ${BodoniSans.variable} antialiased`}
      >
        <div className="min-h-screen">
          <Navbar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
