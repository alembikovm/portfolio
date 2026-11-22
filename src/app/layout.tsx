import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono, Mrs_Saint_Delafield } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { site } from "@/content/site";
import "./globals.css";

const sans = Instrument_Sans({ variable: "--font-instrument-sans", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
const mono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });
const script = Mrs_Saint_Delafield({ variable: "--font-script-face", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: `${site.name.first} ${site.name.last} · Portfolio`,
  description: site.role,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${script.variable} ${mono.variable}`}>
      <body className="bg-bg text-ink">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
