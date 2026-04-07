import { useState } from "react";

export default function FthreeColorfulStore() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("All");

    // Palet warna ceria yang konsisten
    const colors = {
        primary: "from-blue-500 to-indigo-600", // untuk hero & CTA
        tags: [
            "bg-emerald-100 text-emerald-800 border-emerald-200",
            "bg-amber-100 text-amber-800 border-amber-200",
            "bg-rose-100 text-rose-800 border-rose-200",
            "bg-violet-100 text-violet-800 border-violet-200",
        ],
        cardAccents: [
            "border-blue-500 bg-blue-50/50",
            "border-emerald-500 bg-emerald-50/50",
            "border-purple-500 bg-purple-50/50",
            "border-orange-500 bg-orange-50/50",
            "border-rose-500 bg-rose-50/50",
            "border-cyan-500 bg-cyan-50/50",
        ],
    };

    const categories = ["All", "Apparel", "Accessories", "Footwear"];

    // Simulasi data produk Fthree dengan Nested details & Array tags
    const products = [
        {
            id: 1, name: "Essential Hoodie V.1",
            tags: ["Apparel", "Cotton 30s", "Unisex"],
            details: { price: "Rp 299k", stock: 15, rating: 4.8 }
        },
        {
            id: 2, name: "Urban Cargo Pants",
            tags: ["Apparel", "Waterproof", "Best Seller"],
            details: { price: "Rp 349k", stock: 8, rating: 4.9 }
        },
        {
            id: 3, name: "Canvas Totebag F3",
            tags: ["Accessories", "Eco-Friendly"],
            details: { price: "Rp 129k", stock: 20, rating: 4.7 }
        },
        {
            id: 4, name: "Daily Snapback V.2",
            tags: ["Accessories", "Adjustable"],
            details: { price: "Rp 159k", stock: 12, rating: 4.6 }
        },
    ];

    return (
        // Background utama yang lebih hangat (sky-50)
        <div className="min-h-screen bg-sky-50 font-sans text-slate-900">

            {/* 1. Navigasi & Header Colorful */}
            <header className="bg-white border-b border-sky-100 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h1 className="text-3xl font-black tracking-tighter text-blue-600">
                        FTHREE<span className="text-indigo-500">.</span>STORE
                    </h1>

                    <div className="flex w-full md:w-auto gap-2">
                        <input
                            type="text"
                            placeholder="Cari gaya Fthree-mu..."
                            className="flex-grow md:w-64 px-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-blue-400 focus:bg-white outline-none transition-all"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-700 hover:scale-105 transition-all shadow-md shadow-blue-200">
                            Cart (0)
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* 2. Hero Section - Lebih Bold & Vibrant */}
                <section className="text-center mb-16 space-y-4 p-10 bg-white rounded-3xl border border-sky-100 shadow-xl shadow-sky-100/30">
                    <div className="inline-block px-4 py-1 bg-emerald-100 text-emerald-800 text-xs font-black uppercase rounded-full">New Season Lab</div>
                    <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                        Gaya <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">Adaptif</span> Berwarna
                    </h2>
                    <p className="text-slate-600 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Selamat datang di laboratorium gaya kami! Di sini, produk tidak hanya diam—mereka dirancang untuk menyesuaikan diri dengan dinamika harimu.
                    </p>
                </section>

                {/* 3. Filter Section - Tombol Lebih Ceria */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                        {categories.map((cat, index) => {
                            // Mengambil warna berbeda berdasarkan index
                            const colorTag = colors.tags[index % colors.tags.length];
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedTag(cat)}
                                    className={`px-6 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all duration-300 border hover:-translate-y-0.5 ${selectedTag === cat
                                            ? `bg-blue-600 text-white shadow-lg shadow-blue-200 border-blue-600`
                                            : `bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-400`
                                        }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                        Filtering: <span className="text-slate-900">{selectedTag} Collection</span>
                    </p>
                </div>

                {/* 4. Product Grid - Dinamis & Full Warna */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((item, index) => {
                        // Memberikan aksen warna berbeda untuk setiap kartu berdasarkan modulo
                        const colorScheme = colors.cardAccents[index % colors.cardAccents.length];

                        return (
                            <div
                                key={item.id}
                                className={`group border-l-4 ${colorScheme.split(' ')[0]} ${colorScheme.split(' ')[1]} p-6 rounded-2xl shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 hover:bg-white`}
                            >
                                <div className="aspect-square bg-slate-100 rounded-xl mb-6 overflow-hidden relative flex items-center justify-center border border-slate-200">
                                    <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm text-blue-600 border border-slate-100">
                                        F3 Lab Product
                                    </div>
                                    {/* Simulasi Gambar Produk */}
                                    <div className="w-full h-full flex items-center justify-center text-slate-300 font-black text-6xl group-hover:scale-110 group-hover:text-blue-200 transition-all duration-500">
                                        F3
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="font-extrabold text-xl text-slate-900 group-hover:text-blue-700 transition-colors">
                                        {item.name}
                                    </h3>

                                    {/* Mengakses Nested details dengan dot notation */}
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                                        Price: {item.details.price} | Stock: {item.details.stock} | ⭐ {item.details.rating}
                                    </p>

                                    {/* Mapping data Array tags */}
                                    <div className="flex flex-wrap gap-2 pt-2 mb-6">
                                        {item.tags.map((tag, tagIndex) => {
                                            // Menggunakan warna tag yang dinamis
                                            const tagColor = colors.tags[tagIndex % colors.tags.length];
                                            return (
                                                <span key={tagIndex} className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${tagColor}`}>
                                                    {tag}
                                                </span>
                                            );
                                        })}
                                    </div>

                                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-200/50">
                                        <span className="text-blue-600 font-black text-2xl group-hover:text-emerald-500 transition-colors">
                                            {item.details.price}
                                        </span>
                                        <button className="h-10 w-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:scale-110 shadow-md shadow-slate-300 transition-all active:scale-95">
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Footer sederhana */}
            <footer className="bg-white border-t border-sky-100 py-12 px-6 mt-20">
                <div className="max-w-7xl mx-auto text-center space-y-4">
                    <p className="font-black text-2xl text-blue-600">FTHREE<span className="text-emerald-500">.</span>STORE</p>
                    <p className="text-slate-400 text-xs tracking-widest uppercase">© 2026 Fthree Digital Lab. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}