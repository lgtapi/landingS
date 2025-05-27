import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat } from 'next/font/google';
import "./globals.css";
import FacebookPixel from '@/components/FacebookPixel';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata = {
  title: "SHEBN",
  description: "The Global Community of Women Blockchain and Web3",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
        style={{
          '--font-geist-sans': montserrat.style.fontFamily,
          '--font-geist-mono': montserrat.style.fontFamily,
        }}
      >
        <FacebookPixel />
        {children}
      </body>
    </html>
  );
}
