import { FaFire, FaRegClock, FaStar, FaArrowUp, FaCheckCircle } from "react-icons/fa";
import { MdOutlineFastfood, MdDeliveryDining } from "react-icons/md";

export default function Dashboard() {
    return (
        <div id="dashboard-container" className="p-8 md:p-10 animate-in fade-in duration-700 bg-gray-50/50 min-h-screen">
            
            {/* Header Dashboard Sederhana */}
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">Overview</h2>
                    <p className="text-sm text-gray-500 mt-1">Pantau aktivitas restoranmu hari ini</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-gray-600">Terhubung ke Dapur</span>
                </div>
            </div>

            {/* 1. NEW STAT CARDS: 3 Kolom dengan Indikator Trend */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <TrendCard title="Pendapatan Hari Ini" value="$1,240" trend="+12.5%" icon={<MdOutlineFastfood />} color="green" />
                <TrendCard title="Pesanan Aktif" value="42" trend="+5.2%" icon={<FaRegClock />} color="orange" />
                <TrendCard title="Rating Pelanggan" value="4.8" trend="+0.2" icon={<FaStar />} color="yellow" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 2. FITUR BARU: LIVE ORDER QUEUE (Menggantikan Chart) */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Live Order Queue</h3>
                        <button className="text-xs font-bold text-green-600 hover:text-green-700">Lihat Semua</button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                    <th className="pb-4 font-semibold">Order ID</th>
                                    <th className="pb-4 font-semibold">Menu Utama</th>
                                    <th className="pb-4 font-semibold">Status</th>
                                    <th className="pb-4 font-semibold text-right">Waktu</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <OrderRow id="#ORD-092" menu="Nasi Goreng Spesial (x2)" status="Memasak" time="2 mnt lalu" />
                                <OrderRow id="#ORD-091" menu="Ayam Bakar Madu" status="Siap Saji" time="12 mnt lalu" />
                                <OrderRow id="#ORD-090" menu="Es Teh Manis, Kentang" status="Diantar" time="25 mnt lalu" />
                                <OrderRow id="#ORD-089" menu="Sate Ayam Madura" status="Selesai" time="40 mnt lalu" />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 3. FITUR BARU: TRENDING MENU (Menggantikan System Log) */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <FaFire className="text-orange-500 text-xl" />
                        <h3 className="text-lg font-bold text-gray-800">Trending Menu</h3>
                    </div>

                    <div className="space-y-6">
                        <TrendingItem name="Nasi Goreng Spesial" sold="124" percentage={85} color="bg-orange-500" />
                        <TrendingItem name="Ayam Bakar Madu" sold="98" percentage={65} color="bg-green-500" />
                        <TrendingItem name="Sate Ayam Madura" sold="76" percentage={50} color="bg-yellow-400" />
                        <TrendingItem name="Es Kopi Susu" sold="142" percentage={90} color="bg-blue-400" />
                    </div>

                    <button className="w-full mt-8 py-3 bg-gray-50 text-gray-500 text-xs font-bold rounded-xl hover:bg-gray-100 transition-colors">
                        Kelola Stok Menu
                    </button>
                </div>

            </div>
        </div>
    );
}

// Komponen Pendukung untuk Stat Card Baru
function TrendCard({ title, value, trend, icon, color }) {
    const colorThemes = {
        green: "bg-green-100 text-green-600",
        orange: "bg-orange-100 text-orange-600",
        yellow: "bg-yellow-100 text-yellow-500"
    };

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4 transition-transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
                <div className={`w-12 h-12 flex items-center justify-center rounded-2xl text-2xl ${colorThemes[color]}`}>
                    {icon}
                </div>
                <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg text-green-600 text-[10px] font-bold">
                    <FaArrowUp />
                    <span>{trend}</span>
                </div>
            </div>
            <div>
                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</h4>
                <span className="text-3xl font-black text-gray-800">{value}</span>
            </div>
        </div>
    );
}

// Komponen Pendukung untuk Tabel Order
function OrderRow({ id, menu, status, time }) {
    const getStatusStyle = (s) => {
        switch(s) {
            case "Memasak": return "bg-orange-100 text-orange-600";
            case "Siap Saji": return "bg-green-100 text-green-600";
            case "Diantar": return "bg-blue-100 text-blue-600";
            default: return "bg-gray-100 text-gray-500";
        }
    };

    return (
        <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td className="py-4 font-bold text-gray-700">{id}</td>
            <td className="py-4 text-gray-600 font-medium">{menu}</td>
            <td className="py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(status)}`}>
                    {status}
                </span>
            </td>
            <td className="py-4 text-right text-xs text-gray-400 font-bold">{time}</td>
        </tr>
    );
}

// Komponen Pendukung untuk Trending Menu
function TrendingItem({ name, sold, percentage, color }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
                <span className="font-bold text-gray-700">{name}</span>
                <span className="text-xs text-gray-400 font-medium">{sold} pesanan</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div style={{ width: `${percentage}%` }} className={`h-full ${color} rounded-full`}></div>
            </div>
        </div>
    );
}