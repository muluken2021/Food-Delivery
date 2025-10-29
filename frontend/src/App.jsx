import React, { useState, useRef, useEffect, useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context
import { ThemeContext } from "./context/ThemeContext";
import { ThemeContext2 } from './context/ThemeContext2';

// User pages
import Home from "./page/Home";
import Cart from "./page/Cart";
import Login from "./page/Login";
import Placeorder from "./page/Placeorder";
import Contact from "./page/Contact";
import OrderSuccess from "./page/OrderSuccess";
import OrderPage from "./page/OrderPage";
import OrderHistory from "./component/OrderHistory";
import UserNavbar from "./component/Navbar";
import Footer from "./component/Footer";
import FoodMenue from "./page/FoodMenue";
import About from "./component/About";

// Admin pages
import Add from "./page/Add";
import Order from "./page/Order";
import List from "./page/List";
import Edit from "./page/Edit";
import Users from "./page/Users";
import AdminOrders from "./page/AdminOrders";
import AdminPrivateRoute from "./component/PrivateRoute";
import AdminNavbar from "./component/AdminNavbar";
import Sidebar from "./component/Sidebar";
import Dashboard from "./page/Dashboard";

const App = () => {
  const { theme } = useContext(ThemeContext);
  const { isDark } = useContext(ThemeContext2);
  const [login, setLogin] = useState(false); // controls login modal visibility
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState(null);
  const location = useLocation();

  // For scrolling to menu section (user side)
  const menuRef = useRef(null);
  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Check if we are in admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Check localStorage for token and role
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      setRole(user.role);
    }
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0c0c0c] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <ToastContainer />

      {/* Admin Layout */}
      {isAdminRoute ? (
        <>
          <AdminNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div className={`flex flex-1 ${
              isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
            }`}>
            
              <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            
            <div className="sm:ml-60 flex-1 p-4">
              <Routes>
                
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminPrivateRoute>
                      <Dashboard />
                    </AdminPrivateRoute>
                  }
                />
                <Route
                  path="/admin/add"
                  element={
                    <AdminPrivateRoute>
                      <Add />
                    </AdminPrivateRoute>
                  }
                />
                
                <Route
                  path="/admin/order"
                  element={
                    <AdminPrivateRoute>
                      <Order />
                    </AdminPrivateRoute>
                  }
                />
                <Route
                  path="/admin/list"
                  element={
                    <AdminPrivateRoute>
                      <List />
                    </AdminPrivateRoute>
                  }
                />
                <Route
                  path="/admin/edit/:id"
                  element={
                    <AdminPrivateRoute>
                      <Edit />
                    </AdminPrivateRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <AdminPrivateRoute>
                      <Users />
                    </AdminPrivateRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <AdminPrivateRoute>
                      <AdminOrders />
                    </AdminPrivateRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        // User Layout
        <>
          {/* Navbar */}
          <UserNavbar scrollToMenu={scrollToMenu} login={login} setLogin={setLogin} />
          
          <div className="mt-10">
          {/* Login modal only shows when user clicks login/signup */}
          {login && <Login login={login} setLogin={setLogin} />}

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home setLogin={setLogin} menuRef={menuRef} scrollToMenu={scrollToMenu} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/menu" element={<FoodMenue />} />
            <Route path="/about" element={<About />} />
            <Route path="/orderpage" element={<OrderPage />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
            <Route path="/order" element={<Placeorder />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ordersuccess" element={<OrderSuccess />} />
          </Routes>

          <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
