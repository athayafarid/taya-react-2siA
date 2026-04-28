import "./assets/tailwind.css";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
// Import halaman form baru
import AddOrder from "./pages/AddOrder";
import AddCustomer from "./pages/AddCustomer";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";

function App() {
  return (

    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        {/* Tambahkan Route Form Disini */}
        <Route path="/add-order" element={<AddOrder />} />
        <Route path="/add-customer" element={<AddCustomer />} />

        <Route path="*" element={<NotFound />} />
      </Route>
      
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
      </Route>
    </Routes>

  );
}

export default App;