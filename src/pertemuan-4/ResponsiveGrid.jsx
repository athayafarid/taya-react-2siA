import { useState } from "react";

export default function FthreeColorfulStore() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("All");
    const [cartCount, setCartCount] = useState(0);

    const colors = {
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

    const products = [
        {
            id: 1,
            name: "Essential Hoodie V.1",
            tags: ["Apparel", "Cotton 30s", "Unisex"],
            details: { price: "Rp 299k", stock: 15, rating: 4.8 },
        },
        {
            id: 2,
            name: "Urban Cargo Pants",
            tags: ["Apparel", "Waterproof", "Best Seller"],
            details: { price: "Rp 349k", stock: 8, rating: 4.9 },
        },
        {
            id: 3,
            name: "Canvas Totebag F3",
            tags: ["Accessories", "Eco-Friendly"],
            details: { price: "Rp 129k", stock: 20, rating: 4.7 },
        },
        {
            id: 4,
            name: "Daily Snapback V.2",
            tags: ["Accessories", "Adjustable"],
            details: { price: "Rp 159k", stock: 12, rating: 4.6 },
        },
    ];

    // 🔥 FILTER + SEARCH
    const filteredProducts = products.filter((item) => {
        const matchSearch = item.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchCategory =
            selectedTag === "All" || item.tags.includes(selectedTag);

        return matchSearch && matchCategory;
    });

    return (
        <div className="min-h-screen bg-sky-50 font-sans text-slate-900">

            {/* HEADER */}
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
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md">
                            Cart ({cartCount})
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">

                {/* HERO */}
                <section className="text-center mb-16 space-y-4 p-10 bg-white rounded-3xl border border-sky-100 shadow-xl">
                    <div className="inline-block px-4 py-1 bg-emerald-100 text-emerald-800 text-xs font-black uppercase rounded-full">
                        New Season Lab
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black leading-tight">
                        Gaya{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">
                            Adaptif
                        </span>{" "}
                        Berwarna
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Produk yang menyesuaikan gaya hidup modernmu.
                    </p>
                </section>

                {/* FILTER */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white p-6 rounded-2xl border border-sky-100">
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
                        {categories.map((cat, index) => {
                            const colorTag =
                                colors.tags[index % colors.tags.length];

                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedTag(cat)}
                                    className={`px-6 py-2 rounded-full text-xs font-bold border transition-all ${
                                        selectedTag === cat
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : `${colorTag}`
                                    }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>

                    <p className="text-xs text-slate-500">
                        Filtering: <b>{selectedTag}</b>
                    </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                    {filteredProducts.length === 0 && (
                        <p className="col-span-full text-center text-slate-400">
                            Produk tidak ditemukan 😢
                        </p>
                    )}

                    {filteredProducts.map((item) => {
                        const colorScheme =
                            colors.cardAccents[
                                item.id % colors.cardAccents.length
                            ];

                        return (
                            <div
                                key={item.id}
                                className={`group border-l-4 ${colorScheme} p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all`}
                            >
                                <div className="aspect-square bg-slate-100 rounded-xl mb-6 flex items-center justify-center text-4xl font-black text-slate-300">
                                    F3
                                </div>

                                <h3 className="font-bold text-lg">
                                    {item.name}
                                </h3>

                                <p className="text-xs text-slate-500 mb-3">
                                    Stock: {item.details.stock} | ⭐{" "}
                                    {item.details.rating}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {item.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className={`text-[10px] px-2 py-1 rounded-full border ${
                                                colors.tags[
                                                    i % colors.tags.length
                                                ]
                                            }`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-blue-600">
                                        {item.details.price}
                                    </span>

                                    <button
                                        onClick={() =>
                                            setCartCount(cartCount + 1)
                                        }
                                        className="bg-black text-white w-8 h-8 rounded-lg"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* FOOTER */}
            <footer className="bg-white border-t py-10 text-center mt-20">
                <p className="font-bold text-blue-600">
                    FTHREE<span className="text-emerald-500">.</span>STORE
                </p>
                <p className="text-xs text-slate-400">
                    © 2026 All Rights Reserved
                </p>
            </footer>
        </div>
    );
}