import React from 'react';
import { Link } from 'react-router-dom';
// Pastikan path import disesuaikan dengan lokasi file customers.json Anda
import customerData from '../data/customers.json';

const Customers = () => {
    // Fungsi untuk memberikan warna badge yang berbeda berdasarkan level loyalti
    const getLoyaltyBadgeClass = (loyalty) => {
        switch (loyalty) {
            case 'Bronze':
                return 'bg-orange-100 text-orange-700';
            case 'Silver':
                return 'bg-slate-200 text-slate-700';
            case 'Gold':
                return 'bg-yellow-100 text-yellow-700';
            case 'Platinum':
                return 'bg-indigo-100 text-indigo-700';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Halaman Customer</h2>
                <p className="text-sm text-gray-500 mt-1">Daftar pelanggan yang terdaftar di sistem kami.</p>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        {/* Table Head */}
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">No</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Nama Lengkap</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Alamat</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">Usia</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Loyalti</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-gray-100">
                            {customerData.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>

                                    <td className="px-6 py-4 text-sm font-medium">
                                        <Link to={`/customers/${item.id}`} className="text-blue-500 hover:text-blue-600 hover:underline">
                                            {item.nama}
                                        </Link>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className="max-w-xs truncate" title={item.alamat}>
                                            {item.alamat}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-600">{item.email}</td>

                                    <td className="px-6 py-4 text-sm text-gray-600 text-center">{item.usia}</td>

                                    {/* Loyalty Badge */}
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getLoyaltyBadgeClass(item.loyalti)}`}>
                                            {item.loyalti}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Customers;