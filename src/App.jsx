import "./assets/tailwind.css";
import { Routes, Route } from "react-router-dom";
import React from "react";

// import Dashboard from "./pages/Dashboard";
// import Customers from "./pages/Customers";
// import Orders from "./pages/Orders";
// import NotFound from "./pages/NotFound";
// Import halaman form baru
// import AddOrder from "./pages/AddOrder";
// import AddCustomer from "./pages/AddCustomer";
// import MainLayout from "./layouts/MainLayout";
// import AuthLayout from "./layouts/AuthLayout";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Forgot from "./pages/auth/Forgot";
import { Suspense } from "react";
import Loading from "./components/Loading";

function App() {
  const Dashboard = React.lazy(() => import("./pages/Dashboard"))
  const Orders = React.lazy(() => import("./pages/Orders"))
  const Customers = React.lazy(() => import("./pages/Customers"))
  const NotFound = React.lazy(() => import("./pages/NotFound"))
  const AddOrder = React.lazy(() => import("./pages/AddOrder"))
  const AddCustomer = React.lazy(() => import("./pages/AddCustomer"))
  const Login = React.lazy(() => import("./pages/auth/Login"))
  const Register = React.lazy(() => import("./pages/auth/Register"))
  const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
  const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
  const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))
  // const Loading = React.lazy(() => import("./components/Loading"))
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
}

export default App;