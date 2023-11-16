import type { Metadata } from "next";
import { Manrope, Space_Mono, DM_Mono } from "next/font/google";
import "./globals.scss";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const font = DM_Mono({ weight: ["400", "500", "300"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FCP YouTube Chapter Generator",
  description:
    "Generate your YouTube chapter description based on your Final Cut Pro project. Export the project as XML, pick the file and this app gives you the description.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navigation />

        <>{children}</>

        <Footer />
      </body>
    </html>
  );
}
