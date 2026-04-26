import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import "./assets/tailwind.css";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
// Import halaman form baru
import AddOrder from "./pages/AddOrder";
import AddCustomer from "./pages/AddCustomer";

function App() {
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
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            
            {/* Tambahkan Route Form Disini */}
            <Route path="/add-order" element={<AddOrder />} />
            <Route path="/add-customer" element={<AddCustomer />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;