import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { profileService } from "@/services/profileService";
import { productService } from "@/services/productService";
import { orderService } from "@/services/orderService";

export default function Dashboard() {
    const [stats, setStats] = useState({
        customers: 0,
        products: 0,
        orders: 0,
        revenue: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadStats() {
            try {
                setLoading(true);
                setError("");

                const [customers, products, orders] = await Promise.all([
                    profileService.getAllProfiles(),
                    productService.getProducts(),
                    orderService.getOrders(),
                ]);

                const revenue = (orders || [])
                    .filter((order) => order.status === "completed")
                    .reduce((sum, order) => sum + Number(order.total_amount || 0), 0);

                setStats({
                    customers: customers?.length || 0,
                    products: products?.length || 0,
                    orders: orders?.length || 0,
                    revenue,
                });
            } catch (err) {
                setError(err.message || "Gagal memuat dashboard");
            } finally {
                setLoading(false);
            }
        }

        loadStats();
    }, []);

    return (
        <div>
            <PageHeader
                title="Dashboard"
                breadcrumb={["Dashboard"]}
                actionLabel="Add New"
            />

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <p className="text-sm text-gray-400 font-semibold">Total Customer</p>
                    <p className="text-3xl font-black text-gray-900 mt-3">{loading ? "..." : stats.customers}</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <p className="text-sm text-gray-400 font-semibold">Total Produk</p>
                    <p className="text-3xl font-black text-gray-900 mt-3">{loading ? "..." : stats.products}</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <p className="text-sm text-gray-400 font-semibold">Total Pesanan</p>
                    <p className="text-3xl font-black text-gray-900 mt-3">{loading ? "..." : stats.orders}</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <p className="text-sm text-gray-400 font-semibold">Total Revenue</p>
                    <p className="text-3xl font-black text-gray-900 mt-3">
                        {loading ? "..." : `Rp ${stats.revenue.toLocaleString("id-ID")}`}
                    </p>
                </div>
            </div>
        </div>
    );
}
