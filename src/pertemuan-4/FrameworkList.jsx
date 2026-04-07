import frameworkData from "./framework.json";

export default function FrameworkList() {
    // Helper function untuk memberikan warna berbeda berdasarkan ID
    const getColorScheme = (id) => {
        const colors = [
            "border-t-blue-500 bg-blue-50 text-blue-700",
            "border-t-emerald-500 bg-emerald-50 text-emerald-700",
            "border-t-purple-500 bg-purple-50 text-purple-700",
            "border-t-orange-500 bg-orange-50 text-orange-700",
            "border-t-rose-500 bg-rose-50 text-rose-700",
            "border-t-cyan-500 bg-cyan-50 text-cyan-700",
        ];
        return colors[(id - 1) % colors.length];
    };

    return (
        <div className="min-h-screen bg-slate-900 py-12 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                            Framework
                        </span> Universe
                    </h1>
                    <p className="text-slate-400">Eksplorasi ekosistem JavaScript modern</p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {frameworkData.map((item) => {
                        const theme = getColorScheme(item.id);
                        return (
                            <div 
                                key={item.id} 
                                className={`relative border-t-4 ${theme.split(' ')[0]} bg-slate-800 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group`}
                            >
                                {/* Badge ID */}
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-slate-900">
                                    {item.id}
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                    {item.name}
                                </h2>
                                
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed h-10 overflow-hidden">
                                    {item.description}
                                </p>

                                <div className="space-y-1 mb-6">
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Developer</p>
                                    <p className="text-slate-200 font-medium">
                                        {item.details.developer} 
                                        <span className="ml-2 text-slate-500 font-normal">({item.details.releaseYear})</span>
                                    </p>
                                </div>

                                {/* Action Area */}
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700">
                                    <a 
                                        href={item.details.officialWebsite}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                    >
                                        Visit Website ↗
                                    </a>
                                </div>

                                {/* Tags Area */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {item.tags.map((tag, index) => (
                                        <span 
                                            key={index} 
                                            className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md bg-opacity-10 ${theme.split(' ')[1]} ${theme.split(' ')[2]}`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}