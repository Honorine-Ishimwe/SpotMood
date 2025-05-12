import { useState } from "react";


export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setMessage('Fields cannot be empty.');
            return;
        }
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
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
                <button type="submit" className="bg-blue-400 text-white py-2 px-4 rounded-xl block mx-auto">
                    Sign Up
                </button>
                <button type="button" className="bg-blue-400 text-white py-2 px-4 rounded-xl block mx-auto mt-4">
                    Sign Up with Google
                </button>
            </form>
        </div>
    )
}