'use client';
import Link from 'next/link';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { login } from '@/app/services/api';


export default function LoginBox() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleLogin = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }
        setLoading(true);
        try {
            const response = await login({ email, password });
            const { user, access_token } = response.data;

            if (user && access_token) {
                localStorage.setItem('token', access_token);
                localStorage.setItem('user', JSON.stringify(user));

                if (user.role === 'admin') {
                    router.push('/dashboard/admin');
                } else if (user.role === 'shop_owner') {
                    router.push('/dashboard/shop');
                }
            } else {
                alert('Login failed: Invalid response from server.');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">আপনার অ্যাকাউন্টে লগইন করুন</h2>
                <form onSubmit={handleLogin}>
                    {/* Email */}
                    <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">ইমেল</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Password */}
                <div className="mb-6 relative">
                    <label className="block text-sm font-medium text-gray-600 mb-1">পাসওয়ার্ড</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div
                        className="absolute right-3 top-9 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                            <EyeIcon className="h-5 w-5" />
                        )}
                    </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition font-semibold"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {/* Optional: Footer Links */}
                <div className="text-sm text-center mt-4 text-gray-600">
                    Don’t have an account?{' '}
                    <Link href="/register" className="text-green-700 underline">
                        Register
                    </Link>

                </div>
            </div>
        </div>

    );

}
