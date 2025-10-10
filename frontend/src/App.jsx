import React, { useState, useRef, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as jwt_decode from "jwt-decode";

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

const App = () => {
  const [login, setLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // For scrolling to menu section (user side)
  const menuRef = useRef(null);
  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Check if we are in admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  if (token && user) {
    setRole(user.role);
    setLogin(true);
  } else {
    setLogin(false);
    setRole(null);
  }
}, []);



  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />

      {/* Admin Layout */}
      {isAdminRoute ? (
        <>
          <AdminNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <div className="flex flex-1">
            <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div className="flex-1 p-4">
              <Routes>
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
          <UserNavbar
            scrollToMenu={scrollToMenu}
            login={login}
            setLogin={setLogin}
          />
          {login && <Login login={login} setLogin={setLogin} />}

          <Routes>
            <Route
              path="/"
              element={<Home menuRef={menuRef} scrollToMenu={scrollToMenu} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orderpage" element={<OrderPage />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
            <Route path="/order" element={<Placeorder />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ordersuccess" element={<OrderSuccess />} />
          </Routes>

          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
