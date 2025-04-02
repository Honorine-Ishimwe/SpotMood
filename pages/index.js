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
  let var_name = "Bertin";
  return (
      <div  className="">
        <header className="flex ">
          {/*header section */}
        </header>
        <main> 
        <div className="flex navigation">
          <nav className="flex flex-col space-y-2">
            <a href="/mood" className="text-blue-600 hover:underline">Mood</a>
            <a href="/explore" className="text-blue-600 hover:underline">Explore</a>
            <a href="/myVibe" className="text-blue-600 hover:underline">My Vibe</a>
            <a href="/custom" className="text-blue-600 hover:underline">Create Your Vibe</a>
          </nav>
        </div>
          <div className="Welcome">
            <h1>Welcome </h1>
            <p>{var_name}</p>

          </div>
          <div className="msg">

          </div>
          <div className="logo">

          </div>
          {/*main section*/}
        </main>
          <footer className="flex items-center justify-between w-full max-w-4xl p-4 bg-white shadow-md">
          </footer>
      </div>
  );
}
