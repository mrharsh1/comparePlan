import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from './pages/Navbar'
// import Footer from "./components/footer";


const SFPro = localFont({
  src: "./fonts/sf-pro-display-medium.woff2",
  variable: "--SF-Pro",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Alps Insurance - Compare Plan",
  description: "Compare Plan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${SFPro.variable} antialiased`}
    >
      <Navbar />
        {children}
      {/* <Footer /> */}
     
      </body>
    </html>
  );
}
