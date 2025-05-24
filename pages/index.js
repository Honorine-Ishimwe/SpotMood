import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    setMessage('Please fill in all fields.');
    return;
  }
const res = await fetch('/api/login',{
  method:'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.strongify({email, password})
})

const data = await res.json();
if (data.success) {
  setMessage('Login successful!');
} else {
  setMessage(data.message || 'Login failed');
  router.push('/home'); 
}

};



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">Login</h1>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
           Don&apos;t have an account? <br />
          <Link href="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>
    </div>
    <div className="mt-4 text-center text-black">
      <p>
        <a href="https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=https://spotmood.vercel.app/api/callback&scope=user-read-private user-read-email"
target="_blank"
rel="noopener noreferrer">Login With Spotify</a>
      </p>
    </div>
    </div>
    </div>
  );
}