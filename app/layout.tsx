import type { Metadata } from "next";
import {
  Pinyon_Script,
  Cormorant_Garamond,
  Inter,
  Aref_Ruqaa,
  Tajawal,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageProvider";

const script = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

const arabicDisplay = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic-display",
  display: "swap",
});

const arabicBody = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-arabic-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Salma & Tariq — A Wedding in the Jasmine Courtyard",
  description:
    "An invitation to the autumn wedding of Salma & Tariq in the hills outside Amman, Jordan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${script.variable} ${display.variable} ${body.variable} ${arabicDisplay.variable} ${arabicBody.variable}`}
    >
      <body className="bg-sandstone text-plum">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
