import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { orderService } from "@/services/orderService";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await orderService.getOrders();
            setOrders(data || []);
        } catch (err) {
            setError(err.message || "Gagal memuat orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            setError("");
            await orderService.updateOrderStatus(id, status);
            await loadOrders();
        } catch (err) {
            setError(err.message || "Gagal mengubah status order");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <PageHeader 
                title="Orders" 
                breadcrumb={["Dashboard", "Orders"]} 
                actionLabel="Add Order" 
                actionLink="/add-order" 
            />
            
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Status</th>
                            <th>Total Price (Rp)</th>
                            <th>Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5">Loading...</td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan="5">Belum ada order.</td>
                            </tr>
                        ) : orders.map((order) => (
                            <tr key={order.id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td>{order.order_number}</td>
                                <td>{order.profiles?.full_name || order.profiles?.email || "-"}</td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(evt) => handleStatusChange(order.id, evt.target.value)}
                                        style={{ 
                                            color: order.status === 'completed' ? 'green' : order.status === 'cancelled' ? 'red' : 'orange',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td>{Number(order.total_amount || 0).toLocaleString('id-ID')}</td>
                                <td>{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
