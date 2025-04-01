import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
      <div  className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <header className="flex items-center justify-between w-full max-w-4xl p-4 bg-white shadow-md">
          {/*header section */}
        </header>
        <main>
          {/*main section*/}
        </main>
          <footer className="flex items-center justify-between w-full max-w-4xl p-4 bg-white shadow-md">
          </footer>
      </div>
  );
}
