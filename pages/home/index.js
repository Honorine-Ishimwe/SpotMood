import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MiddleContent from './middleContent';
import { useSession, signOut } from "next-auth/react";
import SpotifyPlaylist from "@/pages/home/SpotifyPlaylist";

export default function Home() {
    const [playlistId, setPlaylistId] = useState(null);
    const router = useRouter();
    const { data: session, status } = useSession();
    const isSpotifyUser = !!session?.token?.access_token;

    useEffect(() => {
        if (!isSpotifyUser) return;

        async function loadRandomUserPlaylist() {
            try {
                const initialRes = await fetch("https://api.spotify.com/v1/me/playlists?limit=1&offset=0", {
                    headers: {
                        Authorization: `Bearer ${session.token.access_token}`,
                    },
                });
                if (!initialRes.ok) return;

                const initialData = await initialRes.json();
                const totalPlaylists = initialData.total || 0;
                if (totalPlaylists === 0) return;

                const randomOffset = Math.floor(Math.random() * totalPlaylists);
                const batchSize = Math.min(10, totalPlaylists);
                const safeOffset = Math.min(randomOffset, Math.max(0, totalPlaylists - batchSize));

                const res = await fetch(
                    `https://api.spotify.com/v1/me/playlists?limit=${batchSize}&offset=${safeOffset}`,
                    {
                        headers: {
                            Authorization: `Bearer ${session.token.access_token}`,
                        },
                    }
                );

                if (!res.ok) return;

                const data = await res.json();
                const playlists = data.items?.filter((p) => p !== null) || [];

                if (playlists.length > 0) {
                    const randomPlaylist = playlists[Math.floor(Math.random() * playlists.length)];
                    setPlaylistId(randomPlaylist.id);
                }
            } catch (err) {
                console.error("Error loading random user playlist:", err);
            }
        }

        loadRandomUserPlaylist();
    }, [isSpotifyUser, session?.token?.access_token]);

    const [navChosen, setChooseNav] = useState("default");

    return (
        <div className="h-screen flex flex-col text-white from-blue-900 to-black-700 bg-gradient-to-br overflow-hidden">
            <header className="flex justify-end items-center px-4 pt-2">
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="bg-green-900 text-white text-sm font-semibold h-10 px-4 rounded-bl-full shadow hover:bg-green-800 transition-colors flex justify-center items-center"
                    aria-label="Sign Out"
                >
                    <svg fill="#fff" height="20" width="20" viewBox="0 0 500 500" className="mr-2">
                        <g>
                            <path d="M250,224c-4.4,0-8,3.6-8,8v24c0,4.4-3.6,8-8,8h-40c-4.4,0-8-3.6-8-8V144c0-4.4,3.6-8,8-8h40c4.4,0,8,3.6,8,8v24 c0,4.4,3.6,8,8,8s8-3.6,8-8v-24c0-13.2-10.8-24-24-24h-40c-13.2,0-24,10.8-24,24v112c0,13.2,10.8,24,24,24h40c13.2,0,24-10.8,24-24 v-24C258,227.6,254.4,224,250,224z" />
                            <path d="M328.4,204.8c0.1-0.1,0.2-0.2,0.3-0.3c0,0,0,0,0-0.1c0.1-0.2,0.2-0.4,0.3-0.6c0.1-0.3,0.3-0.5,0.4-0.8 c0.1-0.3,0.2-0.5,0.3-0.8c0.1-0.2,0.2-0.4,0.2-0.7c0.2-1,0.2-2.1,0-3.1c0,0,0,0,0,0c0-0.2-0.1-0.4-0.2-0.7 c-0.1-0.3-0.1-0.5-0.2-0.8c0,0,0,0,0,0c-0.1-0.3-0.3-0.5-0.4-0.8c-0.1-0.2-0.2-0.4-0.3-0.6c-0.3-0.4-0.6-0.9-1-1.2l-32-32 c-3.1-3.1-8.2-3.1-11.3,0c-3.1,3.1-3.1,8.2,0,11.3l18.3,18.3H210c-4.4,0-8,3.6-8,8s3.6,8,8,8h92.7l-18.3,18.3 c-3.1,3.1-3.1,8.2,0,11.3c1.6,1.6,3.6,2.3,5.7,2.3s4.1-0.8,5.7-2.3l32-32c0,0,0,0,0,0C327.9,205.4,328.1,205.1,328.4,204.8z" />
                        </g>
                    </svg>
                    <span>Sign Out</span>
                </button>
            </header>

            <main className="flex-1 flex flex-col px-4 pb-4">
                <div className="text-white text-center pb-2">
                    <span className="font-[Lovers-Quarrel] text-6xl md:text-7xl block leading-tight">SpotMood</span>
                    <h1 className="text-xl md:text-2xl font-bold">Hello {session?.user?.name}!</h1>
                </div>

                <div className="flex flex-wrap flex-1 items-start">
                    <div className="w-full md:w-3/10 lg:w-3/10 p-2">
                        <nav className="flex flex-col space-y-3.5">
                            <button onClick={() => setChooseNav("Mood")} className="bg-green-900 text-white text-lg font-semibold py-4 px-5 rounded-md shadow hover:bg-green-800 transition-colors text-left">Mood</button>
                            <button onClick={() => setChooseNav("Explore")} className="bg-green-900 text-white text-lg font-semibold py-4 px-5 rounded-md shadow hover:bg-green-800 transition-colors text-left">Explore</button>
                            <button onClick={() => setChooseNav("My Vibe")} className="bg-green-900 text-white text-lg font-semibold py-4 px-5 rounded-md shadow hover:bg-green-800 transition-colors text-left">My Vibe</button>
                            <button onClick={() => setChooseNav("Create Your Vibe")} className="bg-green-900 text-white text-lg font-semibold py-4 px-5 rounded-md shadow hover:bg-green-800 transition-colors text-left">Create Your Vibe</button>
                        </nav>
                    </div>

                    <div className="w-full md:w-3/10 lg:w-3/10 p-2 max-h-[calc(100vh-170px)] overflow-y-auto pr-2">
                        <MiddleContent navChosen={navChosen} setPlaylistId={setPlaylistId} token={session?.token?.access_token} />
                    </div>

                    <div className="w-full md:w-4/10 lg:w-4/10 p-2 pb-3">
                        {isSpotifyUser ? (
                            <SpotifyPlaylist
                                playlist_id={playlistId}
                                uri={`spotify:playlist:${playlistId}`}
                                width={'100%'}
                                height={'490'}
                            />
                        ) : (
                            <p className="text-white text-center text-lg mt-10">Connect Spotify to see your playlist here!</p>
                        )}
                    </div>
                </div>
            </main>

            <footer></footer>
        </div>
    );
}