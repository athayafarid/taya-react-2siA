import frameworkData from "./framework.json";

export default function FrameworkList() {
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-2xl mx-auto">
                {frameworkData.map((item) => (
                    <div key={item.id} className="border p-6 mb-6 rounded-xl shadow-sm bg-white">
                        {/* Judul Framework */}
                        <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                        
                        {/* Deskripsi */}
                        <p className="text-gray-600 mt-1 mb-3">{item.description}</p>
                        
                        {/* Informasi Detail (Developer & Year) */}
                        <div className="text-sm text-gray-500 mb-2">
                            <p>
                                Developed by: <span className="font-medium text-gray-700">{item.details.developer}</span> ({item.details.releaseYear})
                            </p>
                            <a 
                                href={item.details.officialWebsite} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-600 hover:underline inline-block mt-1"
                            >
                                Visit Website
                            </a>
                        </div>

                        {/* Menampilkan Tags dengan map() */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {item.tags.map((tag, index) => (
                                <span 
                                    key={index} 
                                    className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-md border border-gray-200"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}