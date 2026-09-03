import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage('Please fill in all fields.');
            return;
        }
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (data.success) {
                setMessage('Login successful!');
                router.push('/home');
            } else {
                setMessage(data.message || 'Login failed');
            }
        } catch (err) {
            setMessage('An unexpected error occurred.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen text-white from-blue-900 to-black-700 bg-gradient-to-br px-4">
            <div className="bg-black/40 border border-white/15 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-6">
                    <span className="font-[Lovers-Quarrel] text-7xl text-white block leading-tight">
                        SpotMood
                    </span>
                    <h1 className="text-xl font-bold text-gray-200">Login</h1>
                </div>

                <div className="mb-4">
                    <button
                        onClick={() => signIn('spotify', { callbackUrl: '/home' })}
                        className="w-full bg-green-600 text-white font-semibold py-2.5 px-4 rounded-md hover:bg-green-700 shadow transition-colors flex items-center justify-center space-x-2"
                    >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
                        <span>Login With Spotify</span>
                    </button>
                </div>

                <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-white/20"></div>
                    <span className="px-3 text-xs text-gray-400 uppercase">or</span>
                    <div className="flex-1 border-t border-white/20"></div>
                </div>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email-login" className="block text-sm font-medium text-gray-200 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email-login"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-md text-white placeholder-gray-400 text-sm focus:outline-none focus:border-green-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password-login" className="block text-sm font-medium text-gray-200 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password-login"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-md text-white placeholder-gray-400 text-sm focus:outline-none focus:border-green-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {message && (
                        <p className={`text-xs text-center ${message.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-green-900 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-800 transition-colors shadow"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-300">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-green-400 hover:underline font-semibold ml-1">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}