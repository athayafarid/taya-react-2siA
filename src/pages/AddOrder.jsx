import PageHeader from "../components/PageHeader";

export default function AddOrder() {
    return (
        <div>
            <PageHeader 
                title="Add New Order" 
                breadcrumb={["Dashboard", "Orders", "Add Order"]} 
                actionLabel="Back to Orders"
                actionLink="/orders"
            />
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-3xl animate-in fade-in duration-500">
                <form className="flex flex-col gap-6">
                    {/* Order ID */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Order ID</label>
                        <input 
                            type="text" 
                            placeholder="Contoh: ORD-1031" 
                            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" 
                            required 
                        />
                    </div>

                    {/* Customer Name */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Customer Name</label>
                        <input 
                            type="text" 
                            placeholder="Masukkan nama customer" 
                            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" 
                            required 
                        />
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Status</label>
                        <select 
                            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-white" 
                            required
                        >
                            <option value="">-- Pilih Status --</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Total Price */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Total Price (Rp)</label>
                        <input 
                            type="number" 
                            placeholder="Contoh: 150000" 
                            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" 
                            required 
                        />
                    </div>

                    {/* Order Date */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Order Date</label>
                        <input 
                            type="date" 
                            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" 
                            required 
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-4">
                        <button 
                            type="submit" 
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-green-100 active:scale-95"
                        >
                            Save Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}