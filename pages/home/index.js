import Image from "next/image";
import { useState } from 'react';
import MiddleContent from './components/MiddleContent'; 
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

                    <div className="w-full md:w-4/10 lg:w-4/10 p-2 border-2">
                        <p>This is your playlist according to your mood</p>
                    </div>
                </div>

                
            </main>

            <footer></footer>
        </div>
    );
}