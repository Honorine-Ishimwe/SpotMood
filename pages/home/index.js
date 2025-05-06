import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import SpotifyPlayer from "./SpotifyPlayer"; // Import the SpotifyPlayer component
import SpotifyPlaylist from "@/pages/home/SpotifyPlaylist";
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
    let playlist;  // tbd later
    const playlistId = "37i9dQZF1EIffCAzWcCcGC";
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

                    <div id={playlist} className="w-full md:w-4/10 lg:w-4/10 p-2 border-2">
                        <SpotifyPlaylist playlist_id={playlistId}
                            uri="spotify:playlist:5AqjYFYdNjB10KIx6Y58Vs"
                            width={'100%'}
                            height={'600'}>
                        </SpotifyPlaylist>

                        {/*<SpotifyPlayer uri="spotify:playlist:5AqjYFYdNjB10KIx6Y58Vs" width={'100%'} height={'380'} />*/}
                    </div>
                </div>

                {/*main section*/}
            </main>

            <footer></footer>
        </div>
    );
}