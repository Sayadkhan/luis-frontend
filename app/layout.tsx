import { Bodoni_Moda, Sora } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";

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

// Blocking script: runs before React hydrates — sets dark/light class with zero flicker
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (theme === 'dark' || (!theme && prefersDark)) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch(e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Must be first in <head> — blocks rendering until theme class is set */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${SoraSans.variable} ${BodoniSans.variable} antialiased`}
        cz-shortcut-listen="true"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
