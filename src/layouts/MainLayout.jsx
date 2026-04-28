import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* SIDEBAR (KIRI) */}
            <Sidebar />

            {/* KANAN */}
            <div className="flex flex-col flex-1">

                {/* HEADER (ATAS) */}
                <Header />

                {/* CONTENT */}
                <div className="p-6">


                    <Outlet />
                </div>

            </div>
        </div>
    );
}