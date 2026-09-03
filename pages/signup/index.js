import { useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Signup() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!username) {
            setMessage('Username cannot be empty.');
            return;
        }
        if (password.length < 8) {
            setMessage('Password must be at least 8 characters long.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setMessage('Please enter a valid email address.');
            return;
        }
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('/api/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: username, email, password }),
            });

            const data = await response.json();

            if (data.message === 'User created successfully') {
                setMessage('Sign up successful! Redirecting to login...');
                setTimeout(() => {
                    router.push('/');
                }, 1200);
            } else {
                setMessage(data.message || 'Sign up failed');
            }
        } catch (err) {
            setMessage('Failed to connect to signup service.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen text-white from-blue-900 to-black-700 bg-gradient-to-br px-4 py-8">
            <div className="bg-black/40 border border-white/15 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-6">
                    <span className="font-[Lovers-Quarrel] text-7xl text-white block leading-tight">
                        SpotMood
                    </span>
                    <h1 className="text-xl font-bold text-gray-200">Sign Up</h1>
                </div>

                <form className="space-y-3.5" onSubmit={handleSignUp}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-md text-white placeholder-gray-400 text-sm focus:outline-none focus:border-green-500"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-md text-white placeholder-gray-400 text-sm focus:outline-none focus:border-green-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-md text-white placeholder-gray-400 text-sm focus:outline-none focus:border-green-500"
                            placeholder="At least 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-md text-white placeholder-gray-400 text-sm focus:outline-none focus:border-green-500"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        className="w-full bg-green-900 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-800 transition-colors shadow mt-2"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-300">
                        Already have an account?{' '}
                        <Link href="/" className="text-green-400 hover:underline font-semibold ml-1">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}