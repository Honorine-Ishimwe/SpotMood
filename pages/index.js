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
    <div className="">
      <header className="flex ">
        {/*header section */}
      </header>

      <main>
        <div className="Welcome">
          <h1>Welcome </h1>
          <p>{var_name}</p>
        </div>

        <div className="flex flex-wrap  ">
          <div className="w-full md:w-3/10 lg:w-3/10 p-2 border-2">
            <nav className="flex flex-col space-y-2">
              <a href="/mood" className="text-blue-600 hover:underline">Mood</a>
              <a href="/explore" className="text-blue-600 hover:underline">Explore</a>
              <a href="/myVibe" className="text-blue-600 hover:underline">My Vibe</a>
              <a href="/custom" className="text-blue-600 hover:underline">Create Your Vibe</a>
            </nav>
          </div>

          <div className="w-full md:w-3/10 lg:w-3/10 p-2 border-2">
            <p>How is the day going?</p>
          </div>

          <div className="w-full md:w-4/10 lg:w-4/10 p-2 border-2">
          <p>This is your playlist according to your mood</p>
          </div>
        </div>

        {/*main section*/}
      </main>

      <footer></footer>
    </div>
  );
}