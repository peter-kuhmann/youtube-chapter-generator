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
    <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <script
            defer
            src="https://umami.peter-kuhmann.de/script.js"
            data-website-id="7cea2d52-52fa-4071-8526-e07c24348ccd"
        />
    </head>
    <body className={font.className}>
    <Navigation/>

    <>{children}</>

    <Footer/>
    </body>
    </html>
  );
}
