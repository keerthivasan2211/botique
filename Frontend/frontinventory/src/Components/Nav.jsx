import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { Menu, X } from "lucide-react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-white shadow-md p-4 flex justify-between items-center z-50 px-8">
      <h1 className="text-2xl font-bold text-gray-900">Suja_Boutique</h1>

      <button className="md:hidden text-black transition-transform duration-300 transform hover:scale-110" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      <ul className="hidden md:flex gap-10 text-lg text-black">
        <li><Link to="/" className="hover:text-gray-500 transition duration-300">Home</Link></li>
        <li><Link to="/shop" className="hover:text-gray-500 transition duration-300">Shop</Link></li>
        <li><Link to="/collections" className="hover:text-gray-500 transition duration-300">Collections</Link></li>
        <li><Link to="/contact" className="hover:text-gray-500 transition duration-300">Contact</Link></li>
      </ul>

      <div className="hidden md:flex items-center gap-6">
        <Link to="/cart" className="relative hover:scale-110 transition-transform duration-300">
          <FiShoppingCart size={28} className="text-gray-900 hover:text-gray-700 transition" />
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ duration: 0.3 }} 
              className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full"
            >
              {cartCount}
            </motion.span>
          )}
        </Link>

        {loading ? (
          <span className="text-gray-500">Loading...</span>
        ) : user ? (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4"
          >
            <img
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt={user.displayName || "User"}
              className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
            />
            <span className="text-gray-900 font-semibold">{user.displayName}</span>
            <motion.button
              onClick={handleLogout}
              whileTap={{ scale: 0.9, opacity: 0.7 }}
              className="bg-red-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-red-700 transition duration-300 hover:scale-105"
            >
              Logout
            </motion.button>
          </motion.div>
        ) : (
          <motion.div className="flex gap-4">
            <motion.div whileTap={{ scale: 0.9, opacity: 0.7 }}>
              <Link to="/login" className="text-blue-500 font-semibold hover:text-blue-700 transition duration-300">Login</Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9, opacity: 0.7 }}>
              <Link to="/signup" className="text-green-500 font-semibold hover:text-green-700 transition duration-300">Sign Up</Link>
            </motion.div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-white flex flex-col items-center gap-6 py-6 text-lg shadow-md md:hidden"
          >
            <li><Link to="/" className="hover:text-gray-500 transition duration-300">Home</Link></li>
            <li><Link to="/shop" className="hover:text-gray-500 transition duration-300">Shop</Link></li>
            <li><Link to="/collections" className="hover:text-gray-500 transition duration-300">Collections</Link></li>
            <li><Link to="/contact" className="hover:text-gray-500 transition duration-300">Contact</Link></li>
            <li>
              <Link to="/cart" className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition duration-300">
                <FiShoppingCart size={24} />
                Cart ({cartCount})
              </Link>
            </li>
            {loading ? (
              <li>Loading...</li>
            ) : user ? (
              <>
                <li className="flex flex-col items-center">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/150"}
                    alt="User Profile"
                    className="w-16 h-16 rounded-full border border-gray-300 mb-2"
                  />
                  <span className="text-gray-900 font-semibold">{user.displayName}</span>
                </li>
                <li>
                  <motion.button
                    onClick={handleLogout}
                    whileTap={{ scale: 0.9, opacity: 0.7 }}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-red-700 transition duration-300 hover:scale-105"
                  >
                    Logout
                  </motion.button>
                </li>
              </>
            ) : (
              <motion.div className="flex flex-col items-center gap-4">
                <li><motion.div whileTap={{ scale: 0.9, opacity: 0.7 }}><Link to="/login" className="text-blue-500 font-semibold hover:text-blue-700 transition duration-300">Login</Link></motion.div></li>
                <li><motion.div whileTap={{ scale: 0.9, opacity: 0.7 }}><Link to="/signup" className="text-green-500 font-semibold hover:text-green-700 transition duration-300">Sign Up</Link></motion.div></li>
              </motion.div>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export { Navbar };



const Footer = ({ cartCount }) => {
  return (
    <footer className="w-full bg-gray-900 text-white py-8 px-6 md:px-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand Name */}
        <h2 className="text-3xl font-semibold tracking-wide">SK Boutique</h2>

        {/* Footer Navigation Links */}
        <ul className="flex flex-wrap gap-6 text-lg">
          <li>
            <Link to="/" className="hover:text-gray-400 transition">Home</Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-gray-400 transition">Shop</Link>
          </li>
          <li>
            <Link to="/collections" className="hover:text-gray-400 transition">Collections</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-400 transition">Contact</Link>
          </li>
        </ul>

        {/* Cart Icon (Pure CSS) */}
        <Link to="/cart" className="relative group">
          <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center group-hover:bg-gray-700 transition">
            🛒
          </div>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Social Media Links (Text-Based) */}
      <div className="flex justify-center md:justify-end mt-6 gap-6">
        <a href="#" className="hover:text-gray-400 transition">Facebook</a>
        <a href="#" className="hover:text-gray-400 transition">Instagram</a>
        <a href="#" className="hover:text-gray-400 transition">Twitter</a>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-4">
        © {new Date().getFullYear()} Shanu's Boutique. All Rights Reserved.
      </div>
    </footer>
  );
};

export { Footer };