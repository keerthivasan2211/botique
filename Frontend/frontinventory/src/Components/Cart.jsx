import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(cart);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle quantity update
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle item removal
  const removeItem = (productId) => {
    setCartItems(cartItems.filter((item) => item.productId !== productId));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">🛒 Your Cart</h3>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center text-sm">Your cart is empty.</p>
        ) : (
          <div className="max-h-60 overflow-y-auto space-y-3">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center space-x-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 object-cover rounded-md shadow-sm"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{item.name}</p>
                    <p className="text-xs text-gray-600">₹{item.price} × {item.quantity}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    className="bg-gray-300 px-2 py-1 rounded-md"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  >
                    ➖
                  </button>
                  <span className="text-gray-900 font-semibold">{item.quantity}</span>
                  <button
                    className="bg-gray-300 px-2 py-1 rounded-md"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  >
                    ➕
                  </button>

                  <button
                    className=" text-white px-2 py-1 rounded-md ml-2"
                    onClick={() => removeItem(item.productId)}
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between font-semibold text-lg border-t pt-3">
              <span>Total:</span>
              <span className="text-blue-600 font-bold">₹{totalPrice}</span>
            </div>

            <button 
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white text-md font-bold py-2 rounded-md transition shadow-md"
              onClick={() => navigate("/customer-details", { state: { cart: cartItems } })}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
