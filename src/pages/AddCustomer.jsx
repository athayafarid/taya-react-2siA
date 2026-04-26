import PageHeader from "../components/PageHeader";

export default function AddCustomer() {
    return (
        <div>
            <PageHeader 
                title="Add New Customer" 
                breadcrumb={["Dashboard", "Customers", "Add Customer"]} 
                actionLabel="Back to Customers"
                actionLink="/customers"
            />
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-3xl animate-in fade-in duration-500">
                <form className="flex flex-col gap-6">
                    {/* Customer ID */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Customer ID</label>
                        <input 
                            type="text" 
                            placeholder="Contoh: CUST-031" 
                            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" 
                            required 
                        />
                    </div>

                    {/* Customer Name */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Customer Name</label>
                        <input 
                            type="text" 
                            placeholder="Masukkan nama lengkap" 
                            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" 
                            required 
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Email</label>
                        <input 
                            type="email" 
                            placeholder="contoh@email.com" 
                            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" 
                            required 
                        />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Phone</label>
                        <input 
                            type="text" 
                            placeholder="Contoh: 08123456789" 
                            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all" 
                            required 
                        />
                    </div>

                    {/* Loyalty Level */}
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-700">Loyalty Level</label>
                        <select 
                            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-white" 
                            required
                        >
                            <option value="">-- Pilih Level --</option>
                            <option value="Bronze">Bronze</option>
                            <option value="Silver">Silver</option>
                            <option value="Gold">Gold</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-4">
                        <button 
                            type="submit" 
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-green-100 active:scale-95"
                        >
                            Save Customer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}