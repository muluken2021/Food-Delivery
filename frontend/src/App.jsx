import React, { useState, useRef, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// User pages
import Home from "./page/Home";
import Cart from "./page/Cart";
import Login from "./page/Login";
import Checkout from "./page/Checkout";
import Contact from "./page/Contact";
import OrderSuccess from "./page/OrderSuccess";
import UserNavbar from "./component/Navbar";
import Footer from "./component/Footer";
import FoodMenue from "./page/FoodMenue";
import About from "./component/About";

// Admin pages & Components
import Add from "./page/Add";
import Order from "./page/Order";
import List from "./page/List";
import Edit from "./page/Edit";
import Users from "./page/Users";
import AdminOrders from "./page/AdminOrders";
import AdminPrivateRoute from "./component/PrivateRoute";
import Dashboard from "./page/Dashboard";
import ProfilePage from "./page/ProfilePage";
import Verify from "./page/Verify";
import AdminLayout from "./layouts/AdminLayout"; // The layout we created

// Global Utils
import ScrollToTop from "./component/ScrollToTop";

const App = () => {
  const [login, setLogin] = useState(false);
  const [role, setRole] = useState(null);
  const location = useLocation();

  const menuRef = useRef(null);
  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      setRole(user.role);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300">
      <ToastContainer />
      <ScrollToTop />

      <Routes>
        {/* --- ADMIN SECTION (Nested under AdminLayout) --- */}
        <Route
          element={
            <AdminPrivateRoute>
              <AdminLayout />
            </AdminPrivateRoute>
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/add" element={<Add />} />
          <Route path="/admin/order" element={<Order />} />
          <Route path="/admin/list" element={<List />} />
          <Route path="/admin/edit/:id" element={<Edit />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>

        {/* --- USER SECTION (Includes Navbar/Footer) --- */}
        <Route
          path="*"
          element={
            !isAdminRoute && (
              <>
                <UserNavbar 
                  scrollToMenu={scrollToMenu} 
                  login={login} 
                  setLogin={setLogin} 
                />
                <div className="mt-10 flex-1">
                  {login && <Login login={login} setLogin={setLogin} />}
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart login={login} setLogin={setLogin} />} />
                    <Route path="/menu" element={<FoodMenue />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/order" element={<Checkout />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/ordersuccess" element={<OrderSuccess />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/verify" element={<Verify />} />
                  </Routes>
                </div>
                <Footer />
              </>
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;