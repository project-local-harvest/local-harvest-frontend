'use client';
import { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import LoginBox from "@/app/dashboard/login/loginbox";
import SearchFilter from "@/app/component/serch_filter";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { getPlatformFertilizers } from '@/app/services/api';
import { CardShimmer } from '@/app/component/Shimmer';
import { FertilizerDetailsModal } from '@/app/component/FertilizerDetailsModal';

export default function Dashboard() {
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [fertilizers, setFertilizers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedFertilizerId, setSelectedFertilizerId] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const fetchFertilizers = async () => {
            try {
                const response = await getPlatformFertilizers();
                setFertilizers(response.data);
            } catch (error) {
                console.error('Failed to fetch fertilizers', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFertilizers();
    }, []);

    const handleAccessDashboard = () => {
        if (user) {
            if (user.role === 'admin') {
                router.push('/dashboard/admin');
            } else if (user.role === 'shop_owner') {
                router.push('/dashboard/shop');
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
            {/* Header */}
            <header className="bg-green-800 shadow px-6 py-6 relative">
                <div className="flex items-center justify-center space-x-4">
                    <img
                        src="/farmer.png"
                        alt="Farmer Logo"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <h1 className="text-xl sm:text-2xl text-blue-100 font-bold whitespace-nowrap">
                        <Typewriter
                            words={[
                                'আপনার ফসলের সেরা সার সন্ধান করুন',
                                'স্থানীয় দোকানগুলির সাথে সংযুক্ত হন',
                                'আপনার কৃষিকাজের প্রয়োজনের জন্য সেরা সার পান',
                            ]}
                            loop={0}
                            cursor
                            cursorStyle="|"
                            typeSpeed={60}
                            deleteSpeed={40}
                            delaySpeed={1500}
                        />
                    </h1>
                </div>

                {/* Login/Access Dashboard Button (top right) */}
                {!showLogin && (
                    <button
                        onClick={user ? handleAccessDashboard : () => setShowLogin(true)}
                        className="absolute top-4 right-6 bg-white text-green-800 px-4 py-2 rounded-md shadow hover:bg-gray-100"
                    >
                        {user ? 'Access Dashboard' : 'Login'}
                    </button>
                )}
            </header>

            {/* Search/Filter */}
            {!showLogin && (
                <main className="p-6 flex-1">
                    <SearchFilter
                        onSearch={(q) => console.log(q)}
                        onFilter={(v) => console.log(v)}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, index) => <CardShimmer key={index} />)
                        ) : (
                            fertilizers.map(fertilizer => (
                                <div key={fertilizer.id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={() => setSelectedFertilizerId(fertilizer.id)}>
                                    <img src={fertilizer.image_url} alt={fertilizer.name} className="w-full h-48 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold">{fertilizer.name}</h3>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </main>
            )}

            {selectedFertilizerId && (
                <FertilizerDetailsModal
                    fertilizerId={selectedFertilizerId}
                    onCancel={() => setSelectedFertilizerId(null)}
                />
            )}

            {/* Show login box when toggled */}
            {showLogin && (
                <main className="p-6 flex-1">
                    <LoginBox/>
                </main>
            )}


            {/* Footer */}
            <footer className="bg-white text-center text-sm py-4 shadow-inner mt-auto">
                © 2025 All rights reserved.
            </footer>
        </div>
    );
}
