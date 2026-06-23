import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { orderService } from "@/services/orderService";
import { productService } from "@/services/productService";
import { profileService } from "@/services/profileService";

export default function AddOrder() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        userId: "",
        productId: "",
        quantity: 1,
        status: "pending",
    });

    useEffect(() => {
        async function loadOptions() {
            try {
                const [customerData, productData] = await Promise.all([
                    profileService.getAllProfiles(),
                    productService.getProducts(),
                ]);

                setCustomers(customerData || []);
                setProducts(productData || []);
            } catch (err) {
                setError(err.message || "Gagal memuat data form");
            }
        }

        loadOptions();
    }, []);

    const selectedProduct = products.find((product) => product.id === form.productId);
    const totalPrice = Number(selectedProduct?.price || 0) * Number(form.quantity || 0);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (!selectedProduct) {
            setError("Pilih produk terlebih dahulu");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const order = await orderService.createOrder({
                userId: form.userId,
                items: [{
                    product_id: selectedProduct.id,
                    quantity: Number(form.quantity),
                    unit_price: Number(selectedProduct.price),
                }],
            });

            if (form.status !== "pending") {
                await orderService.updateOrderStatus(order.id, form.status);
            }

            navigate("/orders");
        } catch (err) {
            setError(err.message || "Gagal menyimpan order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <PageHeader 
                title="Add New Order" 
                breadcrumb={["Dashboard", "Orders", "Add Order"]} 
                actionLabel="Back to Orders"
                actionLink="/orders"
            />
            
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-3xl animate-in fade-in duration-500">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Order ID */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Customer</label>
                        <select
                            name="userId"
                            value={form.userId}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-white"
                            required
                        >
                            <option value="">-- Pilih Customer --</option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.full_name || customer.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Customer Name */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Product</label>
                        <select
                            name="productId"
                            value={form.productId}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-white"
                            required
                        >
                            <option value="">-- Pilih Produk --</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name} - Rp {Number(product.price || 0).toLocaleString("id-ID")}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Status</label>
                        <select 
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-white" 
                            required
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Total Price */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Quantity</label>
                        <input 
                            type="number"
                            name="quantity"
                            min="1"
                            value={form.quantity}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" 
                            required 
                        />
                    </div>

                    {/* Order Date */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Total Price (Rp)</label>
                        <input 
                            type="text" 
                            value={totalPrice.toLocaleString("id-ID")}
                            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" 
                            readOnly
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-4">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-green-100 active:scale-95"
                        >
                            {loading ? "Saving..." : "Save Order"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
