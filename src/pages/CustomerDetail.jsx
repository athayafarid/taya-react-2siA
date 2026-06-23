import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { profileService } from "@/services/profileService";

export default function CustomerDetail() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadCustomer() {
            try {
                const data = await profileService.getProfileById(id);
                setCustomer(data);
            } catch {
                setError("Data customer tidak ditemukan.");
            }
        }

        loadCustomer();
    }, [id]);

    // Fungsi untuk memberikan gaya gradasi mewah pada badge loyalti
    const getLoyaltyStyle = (loyalty) => {
        switch (loyalty) {
            case 'gold':
                return 'bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-600 text-yellow-950 border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.3)]';
            case 'platinum':
                return 'bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 text-slate-900 border-slate-300 shadow-[0_0_15px_rgba(148,163,184,0.3)]';
            case 'silver':
                return 'bg-gradient-to-r from-gray-100 via-gray-300 to-gray-400 text-gray-800 border-gray-300';
            case 'bronze':
                return 'bg-gradient-to-r from-orange-200 via-orange-400 to-orange-600 text-orange-950 border-orange-400';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-300';
        }
    };

    if (error) return <div className="text-red-500 p-8 text-center font-medium bg-zinc-900 min-h-screen">{error}</div>;
    if (!customer) return <div className="p-8 text-center text-yellow-500 bg-zinc-900 min-h-screen">Loading VIP Data...</div>;

    return (
        // Latar belakang utama bernuansa gelap
        <div className="min-h-screen bg-zinc-900 p-6 md:p-12 font-sans selection:bg-yellow-500 selection:text-zinc-900">
            <div className="max-w-3xl mx-auto">

                {/* Tombol Kembali */}
                <Link to="/customers" className="group flex items-center gap-2 text-yellow-500/80 hover:text-yellow-400 mb-8 transition-colors w-fit">
                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-medium tracking-wide">Kembali ke Daftar Customer</span>
                </Link>

                {/* Card Container - Efek Mewah */}
                <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-yellow-500/20">

                    {/* --- BAGIAN ATAS (Silver/Light Section) --- */}
                    <div className="bg-gradient-to-br from-[#f8f9fa] via-[#e9ecef] to-[#ced4da] px-8 py-10 flex flex-col sm:flex-row items-center gap-8 border-b-[3px] border-[#c5a059]">
                        {/* Foto Profil dengan Ring Emas */}
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-300 blur-sm opacity-50"></div>
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(customer.full_name || customer.email)}&size=200&background=27272a&color=eab308&bold=true`}
                                alt={customer.full_name || customer.email}
                                className="relative rounded-full w-28 h-28 object-cover ring-4 ring-[#c5a059] shadow-xl"
                            />
                        </div>

                        {/* Nama & Badge */}
                        <div className="text-center sm:text-left">
                            <h2 className="text-3xl sm:text-4xl font-serif text-zinc-800 font-bold mb-3 tracking-tight">
                                {customer.full_name || customer.email}
                            </h2>
                            <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase border ${getLoyaltyStyle(customer.tier)}`}>
                                {customer.tier} MEMBER
                            </div>
                        </div>
                    </div>

                    {/* --- BAGIAN BAWAH (Dark Section) --- */}
                    <div className="bg-[#1c1c1c] px-8 py-10 relative overflow-hidden">

                        {/* Watermark Ornamen Motif (Opsional, agar tidak terlalu polos) */}
                        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                <path d="M2 12h20"></path>
                            </svg>
                        </div>

                        <h3 className="text-[#c5a059] text-xs font-bold uppercase tracking-[0.2em] mb-6">Informasi Pribadi</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">

                            {/* Kotak Email */}
                            <div className="border border-[#c5a059]/30 rounded-xl p-5 bg-white/[0.02] backdrop-blur-sm hover:border-[#c5a059]/60 transition-colors">
                                <div className="flex items-center gap-3 text-[#c5a059] mb-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm font-medium tracking-wide">Email Address</span>
                                </div>
                                <p className="text-gray-300 font-light text-lg pl-8">{customer.email}</p>
                            </div>

                            {/* Kotak Usia */}
                            <div className="border border-[#c5a059]/30 rounded-xl p-5 bg-white/[0.02] backdrop-blur-sm hover:border-[#c5a059]/60 transition-colors">
                                <div className="flex items-center gap-3 text-[#c5a059] mb-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm font-medium tracking-wide">Poin</span>
                                </div>
                                <p className="text-gray-300 font-light text-lg pl-8">{customer.points} Poin</p>
                            </div>

                            {/* Kotak Alamat */}
                            <div className="md:col-span-2 border border-[#c5a059]/30 rounded-xl p-5 bg-white/[0.02] backdrop-blur-sm hover:border-[#c5a059]/60 transition-colors">
                                <div className="flex items-center gap-3 text-[#c5a059] mb-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-sm font-medium tracking-wide">Role</span>
                                </div>
                                <p className="text-gray-300 font-light text-lg pl-8 leading-relaxed capitalize">{customer.role}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
