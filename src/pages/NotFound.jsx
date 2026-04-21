import { FaHome } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
            <div className="text-center max-w-lg mx-auto animate-in fade-in zoom-in-95 duration-700">
                
                {/* Efek Teks 404 Besar dengan Gradasi */}
                <h1 className="text-[10rem] font-black leading-none bg-gradient-to-br from-green-400 to-green-600 bg-clip-text text-transparent select-none drop-shadow-sm">
                    404
                </h1>
                
                {/* Pesan Error */}
                <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
                    Oops! Halaman Tidak Ditemukan
                </h2>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Maaf, halaman yang Anda cari mungkin telah dihapus, namanya diubah, atau sementara tidak tersedia. Mari kembali ke jalan yang benar!
                </p>
                
                {/* Tombol Kembali (Bisa disesuaikan dengan React Router) */}
                <a 
                    href="/" 
                    className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-green-500/30 transition-all hover:-translate-y-1 hover:shadow-green-500/50"
                >
                    <FaHome className="text-lg" />
                    Kembali ke Beranda
                </a>
                
            </div>
            
            {/* Dekorasi Latar Belakang Tambahan (Opsional) */}
            <div className="fixed top-[-10%] left-[-10%] w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 z-[-1]"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 z-[-1]"></div>
        </div>
    );
}