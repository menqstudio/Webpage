import { Inter, Noto_Sans_Armenian } from "next/font/google";

export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const notoArmenian = Noto_Sans_Armenian({
  subsets: ["armenian"],
  variable: "--font-noto-armenian",
  display: "swap",
});

export const fontVariables = `${inter.variable} ${notoArmenian.variable}`;
