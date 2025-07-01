import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import MiddleContent from './middleContent';
import {getSession, useSession, signIn, signOut} from "next-auth/react"
import SpotifyPlayer from "./SpotifyPlayer"; // Import the SpotifyPlayer component
import SpotifyPlaylist from "@/pages/home/SpotifyPlaylist";
import {getToken} from "next-auth/jwt";
import Link from "next/link";

// end of server-side authentication check

export default function Home() {
    const [playlistId, setPlaylistId] = useState(null); // State to hold the playlist ID
    const router = useRouter(); // useRouter hook to navigate programmatically
    const {data: session, status} = useSession();
    console.log("session:", session);
    console.log("status:", status);
    if (!status) {
        throw new Error("User session not found.");
    }

    // get user's top playlist
    const spotifyAccessToken = session?.token?.access_token;
    console.log("Spotify Access Token:", spotifyAccessToken);
    useEffect(() => {
        async function getOnRepeatPlaylistId() {
            if (playlistId) return; // Skip if already set by mood
            let nextURL = "https://api.spotify.com/v1/me/playlists?limit=10&offset=0";
            while (nextURL) {
                const res = await fetch(nextURL, {
                    headers: {
                        Authorization: `Bearer ${spotifyAccessToken}`,
                    },
                });
                if (!res.ok) {
                    console.log("Failed to fetch playlists");
                    return null;
                }

                const data = await res.json();
                const playlists = data.items;
                // the following 3 lines randomly select a playlist from the first 10 playlists
                const maxIndex = Math.min(playlists.length - 1, 9); // prevent overflow
                const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
                const randomPlaylist = playlists[randomIndex];
                console.log("Randomly selected playlist ID:", randomPlaylist);
                // end of random selection
                setPlaylistId(randomPlaylist.id); // set the playlist ID state


                nextURL = data.next; // paginate if more playlists
            }
        }

        getOnRepeatPlaylistId();


    }, [spotifyAccessToken, playlistId]);
    // end of fetching user's random playlist
    const [navChosen, setChooseNav] = useState("default");
    return (
        <div className="min-h-screen text-white from-blue-900 to-black-700 bg-gradient-to-br">
            <header className="flex justify-end items-end p-4">
                {/* Existing header content */}
                <button
                    onClick={() => signOut()}
                    className="bg-green-900 text-white text-lg font-semibold w-auto h-14 rounded-bl-full shadow hover:bg-green-800 hover:text-2xl transition-colors flex justify-center items-center m-3"
                    aria-label="Sign Out"
                >
                    <svg fill="#fff" height="100%" width="100%" viewBox="0 0 500 500">
                        <g>
                            <path
                                d="M250,224c-4.4,0-8,3.6-8,8v24c0,4.4-3.6,8-8,8h-40c-4.4,0-8-3.6-8-8V144c0-4.4,3.6-8,8-8h40c4.4,0,8,3.6,8,8v24 c0,4.4,3.6,8,8,8s8-3.6,8-8v-24c0-13.2-10.8-24-24-24h-40c-13.2,0-24,10.8-24,24v112c0,13.2,10.8,24,24,24h40c13.2,0,24-10.8,24-24 v-24C258,227.6,254.4,224,250,224z"
                            />
                            <path
                                d="M328.4,204.8c0.1-0.1,0.2-0.2,0.3-0.3c0,0,0,0,0-0.1c0.1-0.2,0.2-0.4,0.3-0.6c0.1-0.3,0.3-0.5,0.4-0.8 c0.1-0.3,0.2-0.5,0.3-0.8c0.1-0.2,0.2-0.4,0.2-0.7c0.2-1,0.2-2.1,0-3.1c0,0,0,0,0,0c0-0.2-0.1-0.4-0.2-0.7 c-0.1-0.3-0.1-0.5-0.2-0.8c0,0,0,0,0,0c-0.1-0.3-0.3-0.5-0.4-0.8c-0.1-0.2-0.2-0.4-0.3-0.6c-0.3-0.4-0.6-0.9-1-1.2l-32-32 c-3.1-3.1-8.2-3.1-11.3,0c-3.1,3.1-3.1,8.2,0,11.3l18.3,18.3H210c-4.4,0-8,3.6-8,8s3.6,8,8,8h92.7l-18.3,18.3 c-3.1,3.1-3.1,8.2,0,11.3c1.6,1.6,3.6,2.3,5.7,2.3s4.1-0.8,5.7-2.3l32-32c0,0,0,0,0,0C327.9,205.4,328.1,205.1,328.4,204.8z"
                            />
                        </g>
                    </svg>
                    <span className="">Sign Out</span>
                </button>
            </header>

            <main>
                <div className="text-white text-center p-10 font-bold text-5xl">
                    <div className="text-center p-10 font-bold text-5xl">
                        <span className="font-[Lovers-Quarrel] text-9xl">SpotMood</span>
                        <h1>Hello {session?.user?.name}!</h1>
                    </div>
                </div>

                <div className="flex flex-wrap  ">
                    <div className="w-full md:w-3/10 lg:w-3/10 p-2">
                        <nav className="flex flex-col space-y-2">
                            <button onClick={() => setChooseNav("Mood")}
                                    className="bg-green-900 text-white text-lg font-semibold py-6 px-6 rounded-md shadow hover:bg-green-800 transition-colors m-3 px">Mood
                            </button>
                            <button onClick={() => setChooseNav("Explore")}
                                    className="bg-green-900 text-white text-lg font-semibold py-6 px-6 rounded-md shadow hover:bg-green-800 transition-colors m-3 px">Explore
                            </button>
                            <button onClick={() => setChooseNav("My Vibe")}
                                    className="bg-green-900 text-white text-lg font-semibold py-6 px-6 rounded-md shadow hover:bg-green-800 transition-colors m-3 px">My
                                Vibe
                            </button>
                            <button onClick={() => setChooseNav("Create Your Vibe")}
                                    className="bg-green-900 text-white text-lg font-semibold py-6 px-6 rounded-md shadow hover:bg-green-800 transition-colors m-3 px">Create
                                Your Vibe
                            </button>
                        </nav>
                    </div>

                    <div className="w-full md:w-3/10 lg:w-3/10 p-2">
                        <MiddleContent navChosen={navChosen} setPlaylistId={setPlaylistId} token={spotifyAccessToken}/>
                    </div>

                    <div className="w-full md:w-4/10 lg:w-4/10 p-2">
                        <SpotifyPlaylist playlist_id={playlistId}
                                         uri={`spotify:playlist:${playlistId}`}
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