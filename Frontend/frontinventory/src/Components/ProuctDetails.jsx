import { useState } from "react";
import { useLocation } from "react-router-dom";

const ProductDetails = ({ cart, setCart }) => {
  const location = useLocation();
  const product = location.state?.product;
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <p className="text-center text-xl text-gray-600 mt-20">Product not found.</p>;
  }

  const handleAddToCart = () => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.productId === product.productId);
      let updatedCart = [...prevCart];

      if (existingProductIndex !== -1) {
        updatedCart[existingProductIndex].quantity += quantity;
      } else {
        updatedCart.push({ ...product, quantity });
      }

      return updatedCart;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex justify-center items-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        
        {/* Product Details Section */}
        <div className="bg-white shadow-xl rounded-2xl p-8 col-span-2 flex flex-col items-center text-center">
          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* Product Image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full max-w-lg h-auto object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Product Info */}
            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">{product.name}</h2>
              <p className="text-2xl text-blue-600 font-semibold">₹{product.price}</p>
              <p className="text-md text-gray-700">{product.description || "No description available."}</p>

              {/* Quantity Selector */}
              <div className="flex items-center justify-center space-x-4 mt-4">
                <button 
                  className="w-10 h-10 bg-gray-200 text-xl font-bold rounded-full hover:bg-gray-400 transition flex justify-center items-center" 
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                >
                  −
                </button>
                <span className="px-6 py-2 text-lg font-semibold bg-white border border-gray-300 rounded-lg">{quantity}</span>
                <button 
                  className="w-10 h-10 bg-gray-200 text-xl font-bold rounded-full hover:bg-gray-400 transition flex justify-center items-center" 
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button 
                className="mt-6 w-full px-6 py-3 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition shadow-md"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="bg-white shadow-xl rounded-2xl p-6 h-full max-h-[80vh] overflow-y-auto sticky top-6 text-center">
          <h3 className="text-xl font-semibold mb-4 flex items-center justify-center">
            🛒 Your Cart
          </h3>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-gray-600">₹{item.price} × {item.quantity}</p>
                  </div>
                  <span className="text-lg font-bold text-blue-600">₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
          )}

          {cart.length > 0 && (
            <div className="mt-4 flex justify-between font-semibold text-lg border-t pt-3">
              <span>Total:</span>
              <span className="text-green-600 font-bold">₹{cart.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
