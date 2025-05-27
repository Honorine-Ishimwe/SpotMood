import { useState } from "react";
import {getSession, useSession} from "next-auth/react";

export default function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!username){
            setMessage('Username cannot be empty.');
            setTimeout(() => setMessage(''), 3000);
            return;
        }
        if (password.length < 8) {
            setMessage('Password must be at least 8 characters long.');
            setTimeout(() => setMessage(''), 3000);
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setMessage('Please enter a valid email address.');
            setTimeout(() => setMessage(''), 3000);
            return;
        }
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            setTimeout(() => setMessage(''), 3000);
            return;
        }
        // continue with the signup process IFF all validations pass

        const response_ = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response_.json();
        if (data.success) {
            setMessage('Sign up successful!');
        } else {
            setMessage(data.message || 'Sign up failed');
        }
    }
    return(
       
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
            <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSignUp}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700">Username</label>
                    <input type="text" id="username" className="border rounded w-full py-2 px-3" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" id="email" className="border rounded w-full py-2 px-3" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input type="password" id="password" className="border rounded w-full py-2 px-3" />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                    <input type="password" id="confirmPassword" className="border rounded w-full py-2 px-3" />
                </div>
                <div className="mb-4">
                    <p className="text-red-500 text-center ">{message}</p>
                </div>
                <button type="button" onClick={handleSignUp}
                        className="bg-blue-400 text-white py-2 px-4 rounded-xl block mx-auto w-full hover:bg-blue-500 transition-colors">
                    Sign Up
                </button>
                <button type="button"
                        className="bg-blue-400 text-white py-2 px-4 rounded-xl block mx-auto mt-4 w-full hover:bg-blue-500 transition-colors ">
                    Sign Up with Spotify
                </button>
            </form>
        </div>
    )
}