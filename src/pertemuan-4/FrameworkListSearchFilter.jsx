import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("");

    const allTags = [...new Set(frameworkData.flatMap((item) => item.tags))];

    const filteredFrameworks = frameworkData.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = selectedTag === "" || item.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    const getColorScheme = (id) => {
        const colors = [
            "border-t-blue-500 bg-blue-500/10 text-blue-400",
            "border-t-emerald-500 bg-emerald-500/10 text-emerald-400",
            "border-t-purple-500 bg-purple-500/10 text-purple-400",
            "border-t-orange-500 bg-orange-500/10 text-orange-400",
            "border-t-rose-500 bg-rose-500/10 text-rose-400",
            "border-t-cyan-500 bg-cyan-500/10 text-cyan-400",
        ];
        const index = Math.abs(id - 1) % colors.length;
        return colors[index];
    };

    return (
        <div className="min-h-screen bg-[#0f172a] py-12 px-6 font-sans">
            <div className="max-w-5xl mx-auto">

                
                
                {/* 1. HEADER (Paling Atas & Tengah) */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">
                        <span className="text-[#00df9a]">Framework</span> Universe
                    </h1>
                    <p className="text-slate-400 text-sm">Eksplorasi ekosistem JavaScript modern</p>
                </div>

                {/* 2. SEARCH & FILTER (Di bawah Header) */}
                <div className="flex flex-col md:flex-row gap-4 mb-12">
                    <input
                        type="text"
                        placeholder="Search framework..."
                        className="w-full md:w-3/4 p-3 bg-[#1e293b] border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-slate-500 transition-all placeholder:text-slate-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        className="w-full md:w-1/4 p-3 bg-[#1e293b] border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-slate-500 cursor-pointer"
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                    >
                        <option value="">All Tags</option>
                        {allTags.sort().map((tag) => (
                            <option key={tag} value={tag}
                            >{tag
                            }</option>
                        ))}
                    </select>
                </div>

                {/* 3. GRID KARTU (Paling Bawah) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredFrameworks.length > 0 ? (
                        filteredFrameworks.map((item) => {
                            const theme = getColorScheme(item.id).split(' ');
                            return (
                                <div 
                                    key={item.id} 
                                    className={`relative border-t-2 ${theme[0]} bg-[#1e293b] p-8 rounded-xl shadow-2xl flex flex-col`}
                                >
                                    {/* ID Badge Bulat di Pojok Kanan Atas */}
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs font-bold border border-slate-600 shadow-xl">
                                        {item.id}
                                    </div>

                                    <h2 className="text-3xl font-bold text-white mb-2">{item.name}</h2>
                                    <p className="text-slate-400 text-sm mb-6 italic">"{item.description}"</p>

                                    <div className="mb-6">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mb-1">Developer</p>
                                        <p className="text-slate-200 font-semibold text-sm">
                                            {item.details.developer} <span className="text-slate-500 font-normal ml-1">({item.details.releaseYear})</span>
                                        </p>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="pt-4 border-t border-slate-700/50 mb-4">
                                            <a 
                                                href={item.details.officialWebsite}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-2"
                                            >
                                                Visit Official Website ↗
                                            </a>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {item.tags.map((tag, idx) => (
                                                <span 
                                                    key={idx} 
                                                    className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${theme[1]} ${theme[2]}`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-20 text-slate-500 border border-dashed border-slate-700 rounded-xl">
                            No frameworks found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}