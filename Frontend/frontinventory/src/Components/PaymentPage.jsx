import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// UPI ID for Payment
const UPI_ID = "keerthivasan903@okhdfcbank";

// Telegram Bot Credentials (Replace with your own)
const TELEGRAM_BOT_TOKEN = "7846765291:AAGdI3l_rWHxns8GDUa7E4HEJOPntGhq7eU";
const TELEGRAM_CHAT_ID = "1010637203";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get customer details and cart items from route state
  const { customer, cartItems } = location.state || {};

  if (!customer || !cartItems || cartItems.length === 0) {
    navigate("/");
    return null;
  }

  // Calculate total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Generate UPI Payment URL for Google Pay
  const upiPaymentURL = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(
    customer.name
  )}&am=${totalAmount}&cu=INR&tn=Order%20Payment`;

  // Function to send order details to Telegram
  const sendTelegramMessage = async (orderData) => {
    const orderMessage = `
🛒 *New Order Placed* 🛒

🆔 *Order ID:* ${orderData.orderId}
👤 *Customer:* ${orderData.customerName}
📧 *Email:* ${orderData.customerEmail}
📞 *Phone:* ${orderData.customerPhone}
📍 *Address:* ${orderData.shippingAddress}

🛍 *Items Ordered:*
${orderData.items.map(item => `- ${item.productName} (x${item.quantity}) - ₹${item.price * item.quantity}`).join("\n")}

💰 *Total Amount:* ₹${orderData.totalAmount}
💳 *Payment Status:* ${orderData.paymentStatus}
    `;

    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: orderMessage,
        parse_mode: "Markdown",
      });
    } catch (error) {
      console.error("Failed to send Telegram message:", error);
    }
  };

  // Function to handle order completion
  const handleCompleteOrder = async () => {
    setLoading(true);
    setMessage("");

    try {
      const orderData = {
        orderId: uuidv4(), // Generate a unique order ID
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        shippingAddress: `${customer.address}, ${customer.city}, ${customer.state} - ${customer.zip}`,
        items: cartItems.map((item) => ({
          productId: item.productId, // Ensure productId is available in cartItems
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount,
        paymentStatus: "Pending",
      };

      // Send order data to backend
      const response = await axios.post("https://botique-backend.onrender.com/api/orders", orderData);

      if (response.status === 201) {
        setMessage("✅ Order placed successfully!");

        // Send order details to Telegram
        await sendTelegramMessage(orderData);

        setTimeout(() => navigate("/shop"), 2000);
      } else {
        throw new Error("Order creation failed");
      }
    } catch (error) {
      console.error("Order submission failed:", error);
      setMessage("❌ Order submission failed. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Payment Page</h1>

        {/* Customer Details */}
        <div className="mb-6">
          <h2 className="text-lg font-medium">Customer Details</h2>
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Address:</strong> {customer.address}, {customer.city}, {customer.state} - {customer.zip}</p>
        </div>

        {/* Cart Items */}
        <div className="mb-6 text-left">
          <h2 className="text-lg font-medium">Cart Items</h2>
          <ul className="list-disc pl-5">
            {cartItems.map((item, index) => (
              <li key={index}>{item.name} (Qty: {item.quantity}) - ₹{item.price * item.quantity}</li>
            ))}
          </ul>
          <p className="font-semibold mt-3">Total: ₹{totalAmount}</p>
        </div>

        {/* QR Code for UPI Payment */}
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-2">Scan the QR code to pay via Google Pay</p>
          <QRCodeCanvas value={upiPaymentURL} size={200} />
        </div>

        {/* Place Order Button */}
        <button
          onClick={handleCompleteOrder}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-4"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

        {message && <p className="text-center mt-4 text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
};

export default PaymentPage;
