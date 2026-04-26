import { FaHome } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <h1 className="text-6xl font-black text-green-500">404</h1>
            <h2 className="text-xl font-bold text-gray-800 mt-4">
                Oops! Halaman Tidak Ditemukan
            </h2>
            <p className="text-gray-400 mt-2 max-w-md">
                Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
            </p>

            <a
                href="/"
                className="mt-6 px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition"
            >
                Kembali ke Dashboard
            </a>
        </div>
    );
}