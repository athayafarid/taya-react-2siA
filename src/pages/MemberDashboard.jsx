import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { orderService } from "@/services/orderService";
import { membershipService } from "@/services/membershipService";

export default function MemberDashboard() {
    const { profile } = useAuth();
    const [orders, setOrders] = useState([]);
    const [histories, setHistories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMemberData() {
            try {
                setLoading(true);
                const [orderData, pointData] = await Promise.all([
                    orderService.getOrders(),
                    membershipService.getPointHistories(),
                ]);

                setOrders(orderData || []);
                setHistories(pointData || []);
            } finally {
                setLoading(false);
            }
        }

        loadMemberData();
    }, []);

    const totalTransactions = orders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard Member</h2>
                <p className="text-sm text-gray-500 mt-1">Ringkasan profil, poin, dan riwayat pesanan Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <p className="text-sm text-gray-500">Nama</p>
                    <p className="text-lg font-bold text-gray-800 mt-1">{profile?.full_name || "-"}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <p className="text-sm text-gray-500">Tier</p>
                    <p className="text-lg font-bold text-emerald-600 mt-1 capitalize">{profile?.tier || "bronze"}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <p className="text-sm text-gray-500">Total Poin</p>
                    <p className="text-lg font-bold text-gray-800 mt-1">{profile?.points || 0}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <p className="text-sm text-gray-500">Total Transaksi</p>
                    <p className="text-lg font-bold text-gray-800 mt-1">Rp {totalTransactions.toLocaleString("id-ID")}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="font-bold text-gray-800">Riwayat Pesanan</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Order</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr><td className="px-6 py-4 text-sm text-gray-500" colSpan="3">Loading...</td></tr>
                                ) : orders.length === 0 ? (
                                    <tr><td className="px-6 py-4 text-sm text-gray-500" colSpan="3">Belum ada pesanan.</td></tr>
                                ) : orders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{order.order_number}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 capitalize">{order.status}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">Rp {Number(order.total_amount || 0).toLocaleString("id-ID")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="font-bold text-gray-800">Riwayat Poin</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {loading ? (
                            <div className="px-6 py-4 text-sm text-gray-500">Loading...</div>
                        ) : histories.length === 0 ? (
                            <div className="px-6 py-4 text-sm text-gray-500">Belum ada histori poin.</div>
                        ) : histories.map((history) => (
                            <div key={history.id} className="px-6 py-4">
                                <p className="text-sm font-semibold text-gray-800">+{history.points} poin</p>
                                <p className="text-xs text-gray-500 mt-1">{history.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
