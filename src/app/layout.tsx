// src/app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "3D Satisfaction Survey",
  description: "A satisfaction survey with a 3D neumorphic theme.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-gray-900 text-gray-200">
        {/* Global header */}
        <header className="flex justify-center py-8">
          <Image
            src="/logo.svg"
            alt="Company logo"
            width={140}
            height={40}
            priority
          />
        </header>

        {children}
      </body>
    </html>
  );
}