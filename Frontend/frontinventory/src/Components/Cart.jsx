import { useNavigate } from "react-router-dom";

const Cart = ({ cart }) => {
  const navigate = useNavigate();
  
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">🛒 Your Cart</h3>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center text-sm">Your cart is empty.</p>
        ) : (
          <div className="max-h-60 overflow-y-auto space-y-3">
            {cart.map((item) => (
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
                <p className="text-sm font-bold text-gray-900">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between font-semibold text-lg border-t pt-3">
              <span>Total:</span>
              <span className="text-blue-600 font-bold">₹{totalPrice}</span>
            </div>

            <button 
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white text-md font-bold py-2 rounded-md transition shadow-md"
              onClick={() => navigate("/customer-details", { state: { cart } })}
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
