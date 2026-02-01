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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-gray-900 text-gray-200">
        <div className="min-h-screen flex flex-col">
          {/* Header: keep it compact */}
          <header className="h-16 flex items-center justify-center border-b border-gray-800">
            <Image
              src="/logo.png"
              alt="Ophelia"
              width={160}
              height={48}
              priority
              className="h-10 w-auto opacity-95"
            />
          </header>

          {/* Main: takes remaining height and centers page content */}
          <main className="flex-1 flex justify-center items-start p-4 pt-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
