import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Navbar, Footer } from "./Components/Nav.jsx";
import Cart from "./Components/Cart.jsx";
import CustomerDetails from "./Components/CustomerDetails.jsx";
import PaymentPage from "./Components/PaymentPage.jsx";

import Shop from "./Components/Shop.jsx";
import ProductDetails from "./Components/ProuctDetails.jsx";
import Home from "./Components/Home.jsx";
import Contanct from "./Components/Contanct.jsx";
import Collections from "./Components/Collections.jsx";


const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product-details" element={<ProductDetails cart={cart} setCart={setCart} />} />
            <Route path="/cart" element={<Cart cart={cart} />} />
            <Route path="/shop" element={<Shop cart={cart} setCart={setCart} />} />
            <Route path="/customer-details" element={<CustomerDetails cart={cart} />} />
            <Route path="/payment" element={<PaymentPage cart={cart} />} />
           
           
            <Route path="/contact" element={<Contanct />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="*" element={<h2 className="text-center text-2xl mt-20">404 - Page Not Found</h2>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
