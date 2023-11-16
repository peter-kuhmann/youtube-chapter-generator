import { DM_Mono } from "next/font/google";
import "./globals.scss";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const font = DM_Mono({ weight: ["400", "500", "300"], subsets: ["latin"] });

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
