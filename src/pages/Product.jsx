import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '@/services/productService';

const Produk = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true);
                setError("");
                const data = await productService.getProducts();
                setProducts(data || []);
            } catch (err) {
                setError(err.message || "Gagal memuat produk");
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Halaman Produk</h2>
                <p className="text-sm text-gray-500 mt-1">Daftar produk yang tersedia di sistem kami.</p>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        {/* Table Head */}
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">No</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Title</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Code</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Brand</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Price</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Stock</th>
                            </tr>
                        </thead>
                        
                        {/* Table Body */}
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td className="px-6 py-4 text-sm text-gray-500" colSpan="7">Loading...</td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td className="px-6 py-4 text-sm text-gray-500" colSpan="7">Belum ada produk.</td>
                                </tr>
                            ) : products.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                                    
                                    <td className="px-6 py-4 text-sm font-medium">
                                        <Link to={`/products/${item.id}`} className="text-emerald-500 hover:text-emerald-600 hover:underline">
                                            {item.name}
                                        </Link>
                                    </td>
                                    
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.id.slice(0, 8)}</td>
                                    
                                    {/* Category Badge */}
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                            -
                                        </span>
                                    </td>
                                    
                                    <td className="px-6 py-4 text-sm text-gray-600">-</td>
                                    
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                        Rp {Number(item.price || 0).toLocaleString('id-ID')}
                                    </td>
                                    
                                    {/* Dynamic Stock Color (Merah jika <= 15) */}
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`font-medium ${item.stock <= 15 ? 'text-red-500' : 'text-emerald-500'}`}>
                                            {item.stock}
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

export default Produk;
