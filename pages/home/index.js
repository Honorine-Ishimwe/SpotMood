import Image from "next/image";
import { useState } from 'react';
import MiddleContent from './middleContent'; 
import { Geist, Geist_Mono } from "next/font/google";
import SpotifyPlayer from "./SpotifyPlayer"; // Import the SpotifyPlayer component
import SpotifyPlaylist from "@/pages/home/SpotifyPlaylist";
import {getSession, useSession} from "next-auth/react";
// function below is for server-side authentication check. redirect to home page if not authenticated.
export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: { session },
    };
}
// end of server-side authentication check

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
    const [navChosen, setChooseNav] = useState("default");
    return (
        <div className="min-h-screen text-white from-blue-900 to-black-700 bg-gradient-to-br">
            <header className="flex ">
                {/*header section */}
            </header>

            <main>
                <div className="text-white text-center p-10 font-bold text-5xl">
                    <h1>Welcome {var_name} !</h1>
                </div>

                <div className="flex flex-wrap  ">
                    <div className="w-full md:w-3/10 lg:w-3/10 p-2 border-2">
                        <nav className="flex flex-col space-y-2">
                            <button onClick={() => setChooseNav("Mood")} className="bg-green-900 text-white text-lg font-semibold py-6 px-6 rounded-md shadow hover:bg-green-800 transition-colors m-3 px">Mood</button>
                            <button onClick={() => setChooseNav("Explore")} className="bg-green-900 text-white text-lg font-semibold py-6 px-6 rounded-md shadow hover:bg-green-800 transition-colors m-3 px">Explore</button>
                            <button onClick={() => setChooseNav("My Vibe")} className="bg-green-900 text-white text-lg font-semibold py-6 px-6 rounded-md shadow hover:bg-green-800 transition-colors m-3 px">My Vibe</button>
                            <button onClick={() => setChooseNav("Create Your Vibe")} className="bg-green-900 text-white text-lg font-semibold py-6 px-6 rounded-md shadow hover:bg-green-800 transition-colors m-3 px">Create Your Vibe</button>
                        </nav>
                    </div>

                    <div className="w-full md:w-3/10 lg:w-3/10 p-2 border-2">
                    <MiddleContent mood={navChosen} />
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

                
            </main>

            <footer></footer>
        </div>
    );
}