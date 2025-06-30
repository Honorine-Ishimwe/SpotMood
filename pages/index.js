import Link from "next/link";
import {useEffect, useState} from "react";
import {useSession, signIn, signOut, SessionProvider, getSession} from "next-auth/react";
import { useRouter } from 'next/router'


export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');

    const {data: session, status} = useSession();
  console.log("session:", session);
  console.log("status:", status);

    // if login session is available, redirect to home page
    if (status === "authenticated") {
        console.log("User is authenticated, redirecting to home");
        router.push('/home');
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage('Please fill in all fields.');
            return;
        }
        const res = await fetch('/api/login', {
            method: 'POST',
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
            <Link href="/home"/>;
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-black">Login</h1>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email-login" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email-login"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password-login" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password-login"
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
                        Don&apos;t have an account? <br/>
                        <Link href="/signup" className="text-indigo-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
                <div className="mt-4 text-center text-black">
                    <p>
                        <button
                            onClick={() => signIn('spotify', {callbackUrl: '/home'})} // Uncomment this line to enable Spotify login
                            //   onClick={() => signIn('spotify', { callbackUrl: '/api/auth/callback/spotify' })}
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Login With Spotify
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

